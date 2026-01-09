"use client"

import { useState, useEffect } from "react";

export default function CoverLetterGenerator() {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState();
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');



  
  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if(file) setResumeFile(file);
  }

  const generateCoverLetter = async () => {
    if(!resumeFile || !jobTitle || !companyName || !jobDescription) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('resumeFile', resumeFile);
    formData.append('jobTitle', jobTitle);
    formData.append('companyName', companyName);
    formData.append('jobDescription', jobDescription);

    try {
      await axios.post('/api/ai-coverletter-agent', formData);
      // After POST, fetch the latest saved cover letter
      fetchLatestCoverLetter();
    } catch(err) {
      console.error("Error generating cover letter:", err);
    } finally {
      setLoading(false);
    }
  }

  // Fetch latest saved cover letter from DB
  const fetchLatestCoverLetter = async () => {
    try {
      const res = await axios.get('/api/coverletter/latest');
      if(res.data && res.data.length > 0) {
        setCoverLetter(res.data[0].coverLetter_Text);
      }
    } catch(err) {
      console.error("Error fetching latest cover letter:", err);
    }
  }

  // Fetch on initial load
  useEffect(() => {
    fetchLatestCoverLetter();
  }, []);

    return (
        <div></div>
    );

}



  