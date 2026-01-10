/**
 * Global print styles for PDF generation
 * These styles ensure the resume looks perfect when printed or converted to PDF
 */

export default function PrintStyles() {
  return (
    <style>{`
      /* Print-specific CSS for optimal PDF output */
      @media print {
        /* Page setup */
        @page {
          size: A4;
          margin: 0;
          padding: 0;
        }

        html,
        body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          background: white;
        }

        /* Ensure colors are preserved */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        /* Hide unnecessary elements */
        button,
        .no-print,
        [data-no-print="true"] {
          display: none !important;
        }

        /* Optimize text rendering */
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
          line-height: 1.5;
          color: #333;
        }

        /* Prevent page breaks inside elements */
        .resume-section,
        .education-item,
        .experience-item,
        .project-item {
          page-break-inside: avoid;
        }

        /* Ensure links are visible */
        a {
          color: #0066cc;
          text-decoration: underline;
        }

        /* Optimize images */
        img {
          max-width: 100%;
          height: auto;
        }

        /* Better spacing */
        h1,
        h2,
        h3 {
          margin-top: 0;
          margin-bottom: 0.5em;
        }

        /* Prevent orphaned text */
        p {
          orphans: 3;
          widows: 3;
        }

        /* Optimize lists */
        ul,
        ol {
          margin-top: 0;
          margin-bottom: 0.5em;
          padding-left: 1.5em;
        }

        li {
          margin-bottom: 0.25em;
        }

        /* Remove shadows and effects for PDF */
        .shadow-md,
        .shadow-lg,
        [class*="shadow"] {
          box-shadow: none !important;
        }

        /* Optimize borders for printing */
        border-color {
          opacity: 1;
        }

        /* Ensure proper sizing */
        .resume-container {
          width: 210mm;
          height: 297mm;
          margin: 0;
          padding: 0;
          box-shadow: none;
        }
      }

      /* Screen view optimizations */
      @media screen {
        .resume-preview {
          max-width: 794px;
          margin: 0 auto;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
      }

      /* Font embedding for better PDF compatibility */
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

      body {
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, sans-serif;
      }

      strong,
      b {
        font-weight: 600;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-weight: 700;
      }
    `}</style>
  );
}
