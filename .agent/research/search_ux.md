# Search UX & Performance Research

> **Source**: Web research (December 2025)  
> **Purpose**: Best practices for food search autocomplete

---

## Debouncing

### Why Debounce?
- Prevents API call on every keystroke
- Reduces server load
- Smoother UX

### Optimal Delay
- **200ms** - feels instant, minimal API waste
- 250-350ms for mobile (slower typing)
- >300ms feels sluggish

### Implementation Pattern
```typescript
useEffect(() => {
  if (!query) return;
  
  const timer = setTimeout(() => {
    fetchResults(query);
  }, 200);
  
  return () => clearTimeout(timer);
}, [query]);
```

---

## Race Conditions

### Problem
User types "chi" → API call starts  
User types "chicken" → 2nd API call starts  
"chi" results return AFTER "chicken" results → stale data shown

### Solution: AbortController
```typescript
useEffect(() => {
  const controller = new AbortController();
  
  fetchResults(query, { signal: controller.signal });
  
  return () => controller.abort();  // Cancels on new query
}, [query]);
```

---

## Loading States

### Do
- Show spinner/skeleton immediately
- Allow submission even if API hasn't returned
- Keep input responsive during fetch

### Don't
- Block the entire UI
- Show stale suggestions after typing
- Require API result before allowing submit

---

## Caching Strategies

### Client-Side
- Use React Query / TanStack Query
- Cache recent searches in memory
- Clear on logout

### Server-Side (Supabase)
```sql
CREATE TABLE food_cache (
  query TEXT PRIMARY KEY,
  results JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Check cache before API, insert after API.

---

## Accessibility

### Requirements
- `type="search"` on input
- `aria-label` for screen readers
- Keyboard navigation (arrow keys, Enter)
- Focus management

### Example
```tsx
<input
  type="search"
  aria-label="Search for food"
  role="combobox"
  aria-expanded={showSuggestions}
/>
```

---

## Mobile Considerations

- Slightly longer debounce (250ms)
- Larger touch targets for suggestions
- Consider "Search" keyboard button
- Test on real devices
