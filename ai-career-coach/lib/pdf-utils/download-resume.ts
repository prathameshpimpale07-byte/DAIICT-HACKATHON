/**
 * Client-side utility for triggering resume PDF download
 */

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  careerObjective: string;
  education: { degree: string; institution: string; year: string }[];
  workExperience: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
  projects: {
    title: string;
    link?: string;
    description: string[];
  }[];
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    core: string[];
  };
  certifications: string[];
  achievements: string[];
  includeWorkExperience?: boolean;
}

/**
 * Downloads resume as PDF
 * @param resumeData - The resume data to convert to PDF
 * @param onProgress - Optional callback to track download progress
 */
export async function downloadResumePDF(
  resumeData: ResumeData,
  onProgress?: (progress: number) => void
): Promise<void> {
  try {
    const response = await fetch("/api/download-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resumeData }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to download resume");
    }

    // Get filename from content-disposition header
    const contentDisposition = response.headers.get("content-disposition");
    let filename = "resume.pdf";
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      if (match) {
        filename = match[1];
      }
    }

    // Convert response to blob
    const blob = await response.blob();

    // Create download link and trigger download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    onProgress?.(100);
  } catch (error) {
    console.error("Error downloading resume:", error);
    throw error;
  }
}

/**
 * Alternative: Download using browser's print-to-PDF (client-side only, no Puppeteer required)
 * Useful as fallback if server-side PDF generation fails
 */
export function downloadResumePrintPDF(resumeData: ResumeData): void {
  try {
    const encodedData = encodeURIComponent(JSON.stringify(resumeData));
    const printUrl = `/print/resume?data=${encodedData}`;

    const printWindow = window.open(printUrl, "_blank");
    if (printWindow) {
      // Wait for page to load, then trigger print dialog
      printWindow.addEventListener("load", () => {
        setTimeout(() => {
          printWindow.print();
        }, 500);
      });
    }
  } catch (error) {
    console.error("Error opening print dialog:", error);
    throw error;
  }
}
