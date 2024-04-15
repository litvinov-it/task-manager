import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Получаем пользователя по id
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });

  // Проверяем, существует ли пользователь
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Возвращаем ответ
  return NextResponse.json(user);
}

export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await request.json();
  const role = body.role;

  if (!role) {
    return NextResponse.json({ error: "Missing role" }, { status: 400 });
  }

  // Обновляем роль пользователя
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { role },
  });

  // Возвращаем ответ
  return NextResponse.json(updatedUser);
}
