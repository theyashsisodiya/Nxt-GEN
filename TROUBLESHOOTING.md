# Nxt-Gen Website - Troubleshooting White Screen

## Issue: White Screen on http://localhost:5173

The website is showing a white screen because Tailwind CSS isn't being processed correctly.

## Quick Fix:

### Option 1: Restart Dev Server (Recommended)
1. **Stop the current dev server** (Ctrl+C in the terminal running `npm run dev`)
2. **Run:**
   ```bash
   npm run dev
   ```
3. **Open:** http://localhost:5173
4. **Hard refresh** your browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Option 2: Use Production Build (Guaranteed to Work)
The production build already works! Use this instead:

1. **The build is already done** - check the `dist/` folder
2. **Run the server:**
   ```bash
   npm run serve
   ```
3. **Open:** http://localhost:3000

This will show the fully styled, production-ready website.

## Why This Happened:
- Tailwind CSS needs to process the CSS files on first run
- The dev server might need a restart after copying components
- Browser cache might be showing old content

## Verification:
Once you restart, you should see:
- ✅ Dark background (not white)
- ✅ Purple "AI Purple" accent colors
- ✅ Navbar at the top
- ✅ Hero section with terminal demo
- ✅ All sections loading properly

## If Still White:
1. Check browser console (F12) for errors
2. Verify you're at http://localhost:5173 (dev) or http://localhost:3000 (prod)
3. Try a different browser
4. Clear browser cache completely
