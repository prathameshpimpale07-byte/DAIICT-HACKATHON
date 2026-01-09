"use client";
import { Dispatch,SetStateAction } from "react";
import { Button  } from "@/components/ui/button";

interface WorkExperienceEntry {
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface WorkExperienceFormProps {
  data: WorkExperienceEntry[];
  setData: Dispatch<SetStateAction<WorkExperienceEntry[]>>;
}

export default function WorkExperienceForm({ data, setData }: WorkExperienceFormProps) {
  const handleChange = (
    index: number,
    field: keyof WorkExperienceEntry,
    value: string
  ) => {
    setData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value } as WorkExperienceEntry;
      return updated;
    });
  };

  const addWork = () => {
    setData((prev) => [
      ...prev,
      { title: "", company: "", duration: "", description: "" },
    ]);
  };

  const removeWork = (index: number) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

    return (
        <div>

        </div>
    )
}