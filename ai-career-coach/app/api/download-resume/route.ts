import { NextRequest, NextResponse } from "next/server";
// import puppeteer from "puppeteer-core";

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
 * POST /api/download-resume
 * Generates a PDF from resume data using Puppeteer
 *
 * Request body:
 * {
 *   resumeData: ResumeData
 * }
 *
 * Returns: PDF file as downloadable response
 */
export async function POST(request: NextRequest) {
  try {
    const { resumeData } = (await request.json()) as {
      resumeData: ResumeData;
    };

    if (!resumeData) {
      return NextResponse.json(
        { error: "Resume data is required" },
        { status: 400 }
      );
    }

    // Get the base URL from request
    const baseUrl =
      request.nextUrl.protocol + "//" + request.nextUrl.host;

    // Encode resume data for URL parameter
    const encodedData = encodeURIComponent(JSON.stringify(resumeData));
    const printPageUrl = `${baseUrl}/print/resume?data=${encodedData}`;

    // Launch Puppeteer browser
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--single-process", // For serverless environments
        ],
      });
    } catch (error) {
      console.error("Failed to launch browser:", error);
      return NextResponse.json(
        { error: "Failed to initialize PDF generator" },
        { status: 500 }
      );
    }

    let pdfBuffer: Buffer;

    try {
      const page = await browser.newPage();

      // Set viewport for A4 size
      await page.setViewport({
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123, // A4 height in pixels at 96 DPI
      });

      // Navigate to print page
      await page.goto(printPageUrl, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });

      // Generate PDF
      pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
        printBackground: true,
        preferCSSPageSize: true,
      });

      await page.close();
    } catch (error) {
      console.error("Error generating PDF:", error);
      return NextResponse.json(
        { error: "Failed to generate PDF" },
        { status: 500 }
      );
    } finally {
      await browser.close();
    }

    // Create filename with timestamp
    const timestamp = new Date().toISOString().split("T")[0];
    const sanitizedName = (resumeData.personalInfo.name || "resume")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
    const filename = `${sanitizedName}-${timestamp}.pdf`;

    // Return PDF as downloadable file
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": pdfBuffer.length.toString(),
        // Cache control - don't cache PDFs
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
