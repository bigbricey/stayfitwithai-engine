# Nutrition API Research

> **Source**: Web research (December 2025)  
> **Purpose**: Compare APIs for food calorie/macro lookup

---

## API Comparison

| API | Free Tier | Production OK? | Database Size | NLP | Notes |
|-----|-----------|----------------|---------------|-----|-------|
| **USDA FoodData Central** | Unlimited (1K/hr) | ✅ Yes | 300K+ | ❌ | Government-backed, most reliable |
| **API Ninjas** | Dev/test only | ❌ Paid required | 100K+ | ✅ | CalorieNinjas migrated here |
| **Nutritionix** | 2 users | $1,850/mo enterprise | 1.9M | ✅ | Best but expensive |
| **Open Food Facts** | Unlimited | ✅ Yes | 2.5M | ❌ | Crowd-sourced, variable quality |
| **Edamam** | 200/day | Paid plans | 900K+ | ✅ | Good for recipes |

---

## Recommendation: USDA FoodData Central

**Why:**
- Completely free, no commercial restrictions
- 1,000 requests per hour (sufficient for personal use)
- Laboratory-verified data
- Government-backed reliability

**Limitation:**
- No natural language processing (must search for specific foods)
- UI needs dropdown/autocomplete

---

## API Details

### USDA FoodData Central
```
Endpoint: https://api.nal.usda.gov/fdc/v1/foods/search
Rate Limit: 1,000/hour per IP
Auth: API key (free signup)
Response: JSON with detailed nutrients
```

### API Ninjas (formerly CalorieNinjas)
```
Endpoint: https://api.api-ninjas.com/v1/nutrition
Free Tier: Dev/testing only - NO production use
Paid: $X/month for commercial rights
Features: Natural language ("2 eggs and toast")
```

---

## Implementation Notes

### Caching Strategy
To stay under rate limits:
1. Cache results in Supabase `food_cache` table
2. Check cache before calling API
3. TTL: 7 days (nutrition data doesn't change often)

### Fallback Strategy
If API doesn't return results:
1. Allow manual entry
2. Store as `verified: false`
3. Show user: "Nutrition estimated - adjust if needed"
