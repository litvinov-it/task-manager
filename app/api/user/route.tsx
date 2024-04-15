import { userScheme } from "@/app/schemas/validation-schemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export async function GET(request: NextRequest) {
    // Получаем всех пользователей
    const users = await prisma.user.findMany();

    // Возвращаем ответ
    return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  // Получаем данные из запроса
  const body = await request.json();

  // Валидируем данные
  const validation = userScheme.safeParse(body);
  if (!validation.success) {
    return new Response(JSON.stringify(validation.error.format()), {
      status: 400,
    });
  }

  // Проверяем, существует ли уже пользователь с переданным email
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (user) {
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }

  // Хешируем пароль
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const data =  {
    name: body.name,
    email: body.email,
    hashedPassword: hashedPassword,
  };

  // Отправляем данные на сервер
  const newUser = await prisma.user.create({
    data: data,
  });

  // Отправляем ответ
  return NextResponse.json(newUser);
}