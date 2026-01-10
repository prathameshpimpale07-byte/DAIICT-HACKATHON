/**
 * Advanced PDF Utilities
 * Optional utilities for enhanced PDF functionality
 */

import { NextRequest, NextResponse } from "next/server";

/**
 * Generates multiple resume variations (e.g., different formats/styles)
 * @param resumeData - Base resume data
 * @param format - 'modern', 'classic', 'minimal'
 * @returns Modified resume data for different styles
 */
export function generateResumeVariant(
  resumeData: any,
  format: "modern" | "classic" | "minimal" = "modern"
) {
  const variants = {
    modern: {
      ...resumeData,
      styleClass: "modern-theme",
    },
    classic: {
      ...resumeData,
      styleClass: "classic-theme",
    },
    minimal: {
      ...resumeData,
      styleClass: "minimal-theme",
    },
  };

  return variants[format];
}

/**
 * Validates resume data before PDF generation
 * Prevents errors during Puppeteer rendering
 */
export function validateResumeData(resumeData: any): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!resumeData) {
    errors.push("Resume data is required");
    return { valid: false, errors };
  }

  // Validate personalInfo
  if (!resumeData.personalInfo) {
    errors.push("Personal information is required");
  } else {
    if (!resumeData.personalInfo.name) {
      errors.push("Name is required");
    }
    if (!resumeData.personalInfo.email) {
      errors.push("Email is required");
    }
  }

  // Validate array fields
  if (!Array.isArray(resumeData.education)) {
    errors.push("Education must be an array");
  }
  if (!Array.isArray(resumeData.workExperience)) {
    errors.push("Work experience must be an array");
  }
  if (!Array.isArray(resumeData.projects)) {
    errors.push("Projects must be an array");
  }
  if (!resumeData.skills || typeof resumeData.skills !== "object") {
    errors.push("Skills must be an object");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Calculates resume statistics
 * Useful for analytics/tracking
 */
export function calculateResumeStats(resumeData: any) {
  return {
    totalSections: [
      !!resumeData.careerObjective,
      (resumeData.education || []).length > 0,
      (resumeData.workExperience || []).length > 0,
      (resumeData.projects || []).length > 0,
      Object.values(resumeData.skills || {}).some((arr: any) => arr.length > 0),
      (resumeData.certifications || []).length > 0,
      (resumeData.achievements || []).length > 0,
    ].filter(Boolean).length,

    educationEntries: (resumeData.education || []).length,
    experienceEntries: (resumeData.workExperience || []).length,
    projectEntries: (resumeData.projects || []).length,
    totalSkills:
      (resumeData.skills?.languages || []).length +
      (resumeData.skills?.frameworks || []).length +
      (resumeData.skills?.tools || []).length +
      (resumeData.skills?.core || []).length,
    certificationCount: (resumeData.certifications || []).length,
    achievementCount: (resumeData.achievements || []).length,

    completionPercentage: calculateCompleteness(resumeData),
  };
}

/**
 * Calculates how complete the resume is (0-100%)
 */
export function calculateCompleteness(resumeData: any): number {
  let completedFields = 0;
  const totalFields = 8;

  if (resumeData.personalInfo?.name) completedFields++;
  if (resumeData.personalInfo?.email) completedFields++;
  if (resumeData.careerObjective) completedFields++;
  if (resumeData.education?.length > 0) completedFields++;
  if (resumeData.workExperience?.length > 0) completedFields++;
  if (resumeData.projects?.length > 0) completedFields++;
  if (
    resumeData.skills &&
    Object.values(resumeData.skills).some((arr: any) => arr.length > 0)
  )
    completedFields++;
  if (
    resumeData.certifications?.length > 0 ||
    resumeData.achievements?.length > 0
  )
    completedFields++;

  return Math.round((completedFields / totalFields) * 100);
}

/**
 * Generates a text-based resume (plain text format)
 * Useful for ATS (Applicant Tracking System) optimization
 */
export function generatePlainTextResume(resumeData: any): string {
  const lines: string[] = [];

  // Header
  lines.push(resumeData.personalInfo.name.toUpperCase());
  lines.push(resumeData.personalInfo.email);
  if (resumeData.personalInfo.phone) {
    lines.push(resumeData.personalInfo.phone);
  }
  lines.push("");

  // Career Objective
  if (resumeData.careerObjective) {
    lines.push("PROFESSIONAL SUMMARY");
    lines.push(resumeData.careerObjective);
    lines.push("");
  }

  // Education
  if (resumeData.education?.length > 0) {
    lines.push("EDUCATION");
    resumeData.education.forEach((edu: any) => {
      lines.push(`${edu.degree} - ${edu.institution} (${edu.year})`);
    });
    lines.push("");
  }

  // Experience
  if (resumeData.workExperience?.length > 0) {
    lines.push("WORK EXPERIENCE");
    resumeData.workExperience.forEach((exp: any) => {
      lines.push(`${exp.title} at ${exp.company} (${exp.duration})`);
      lines.push(exp.description);
    });
    lines.push("");
  }

  // Projects
  if (resumeData.projects?.length > 0) {
    lines.push("PROJECTS");
    resumeData.projects.forEach((proj: any) => {
      lines.push(proj.title);
      proj.description.forEach((desc: string) => {
        lines.push(`• ${desc}`);
      });
    });
    lines.push("");
  }

  // Skills
  const hasSkills = Object.values(resumeData.skills || {}).some(
    (arr: any) => arr.length > 0
  );
  if (hasSkills) {
    lines.push("SKILLS");
    if (resumeData.skills?.languages?.length > 0) {
      lines.push(
        `Languages: ${resumeData.skills.languages.join(", ")}`
      );
    }
    if (resumeData.skills?.frameworks?.length > 0) {
      lines.push(
        `Frameworks: ${resumeData.skills.frameworks.join(", ")}`
      );
    }
    if (resumeData.skills?.tools?.length > 0) {
      lines.push(`Tools: ${resumeData.skills.tools.join(", ")}`);
    }
    if (resumeData.skills?.core?.length > 0) {
      lines.push(`Core: ${resumeData.skills.core.join(", ")}`);
    }
    lines.push("");
  }

  // Certifications
  if (resumeData.certifications?.length > 0) {
    lines.push("CERTIFICATIONS");
    resumeData.certifications.forEach((cert: string) => {
      lines.push(`• ${cert}`);
    });
    lines.push("");
  }

  // Achievements
  if (resumeData.achievements?.length > 0) {
    lines.push("ACHIEVEMENTS");
    resumeData.achievements.forEach((ach: string) => {
      lines.push(`• ${ach}`);
    });
  }

  return lines.join("\n");
}

/**
 * Generates resume as JSON (for data export)
 */
export function exportResumeJSON(resumeData: any): string {
  return JSON.stringify(resumeData, null, 2);
}

/**
 * Generates resume as CSV (for spreadsheet import)
 * Flattens complex data structures
 */
export function exportResumeCSV(resumeData: any): string {
  const csv: string[] = [];

  // Header
  csv.push("Field,Value");

  // Personal Info
  Object.entries(resumeData.personalInfo).forEach(([key, value]) => {
    csv.push(`"${key}","${value}"`);
  });

  // Career Objective
  csv.push(`"Career Objective","${resumeData.careerObjective}"`);

  // Education
  resumeData.education?.forEach((edu: any, idx: number) => {
    csv.push(`"Education ${idx + 1} - Degree","${edu.degree}"`);
    csv.push(`"Education ${idx + 1} - Institution","${edu.institution}"`);
    csv.push(`"Education ${idx + 1} - Year","${edu.year}"`);
  });

  // Experience
  resumeData.workExperience?.forEach((exp: any, idx: number) => {
    csv.push(`"Experience ${idx + 1} - Title","${exp.title}"`);
    csv.push(`"Experience ${idx + 1} - Company","${exp.company}"`);
    csv.push(`"Experience ${idx + 1} - Duration","${exp.duration}"`);
    csv.push(`"Experience ${idx + 1} - Description","${exp.description}"`);
  });

  // Projects
  resumeData.projects?.forEach((proj: any, idx: number) => {
    csv.push(`"Project ${idx + 1} - Title","${proj.title}"`);
    csv.push(`"Project ${idx + 1} - Link","${proj.link || ""}"`);
    csv.push(`"Project ${idx + 1} - Description","${proj.description.join("; ")}"`);
  });

  // Skills
  Object.entries(resumeData.skills || {}).forEach(([key, values]) => {
    if (Array.isArray(values) && values.length > 0) {
      csv.push(`"Skills - ${key}","${values.join("; ")}"`);
    }
  });

  // Certifications
  resumeData.certifications?.forEach((cert: string, idx: number) => {
    csv.push(`"Certification ${idx + 1}","${cert}"`);
  });

  // Achievements
  resumeData.achievements?.forEach((ach: string, idx: number) => {
    csv.push(`"Achievement ${idx + 1}","${ach}"`);
  });

  return csv.join("\n");
}

/**
 * Creates a resume backup (JSON format with timestamp)
 */
export function createResumeBackup(resumeData: any): {
  backup: string;
  filename: string;
} {
  const timestamp = new Date().toISOString();
  const backup = JSON.stringify(
    {
      ...resumeData,
      _backup_created_at: timestamp,
    },
    null,
    2
  );

  const filename = `resume-backup-${new Date().getTime()}.json`;

  return { backup, filename };
}

/**
 * Restores resume from backup JSON
 */
export function restoreResumeFromBackup(backupJSON: string): {
  valid: boolean;
  data?: any;
  error?: string;
} {
  try {
    const data = JSON.parse(backupJSON);
    delete data._backup_created_at; // Remove metadata

    const validation = validateResumeData(data);
    if (!validation.valid) {
      return {
        valid: false,
        error: `Invalid resume data: ${validation.errors.join(", ")}`,
      };
    }

    return { valid: true, data };
  } catch (error) {
    return {
      valid: false,
      error: `Failed to parse backup: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Sanitizes resume data to prevent XSS attacks
 */
export function sanitizeResumeData(resumeData: any): any {
  const sanitizeString = (str: string): string => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");
  };

  const sanitizeObject = (obj: any): any => {
    if (typeof obj === "string") {
      return sanitizeString(obj);
    }
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    }
    if (typeof obj === "object" && obj !== null) {
      const sanitized: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          sanitized[key] = sanitizeObject(obj[key]);
        }
      }
      return sanitized;
    }
    return obj;
  };

  return sanitizeObject(resumeData);
}

/**
 * Compares two resume versions to show differences
 */
export function compareResumes(
  resume1: any,
  resume2: any
): {
  added: string[];
  removed: string[];
  modified: string[];
} {
  const added: string[] = [];
  const removed: string[] = [];
  const modified: string[] = [];

  // Simple comparison (can be made more sophisticated)
  const str1 = JSON.stringify(resume1).split(",");
  const str2 = JSON.stringify(resume2).split(",");

  str2.forEach((item) => {
    if (!str1.includes(item)) {
      added.push(item);
    }
  });

  str1.forEach((item) => {
    if (!str2.includes(item)) {
      removed.push(item);
    }
  });

  return { added, removed, modified };
}

export default {
  generateResumeVariant,
  validateResumeData,
  calculateResumeStats,
  calculateCompleteness,
  generatePlainTextResume,
  exportResumeJSON,
  exportResumeCSV,
  createResumeBackup,
  restoreResumeFromBackup,
  sanitizeResumeData,
  compareResumes,
};
