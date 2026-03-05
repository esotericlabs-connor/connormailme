# Quick Start: Deploy to Azure Now

## 🚀 Fast Track Deployment

### Step 1: Add Your Images (2 minutes)
Replace these files in `/public/assets/`:
- `seattle-day.png` - Your daytime Seattle photo
- `seattle-night.png` - Your nighttime Seattle photo
- `openkeyflow-logo.png` - Your OpenKeyFlow logo
- `monolith-logo.png` - Your MONOLITH logo

### Step 2: Test Build Locally (1 minute)
```bash
npm install
npm run build
```

You should see a `build/` folder created with your files.

### Step 3: Push to GitHub (1 minute)
```bash
git add .
git commit -m "Add images and deploy to Azure"
git push origin main
```

### Step 4: Create Azure Static Web App (3 minutes)

1. **Go to**: https://portal.azure.com
2. **Click**: Create a resource → Static Web Apps → Create
3. **Fill in**:
   - Name: `connor-remsen-portfolio`
   - Region: West US 2 (or closest to you)
   - Source: GitHub
   - GitHub Account: (sign in)
   - Repository: Your repo
   - Branch: `main`
   
4. **Build Details**:
   ```
   Build Preset: Custom
   App location: /
   Api location: (leave empty)
   Output location: build
   ```

5. **Click**: Review + Create → Create

### Step 5: Wait for Deployment (2-3 minutes)

Azure will:
1. Add a workflow file to your repo
2. Build your app
3. Deploy it
4. Give you a URL like: `https://[name].azurestaticapps.net`

### Step 6: Verify (1 minute)

1. Go to GitHub → Actions tab
2. Wait for green checkmark ✅
3. Visit your Azure URL
4. Test light/dark mode
5. Verify all images load

## ✅ Expected Results

You should see:
- Your Seattle skyline backgrounds changing with theme
- OpenKeyFlow and MONOLITH project cards with logos
- Smooth page transitions
- Mobile-responsive design
- VPN indicator in header

## 🐛 If Something Goes Wrong

### Build Fails
Check `AZURE-BUILD-FIX.md` for solutions

### Images Don't Load
1. Verify files are in `/public/assets/`
2. Check filenames are exact (case-sensitive)
3. Hard refresh browser (Ctrl+Shift+R)

### Workflow Not Starting
1. Check Azure Portal → Static Web Apps → Deployment
2. Manually trigger: GitHub → Actions → Re-run workflow

## 📝 All Configuration Files Ready

- ✅ `vite.config.ts` - Outputs to `build/`
- ✅ `package.json` - Has build script
- ✅ `staticwebapp.config.json` - Routing configured
- ✅ `.gitignore` - Build folder excluded
- ✅ All components - Using `/assets/` paths

## Total Time: ~10 minutes

That's it! Your portfolio will be live on Azure. 🎉

## After Deployment

Every time you push to `main` branch:
- GitHub Actions runs automatically
- Site rebuilds and redeploys
- Changes go live in ~2 minutes

No manual deployment needed!
