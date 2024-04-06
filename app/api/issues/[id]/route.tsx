import { IssueScheme } from "@/app/schemas/validation-schemas";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json();

    const validation = IssueScheme.safeParse(body);
    if (!validation.success) return NextResponse.json({ error: validation.error.format() });

    const issue = await prisma.issue.update({ where: { id: Number(params.id) }, data: body });

    return NextResponse.json(issue);
}