"use client";

import React from "react";
import PreviewResume from "../../ai-tools/ai-resume-builder/_components/PreviewResume";

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
 * Hidden print page for PDF generation
 * Accessed by Puppeteer to render resume for PDF export
 * Only includes the resume preview without any UI chrome
 */
export default function PrintResume() {
  const [resumeData, setResumeData] = React.useState<ResumeData | null>(null);

  React.useEffect(() => {
    // Get resume data from URL query parameters
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get("data");

    if (dataParam) {
      try {
        const data = JSON.parse(decodeURIComponent(dataParam));
        setResumeData(data);
      } catch (error) {
        console.error("Failed to parse resume data:", error);
      }
    }
  }, []);

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-gray-500">Loading resume...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-0 print:p-0">
      <style>{`
        @page {
          size: A4;
          margin: 0;
          padding: 0;
        }
        
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          
          html {
            margin: 0;
            padding: 0;
          }
          
          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            color-adjust: exact;
          }
        }
      `}</style>
      
      <PreviewResume
        personalInfo={resumeData.personalInfo}
        careerObjective={resumeData.careerObjective}
        education={resumeData.education}
        workExperience={resumeData.workExperience}
        projects={resumeData.projects}
        skills={resumeData.skills}
        certifications={resumeData.certifications}
        achievements={resumeData.achievements}
        includeWorkExperience={resumeData.includeWorkExperience ?? true}
      />
    </div>
  );
}
