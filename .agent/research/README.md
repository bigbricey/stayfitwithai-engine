# Stay Fit with AI - Research Knowledge Base

> **Last Updated**: December 26, 2025  
> **Purpose**: Persistent documentation for future reference throughout this project

---

## 📁 Research Topics

| Topic | File | Status |
|-------|------|--------|
| Professional Build Order | [build_order.md](build_order.md) | ✅ Complete |
| Nutrition APIs | [nutrition_apis.md](nutrition_apis.md) | ✅ Complete |
| Supabase Auth & Database | [supabase_integration.md](supabase_integration.md) | ✅ Complete |
| Search UX & Performance | [search_ux.md](search_ux.md) | ✅ Complete |

---

## Quick Reference

### Build Order (Professional Approach)
1. **API Contract First** - Define endpoints before coding
2. **Database Schema** - Structure your data (already done in Supabase)
3. **Backend + Frontend in Parallel** - Once API is defined, both can proceed
4. **Use Managed Services** - Supabase handles auth + DB together

### Key APIs
- **USDA FoodData Central** - Free, 1K/hr, government-backed
- **API Ninjas** - Free for dev, paid for production
- **Nutritionix** - Enterprise $1,850/mo

### Security Checklist
- [ ] Update Next.js to 15.2.3+ (CVE-2025-29927)
- [ ] Use `supabase.auth.getUser()` not `getSession()`
- [ ] Store tokens in HTTP-only cookies
- [ ] Enable RLS on all tables

### UX Guidelines
- 200ms debounce for search
- Use AbortController for race conditions
- Show loading states immediately
- Allow manual entry fallback
