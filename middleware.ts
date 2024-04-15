import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// функция посредник для проверки ролей и авторизации
export default async function middleware(request: NextRequest) {
  // Получаем токен
  const token = await getToken({ req: request, secret: process.env.SECRET });

  // Если нет токена, перенаправляем на страницу авторизации
  if (!token)
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));

  // Получаем роль
  const role = String(token.role).toUpperCase();

  // В замисимости от роли проверяем каждый роут на доступ
  switch (role) {
    // role USER
    case "USER":
      // Если роут не /issues перенаправляем на /issues (потому что доступ у него только на этот роут)
      if (request.nextUrl.pathname !== "/issues") {
        return NextResponse.redirect(new URL("/issues", request.url));
      }
      break;
    // role ADMIN
    case "ADMIN":
      // На данный момент ограничений нет
      break;
    default:
      // Если роль не USER и ADMIN перенаправляем на страницу авторизации
      return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }
}

// Настройки маршрутизации
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|api/auth/signin).*)"],
};
