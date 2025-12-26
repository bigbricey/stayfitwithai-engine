# Supabase Integration Research

> **Source**: Web research (December 2025)  
> **Purpose**: Auth, database, and RLS best practices

---

## Current Project State

| Component | Status | Notes |
|-----------|--------|-------|
| Supabase connected | ✅ | URL + keys in env |
| `meals` table | ✅ | Schema defined |
| RLS policies | ✅ | User isolation configured |
| Auth middleware | ⚠️ Disabled | Code preserved, can re-enable |
| Server actions | ✅ | `saveMeal()`, `getTodaysMeals()` |

---

## Authentication Best Practices (2025)

### Use `@supabase/ssr` Package
- Cookie-based auth (not localStorage)
- Works with App Router + Server Components
- Auto-refreshes sessions in middleware

### Critical Security Fix
**CVE-2025-29927** - Middleware bypass vulnerability
- Affected: Next.js 11.1.4 through 15.2.2
- **Action**: Update to Next.js 15.2.3+

### Auth Validation
```typescript
// GOOD - validates with Supabase server
const { data: { user } } = await supabase.auth.getUser();

// BAD - can be spoofed, don't trust for sensitive ops
const { data: { session } } = await supabase.auth.getSession();
```

---

## Row Level Security (RLS)

### Already Configured ✅
Your `meals` table has:
```sql
CREATE POLICY "Users can view own meals" 
ON meals FOR SELECT 
USING (auth.uid() = user_id);
```

### Important Notes
- RLS requires auth to be enabled to work properly
- With auth disabled, use fixed user ID for single-user mode
- Current fallback: `'00000000-0000-0000-0000-000000000000'`

---

## Re-Enabling Auth

### Steps
1. Uncomment middleware code in `src/middleware.ts`
2. Update Next.js to 15.2.3+
3. Test login/signup flow
4. Verify RLS policies work correctly

### Decision Point
- **Single-user** (just you): Keep auth disabled, simpler
- **Multi-user** (public app): Enable auth, each user gets own data

---

## Schema Reference

### `meals` table
```sql
CREATE TABLE meals (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  date DATE,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  description TEXT,
  calories INTEGER,
  protein DECIMAL(5,1),
  carbs DECIMAL(5,1),
  fat DECIMAL(5,1),
  created_at TIMESTAMPTZ
);
```

### Proposed `food_cache` table
```sql
CREATE TABLE food_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query TEXT UNIQUE NOT NULL,
  results JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
