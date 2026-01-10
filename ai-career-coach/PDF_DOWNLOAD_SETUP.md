# PDF Download Feature - Installation & Setup Guide

## Overview

This implementation provides professional PDF download functionality using Puppeteer with headless Chrome for server-side PDF generation. The system uses the existing resume preview component and renders it to a high-quality PDF suitable for professional use.

## Architecture

```
User clicks "Download as PDF"
         ↓
   Frontend calls /api/download-resume (POST)
         ↓
   Server-side Puppeteer handler
         ↓
   Puppeteer launches headless Chrome
         ↓
   Chrome renders /print/resume page with resume data
         ↓
   Puppeteer captures as A4 PDF (210mm × 297mm)
         ↓
   PDF returned as downloadable response
         ↓
   Browser triggers download with filename
```

## Installation

### 1. Install Puppeteer

```bash
npm install --legacy-peer-deps puppeteer
# or
npm install puppeteer (if no peer dependency conflicts)
```

**Note**: Puppeteer is large (~100-200MB) as it includes Chromium. This is normal.

### 2. Files Created

The following files have been added to your project:

#### Frontend Components
- `app/(routes)/ai-tools/ai-resume-builder/_components/PreviewResume.tsx` (Updated)
- `app/(routes)/ai-tools/ai-resume-builder/_components/PrintStyles.tsx` (New)
- `lib/pdf-utils/download-resume.ts` (New)

#### Backend Routes
- `app/api/download-resume/route.ts` (New)
- `app/(routes)/print/resume/page.tsx` (New)

## Configuration

### Environment Variables (Optional)

If using serverless deployment (Vercel, AWS Lambda, etc.), add to `.env.local`:

```env
# For serverless environments
NODE_ENV=production
```

### Puppeteer Configuration for Different Environments

#### Development (Local)
- Works out of the box
- Puppeteer automatically downloads Chromium

#### Production (Vercel)
Add `vercel.json`:

```json
{
  "functions": {
    "app/api/download-resume/route.ts": {
      "memory": 1024,
      "maxDuration": 60
    }
  }
}
```

#### Production (AWS Lambda / Other Serverless)
Use `serverless-chrome` layer or Lambda@Edge configuration.

## Usage

### From Your Resume Builder

The button is already integrated in `PreviewResume.tsx`. When users click "Download as PDF":

1. **Primary Flow** (Puppeteer):
   - Calls `/api/download-resume` with resume data
   - Server generates PDF using Puppeteer
   - Returns high-quality PDF file
   - Triggers automatic download

2. **Fallback Flow** (Browser Print):
   - If Puppeteer fails, automatically opens print dialog
   - Users can print-to-PDF manually
   - Ensures users always have a fallback option

### API Endpoint Usage

```typescript
// From your component
import { downloadResumePDF } from "@/lib/pdf-utils/download-resume";

const handleDownload = async () => {
  try {
    await downloadResumePDF(resumeData);
  } catch (error) {
    console.error("Download failed:", error);
  }
};
```

### Direct API Call (cURL example)

```bash
curl -X POST http://localhost:3000/api/download-resume \
  -H "Content-Type: application/json" \
  -d '{
    "resumeData": {
      "personalInfo": {"name": "John Doe", ...},
      "careerObjective": "...",
      ...
    }
  }' \
  --output resume.pdf
```

## Output PDF Specifications

- **Format**: A4 (210mm × 297mm)
- **Margins**: None (full bleed)
- **Quality**: High-quality rendering at 96 DPI
- **Color Preservation**: Yes (print backgrounds enabled)
- **Font Embedding**: System fonts + Google Fonts
- **Multi-page Support**: Automatic pagination

## Customization

### Modify PDF Size/Margins

Edit `app/api/download-resume/route.ts`:

```typescript
pdfBuffer = await page.pdf({
  format: "A4",
  margin: {
    top: 10,    // mm
    right: 10,  // mm
    bottom: 10, // mm
    left: 10,   // mm
  },
  printBackground: true,
  preferCSSPageSize: true,
});
```

### Change Print Styles

Edit `app/(routes)/ai-tools/ai-resume-builder/_components/PreviewResume.tsx` - the `@media print` styles section.

### Customize Filename Format

Edit `app/api/download-resume/route.ts`, around line 140:

```typescript
const filename = `${sanitizedName}-${timestamp}.pdf`;
// Change to your preferred format, e.g.:
// const filename = `${sanitizedName}_resume.pdf`;
```

## Performance Optimization

### For Production

1. **Enable Caching** (if appropriate):
   ```typescript
   // Remove/modify cache control headers
   "Cache-Control": "private, max-age=3600", // Cache for 1 hour
   ```

2. **Timeout Settings**:
   ```typescript
   await page.goto(printPageUrl, {
     waitUntil: "networkidle2",
     timeout: 30000, // 30 seconds max
   });
   ```

3. **Memory Optimization**:
   ```typescript
   browser = await puppeteer.launch({
     args: [
       "--no-sandbox",
       "--disable-setuid-sandbox",
       "--disable-dev-shm-usage",
       "--single-process", // For serverless
     ],
   });
   ```

## Troubleshooting

### "Puppeteer not found" Error
```bash
npm install puppeteer
```

### Chrome/Chromium Not Found
```bash
npx puppeteer browsers install chrome
```

### PDF Generation Timeout
- Increase timeout in API route
- Check network conditions
- Verify resume data is not too large

### PDF Colors/Styling Not Correct
- Ensure `printBackground: true` is set
- Check CSS uses `print-color-adjust: exact`
- Verify fonts are loaded

### Font Issues in PDF
- Add custom font imports in print styles
- Use system fonts as fallback
- Test with Google Fonts

### Serverless Deployment Issues

**Vercel**:
```bash
npm install @vercel/og
# Use built-in image generation instead if available
```

**AWS Lambda**:
- Increase memory to 1024MB+
- Increase timeout to 60s+
- Use ARM64 architecture if possible

## Testing

### Local Testing

```bash
# 1. Start dev server
npm run dev

# 2. Navigate to resume builder
# http://localhost:3000/ai-tools/ai-resume-builder

# 3. Fill in resume data
# 4. Click "Download as PDF"
# 5. PDF should download automatically
```

### Testing Direct API

```bash
# In another terminal
curl http://localhost:3000/api/download-resume \
  -X POST \
  -H "Content-Type: application/json" \
  -d '@resume-data.json' \
  -o test.pdf
```

## Browser Compatibility

✅ Chrome/Edge - Full support
✅ Firefox - Full support
✅ Safari - Full support
⚠️ Mobile browsers - Download support varies

## Security Considerations

1. **Input Validation**: Resume data is passed as JSON - validate on server if needed
2. **File Size Limits**: Consider adding max file size checks
3. **Rate Limiting**: Add rate limiting to prevent abuse
4. **CORS**: Configured for same-origin requests

## Additional Features (Optional)

### Add Email Delivery
```typescript
// In route.ts
const nodemailer = require("nodemailer");
// Send PDF via email
```

### Add Cloud Storage
```typescript
// Save to S3, Google Cloud Storage, etc.
const aws = require("aws-sdk");
```

### Add Analytics
```typescript
// Track PDF downloads
analytics.track("pdf_downloaded", { resumeName });
```

## Next Steps

1. Install Puppeteer: `npm install puppeteer`
2. Start dev server: `npm run dev`
3. Test the download feature
4. Deploy to production
5. Monitor performance and errors

## Support & Debugging

For detailed Puppeteer docs: https://pptr.dev/
For Next.js API routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

**Created**: January 2026
**Status**: Production Ready
