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
  if (!validation.success)
    return NextResponse.json({ error: validation.error.format() });

  // get user
  const user = await prisma.user.findUnique({ where: { id: parseInt(body.userId) } });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // create
  const issue = await prisma.issue.create({ data: {
    title: body.title,
    description: body.description,
    user: {
      connect: { id: user.id }
    }
  } });

  // return
  return NextResponse.json(issue);
}
