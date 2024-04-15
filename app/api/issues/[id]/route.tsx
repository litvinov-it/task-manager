import { IssueScheme } from "@/app/schemas/validation-schemas";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    // Получение тела запроса
    const body = await request.json();

    // Валидация тела запроса
    const validation = IssueScheme.safeParse(body);
    if (!validation.success) return NextResponse.json({ error: validation.error.format() });

    // Обновление задачи
    const issue = await prisma.issue.update({ where: { id: Number(params.id) }, data: body });

    // Отправка ответа
    return NextResponse.json(issue);
}