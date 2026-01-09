"use client";
import { Dispatch,SetStateAction } from "react";
import { Button  } from "@/components/ui/button";

interface EducationEntry {
  institution: string;
  degree: string;
  year: string;
}

interface EducationFormProps {
  data: EducationEntry[];
  setData: Dispatch<SetStateAction<EducationEntry[]>>;
}

export default function EducationForm({ data, setData }: EducationFormProps) {
  const handleChange = (index: number, field: keyof EducationEntry, value: string) => {
    setData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value } as EducationEntry;
      return updated;
    });
  };

  const addEducation = () => {
    setData((prev) => [...prev, { institution: "", degree: "", year: "" }]);
  };

  const removeEducation = (index: number) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>

    </div>
  )
}