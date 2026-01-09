// app/resume-builder/components/PersonalInfoForm.tsx
import { Dispatch, SetStateAction } from "react";

export interface PersonalInfoFormProps {
  data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  setData: Dispatch<
    SetStateAction<{
      name: string;
      email: string;
      phone: string;
      address: string;
      linkedin: string;
      github: string;
      portfolio: string;
    }>
  >;
}

export default function PersonalInfoForm({ data, setData }: PersonalInfoFormProps) {
    return (
        <div>
            
        </div>
    )
}