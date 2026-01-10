import { NextRequest } from "next/server";
import { NextResponse } from "next/server"; 
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { inngest } from "@/inngest/client";
import { run } from "node:test";
import axios from "axios";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const resumeFile:any = formData.get("resumeFile");
  const recordId = formData.get("recordId");
    const user = await currentUser();
    if (!user?.primaryEmailAddress?.emailAddress) {
  return NextResponse.json({ error: "Unauthorized or missing email" }, { status: 401 });
}
    const email= user?.primaryEmailAddress?.emailAddress;
    const dbUser = await db.select().from(usersTable).where(eq(usersTable.email, email));
if (!dbUser.length) {
  return NextResponse.json({ error: "User not found in DB" }, { status: 404 });
}
const userId = dbUser[0].id;
  const loader = new WebPDFLoader(resumeFile)
  const docs = await loader.load();
  


}