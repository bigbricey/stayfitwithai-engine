# Deep Dive: Professional Food Logging UX

## Research Date: 2025-12-26

---

## Problem Statement

Current implementation is "totally crappy" because:
- No serving size selection (can't say "8 oz ribeye steak")
- No unit options (grams, ounces, pounds, cups)
- No quantity multiplier
- No food type variations
- Nutrients are per 100g only - useless for real-world logging

---

## How MyFitnessPal Does It (Exact Flow)

### The Professional Pattern
```
[Search Box] → [Select from Results] → [Serving Size Dropdown] → [Quantity Text Field] → [Log]
                                            ↓                           ↓
                                        "1 cup"                     "0.75"
                                        "100 g"                     "2"
                                        "1 oz"                      "8"
```

### Step-by-Step User Flow

1. **Search** - Type food name in search box (e.g., "ribeye steak")
2. **Select** - Pick from search results dropdown
3. **Choose Serving Unit** - Dropdown with options like:
   - "1 gram" / "1 oz" / "1 cup" (standard units)
   - "1 serving (85g)" (nutrition label default)
   - "1 medium (118g)" (food-specific measures)
4. **Enter Quantity** - Text field supporting decimals (e.g., "8" for 8 oz, "0.75" for 3/4 cup)
5. **See Calculated Macros** - Real-time update showing total calories/macros
6. **Log It** - Single tap to save

### Key UX Insights

| Feature | How MyFitnessPal Does It |
|---------|--------------------------|
| **Serving Unit** | Dropdown selection from predefined options |
| **Quantity** | Text field (supports decimals: 0.5, 1.25, etc.) |
| **Calculation** | `serving_grams × quantity × (nutrients_per_100g / 100)` |
| **Smart Defaults** | Pre-selects nutrition label serving size |
| **Verified Foods** | Green checkmark = MFP verified accuracy |

### Core UX Pattern
```
[Food Search] → [Select Item] → [Choose Serving Size] → [Enter Quantity] → [Log]
```

### Key Features
1. **Serving Size Options**
   - Multiple units per food (1 gram, 1 oz, 1 cup, 1 slice, etc.)
   - User enters quantity as multiplier (e.g., "5" servings of 1 oz = 5 oz)
   
2. **Unit Flexibility**
   - Standard: grams, ounces, cups, tablespoons
   - Food-specific: slices, pieces, patties, fillets
   - Label-based: "1 serving" matching nutrition label

3. **Food Variations**
   - Same item with different preparations (grilled, fried, raw)
   - Branded vs generic options
   - Restaurant menu items

4. **Quick Entry Features**
   - Recent foods
   - Favorites
   - Custom foods
   - Barcode scanning

---

## USDA API: What We're Missing

### Current API Response (per 100g only)
```json
{
  "name": "Beef, ribeye steak",
  "calories": 291,
  "protein": 24,
  "carbs": 0,
  "fat": 21
}
```

### What USDA Actually Provides
```json
{
  "description": "Beef, ribeye steak, boneless, lip-on, separable lean and fat, trimmed to 1/8\" fat, choice, cooked, grilled",
  "servingSize": 85,
  "servingSizeUnit": "g",
  "householdServingFullText": "3 oz",
  "foodMeasures": [
    { "gramWeight": 28.35, "measureUnitName": "oz" },
    { "gramWeight": 453.6, "measureUnitName": "lb" },
    { "gramWeight": 85, "measureUnitName": "serving", "modifier": "3 oz" }
  ],
  "foodNutrients": [...per 100g...]
}
```

### Key Fields We Need
| Field | Purpose |
|-------|---------|
| `servingSize` | Default portion (e.g., 85g) |
| `servingSizeUnit` | Unit of default portion |
| `householdServingFullText` | Human-readable (e.g., "3 oz") |
| `foodMeasures[]` | Available unit options with gram weights |

---

## Implementation Strategy

### 1. API Enhancement
**Expand `/api/nutrition` response:**
```typescript
interface NutritionResult {
  // Current
  name: string;
  calories: number;  // per 100g
  protein: number;   // per 100g
  carbs: number;     // per 100g
  fat: number;       // per 100g
  fdcId: number;
  
  // NEW - Serving data
  servings: {
    default: { amount: number; unit: string; grams: number };
    options: { amount: number; unit: string; grams: number; label: string }[];
  }
}
```

### 2. UI Changes

**Replace current input with:**
```
┌────────────────────────────────────────────────┐
│ [Search: "ribeye steak"   ] [🔍]               │
├────────────────────────────────────────────────┤
│ Beef, ribeye steak, grilled                    │
│                                                │
│  Quantity: [8    ]  Unit: [ounces      ▼]     │
│                                                │
│  ┌──────────────────────────────────────────┐  │
│  │  CAL   PRO   CARB   FAT                  │  │
│  │  466   38g   0g     34g                  │  │
│  │  (calculated for 8 oz)                   │  │
│  └──────────────────────────────────────────┘  │
│                                                │
│            [LOG MEAL]                          │
└────────────────────────────────────────────────┘
```

### 3. Calculation Logic
```javascript
const calculateNutrition = (per100g, quantity, unitGrams) => {
  const totalGrams = quantity * unitGrams;
  const multiplier = totalGrams / 100;
  
  return {
    calories: Math.round(per100g.calories * multiplier),
    protein: Math.round(per100g.protein * multiplier),
    carbs: Math.round(per100g.carbs * multiplier),
    fat: Math.round(per100g.fat * multiplier),
  };
};
```

---

## Unit Conversion Reference

| Unit | Grams |
|------|-------|
| 1 oz | 28.35 |
| 1 lb | 453.6 |
| 1 kg | 1000 |
| 1 cup (varies) | ~240 (liquids) |

For foods without `foodMeasures`, provide standard fallbacks:
- grams (1g = 1g)
- ounces (1oz = 28.35g)
- pounds (1lb = 453.6g)

---

## Data Type Filtering

USDA has multiple food types:
- **Foundation**: Lab-analyzed generic foods (BEST for accuracy)
- **SR Legacy**: Standard Reference (comprehensive)
- **Branded**: Packaged foods with nutrition labels
- **Survey (FNDDS)**: What Americans typically eat

**Recommendation**: Filter to `Foundation` and `SR Legacy` for home cooking, `Branded` for packaged foods.

---

## Action Items

1. ✅ Research complete
2. [ ] Update API to return serving size data
3. [ ] Add unit selector dropdown to UI
4. [ ] Add quantity input
5. [ ] Calculate nutrition based on selected serving
6. [ ] Store serving info with meal in database
