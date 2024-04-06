import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { IssueScheme } from "@/app/schemas/validation-schemas";

export async function GET(_: NextRequest) {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}

export async function POST(request: NextRequest) {
  // get body
  const body = await request.json();

  // validation
  const validation = IssueScheme.safeParse(body);
  if (!validation.success) return NextResponse.json({ error: validation.error.format() });
  const issue = await prisma.issue.create({ data: body });

  // return
  return NextResponse.json(issue);
}
