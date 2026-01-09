"use client";
import { useState } from "react";

import PersonalInfoForm from "./_components/PersonalInfoForm";
import CareerObjectiveForm from "./_components/CareerObjectiveForm";
import EducationForm from "./_components/EducationForm";
import WorkExperienceForm from "./_components/WorkExperienceForm";
import ProjectsForm from "./_components/ProjectsForm";
import SkillsCertificationsForm from "./_components/SkillsForm";
import PreviewResume from "./_components/PreviewResume";

export default function Page() {
  // State for all sections
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: ""
  });

  const [careerObjective, setCareerObjective] = useState("");
  const [education, setEducation] = useState<{ degree: string; institution: string; year: string }[]>([]);
  const [workExperience, setWorkExperience] = useState<{ title: string; company: string; duration: string; description: string }[]>([]);
  const [projects, setProjects] = useState<{ title: string; link?: string; description: string[] }[]>([]);
  // Categorized skills
  const [skills, setSkills] = useState<{
    languages: string[];
    frameworks: string[]; // Frameworks & Libraries
    tools: string[]; // Technologies & Tools
    core: string[]; // Core Components
  }>({ languages: [], frameworks: [], tools: [], core: [] });
  const [certifications, setCertifications] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [includeWorkExperience, setIncludeWorkExperience] = useState<boolean>(true);

    return (
        <div>

        </div>
    )
}