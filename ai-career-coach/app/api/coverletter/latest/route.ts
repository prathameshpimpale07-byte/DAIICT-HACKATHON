import { NextResponse } from "next/server";
import { db } from "../../../../configs/db";
import { coverLetterTable } from "../../../../configs/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    // Fetch all cover letters ordered by newest first
    const latestResumes = await db
      .select()
      .from(coverLetterTable)
      .orderBy(desc(coverLetterTable.createdAt));
