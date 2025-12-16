# Deployment Instructions

## 1. Push to GitHub
Run these commands in your terminal to create the repo and push:

```bash
# 1. Create a new public repo named 'stayfitwithai-engine'
gh repo create stayfitwithai-engine --public --source=. --remote=origin

# 2. Push the code
git push -u origin main
```

*Note: If you don't have the `gh` CLI installed, create a new repo on GitHub.com manually, then run:*
```bash
git remote add origin https://github.com/YOUR_USERNAME/stayfitwithai-engine.git
git push -u origin main
```

## 2. Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com/new).
2. Click **"Add New..."** -> **"Project"**.
3. Import `stayfitwithai-engine`.
4. Click **Deploy**.

## 3. Verify
Once deployed, check your Austin page:
`https://stayfitwithai-engine.vercel.app/availability/tx/austin`
