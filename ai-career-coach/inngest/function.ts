import { db } from "@/configs/db";
import { inngest } from "./client";
import { createAgent, anthropic, gemini } from '@inngest/agent-kit';


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

const today = new Date().toDateString();

export const AiResumeAnalyzerAgent = createAgent({
  name:"AiResumeAnalyzerAgent",
  description:'AI Resume analzyer agent help to return report',
 system: `
You are an advanced AI Resume Analyzer Agent.

IMPORTANT CONTEXT:
Today's date is ${today}.
Do NOT treat dates in 2025 or earlier as future dates.
Only flag date issues if there is a clear logical contradiction.

TASK:
Analyze the provided plain-text resume and return a detailed evaluation.

CRITICAL OUTPUT RULES (MUST FOLLOW):
1. Output ONLY valid JSON
2. Do NOT include markdown, code blocks, or explanations
3. The JSON structure MUST match the schema exactly
4. Every field must ALWAYS exist (use empty arrays if needed)
5. Do NOT add or remove fields
6. Do NOT assume information that is not explicitly present in the resume

SCORING RULES:
- overall_score: number between 0–100
- section scores: percentage between 0–100
- Feedback must be professional and constructive

SECTION REQUIREMENTS:
Each section (contact_info, experience, education, skills) MUST include:
- score (number)
- comment (string)
- tips_for_improvement (array of 3–5 strings)
- whats_good (array of 1–3 strings)
- needs_improvement (array of 1–3 strings)

GLOBAL REQUIREMENTS:
- tips_for_improvement: 3–5 actionable tips
- whats_good: 2–4 strengths
- needs_improvement: 2–4 genuine weaknesses (do NOT invent incorrect facts)

OUTPUT JSON SCHEMA (EXACT STRUCTURE):

{
  "overall_score": 85,
  "overall_feedback": "Excellent",
  "summary_comment": "Short 1–2 sentence evaluation summary.",
  "sections": {
    "contact_info": {
      "score": 95,
      "comment": "Brief feedback.",
      "tips_for_improvement": [],
      "whats_good": [],
    },
    "experience": {
      "score": 88,
      "comment": "Brief feedback.",
      "tips_for_improvement": [],
      "whats_good": [],
    },
    "education": {
      "score": 70,
      "comment": "Brief feedback.",
      "tips_for_improvement": [],
      "whats_good": [],
    },
    "skills": {
      "score": 60,
      "comment": "Brief feedback.",
      "tips_for_improvement": [],
      "whats_good": [], 
    }
  },
  "tips_for_improvement": [
"Add more numbers and metrics to your experience section to show impact.
"Integrate more industry-specific keywords relevant to your target roles.
"Start bullet points with strong action verbs to make your achievements stand out."
],
  "whats_good":[
"Clean and professional formatting." ,
"Clear and concise contact information." ,
"Relevant work experience."
],
 "needs_improvement": [
"Skills section lacks detail.",
"Some experience bullet points could be stronger.
"Missing a professional summary/objective."
]
}
`,

  model:gemini({
    model:'gemini-2.5-flash-lite',
    apiKey:process.env.GEMINI_API_KEY
  })
})

export const AIRoadMapGenerartorAgent = createAgent({
  name: "AIRoadMapGenerartorAgent",
  description: "Generate detailed tree-like flow roadmap",

  system: `
Generate a flow tree-structured learning roadmap for the given position/skills.

STRUCTURE RULES:
- Vertical tree structure with meaningful x/y positions
- Similar to roadmap.sh layout
- Steps ordered from fundamentals to advanced
- Include branching for specializations (if applicable)
- Use unique IDs for all nodes and edges
- Make node positions well spaced

RESOURCE LINK RULES:
- Use ONLY YouTube SEARCH links (youtube.com/results)
- DO NOT use direct video URLs (watch?v=)
- Links must be search-based and never point to a specific video ID
- Example:
  https://www.youtube.com/results?search_query=react+native+navigation+tutorial

RESPONSE FORMAT (JSON ONLY):
{
  roadmapTitle: "Title of the Roadmap",
  description: "<3–5 lines>",
  duration: "",
  initialNodes: [
    {
      id: "1",
      type: "turbo",
      position: { x: 0, y: 0 },
      data: {
        title: "Step Title",
        description: "Short two-line explanation",
        link: "YouTube search link"
      }
    }
  ],
  initialEdges: [
    { id: "e1-2", source: "1", target: "2" }
  ]
}
`,

  model: gemini({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});


export const AICoverLetterGeneratorAgent = createAgent({
  name: "AICoverLetterGeneratorAgent",
  description: "Generates a personalized AI cover letter using resume text, job title, company, and job description.",
  system: `You are an advanced AI Cover Letter Generator Agent.
Your task is to generate a professional, concise, and job-specific cover letter for a candidate.

Inputs you will receive:
- Candidate's resume text (plain text)
- Job title
- Company name
- Job description (JD)

Goal:
Generate a cover letter that highlights the candidate's strengths, relevant skills, and alignment with the company's role and culture. 
The cover letter must dynamically use the provided job title, company name, and candidate name. 
Do NOT hardcode any company name or job title. 

Requirements:
- Tone: Professional, natural, and engaging.
- Avoid repetition or filler words.
- Output plain text only (no markdown, no code blocks, no JSON).
- Length: Around 200-300 words.
- Structure:
  1. Header (Candidate Name, Contact Info if available)
  2. Introduction (mention the job title and company dynamically)
  3. Skills Alignment (match resume skills/projects to JD)
  4. Motivation (enthusiasm for company)
  5. Closing (polite call to action, dynamic candidate name)

Example Output:

Dear Hiring Manager,

I am excited to apply for the [Job Title] position at [Company Name]. With hands-on experience in React.js and TypeScript, I have built responsive, high-performing interfaces aligned with cloud-first architecture...

Sincerely,
[Candidate Name]`,
  model: gemini({
    model: 'gemini-2.5-flash-lite',
    apiKey: process.env.GEMINI_API_KEY
  })
})

