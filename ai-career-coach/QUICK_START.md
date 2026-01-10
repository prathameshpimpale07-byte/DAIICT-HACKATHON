# ⚡ Quick Start Guide - PDF Download Feature

> **Time to get running: 5 minutes**

## 1️⃣ Install Puppeteer (2 min)

```bash
cd g:\hackathon\DAIICT-HACKATHON\ai-career-coach
npm install --legacy-peer-deps puppeteer
```

✅ This downloads Chrome for PDF generation

## 2️⃣ Verify Installation (1 min)

```bash
npm list puppeteer
# Should show: puppeteer@X.X.X
```

If it doesn't work:
```bash
npm install puppeteer --no-save --legacy-peer-deps
```

## 3️⃣ Start Dev Server (1 min)

```bash
npm run dev
```

Wait for: "▲ Next.js X.X.X ... ready"

## 4️⃣ Test It Out (1 min)

1. Open: http://localhost:3000/ai-tools/ai-resume-builder
2. Fill in the form (at least name and email)
3. Scroll down to the bottom
4. Click **"Download as PDF"** button
5. Watch for loading spinner
6. PDF should download automatically ✅

## 5️⃣ Verify PDF Quality (optional)

1. Open the downloaded PDF
2. Compare with on-screen preview
3. Check that styles match
4. Done! 🎉

---

## ❓ What If Something Goes Wrong?

### "Puppeteer not found" Error
```bash
npm install puppeteer
npm run dev
```

### Download doesn't start
1. Check browser console (F12)
2. Look for red error messages
3. Check server terminal for errors
4. Try with simple resume data first

### PDF looks wrong
- Press `Ctrl+P` to see print preview
- Compare with PDF
- Both should look identical

### "Chrome/Chromium not found"
```bash
npx puppeteer browsers install chrome
```

---

## 📁 Files That Were Created

These files are now in your project:

```
✅ app/api/download-resume/route.ts
✅ app/(routes)/print/resume/page.tsx  
✅ lib/pdf-utils/download-resume.ts
✅ lib/pdf-utils/advanced-utils.ts
✅ app/(routes)/ai-tools/ai-resume-builder/_components/PrintStyles.tsx
✅ PreviewResume.tsx (UPDATED)
```

---

## 🎯 How It Works (High Level)

```
Click Button
    ↓
Send resume data to API (/api/download-resume)
    ↓
Server uses Puppeteer to render as PDF
    ↓
PDF file downloads to your computer
    ↓
Done! 🎉
```

---

## 📚 Full Documentation

For detailed info, read these files:

1. **PDF_RESUME_COMPLETE.md** ← Start here for full guide
2. **PDF_DOWNLOAD_SETUP.md** ← Setup & configuration
3. **IMPLEMENTATION_REFERENCE.md** ← Technical details
4. **FILE_STRUCTURE.md** ← File organization

---

## ✨ Features

✅ PDF looks identical to on-screen preview
✅ Professional A4 format (210mm × 297mm)
✅ High quality output
✅ Automatic filename with date
✅ Error handling with fallback
✅ Works on all browsers

---

## 🚀 You're Done!

Your resume builder now has professional PDF downloads just like Canva, Resume.io, and Zety.

### What's Next?

1. **Test thoroughly** - Try different resume data
2. **Deploy** - Push to production when ready
3. **Customize** - Modify styles/formatting as needed
4. **Monitor** - Check performance in production

---

## 🆘 Need Help?

**Read the full documentation**:
```
g:\hackathon\DAIICT-HACKATHON\ai-career-coach\PDF_RESUME_COMPLETE.md
```

**Check server logs**:
```bash
# Terminal running npm run dev
# Errors will appear here
```

**Test API directly**:
```bash
curl -X POST http://localhost:3000/api/download-resume \
  -H "Content-Type: application/json" \
  -d '{"resumeData":{"personalInfo":{"name":"Test","email":"test@example.com","phone":"123","address":"123 St"},"careerObjective":"","education":[],"workExperience":[],"projects":[],"skills":{"languages":[],"frameworks":[],"tools":[],"core":[]},"certifications":[],"achievements":[]}}' \
  -o test.pdf
```

---

**Version**: 1.0.0
**Created**: January 2026
**Status**: ✅ Ready to Use
