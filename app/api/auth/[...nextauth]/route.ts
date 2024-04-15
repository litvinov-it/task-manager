import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // Название, которое будет отображаться в форме входа в систему.
      name: "Credentials",

      // Тут перечисляются поля, которые мы хотим, чтобы были отправлены
      // пользователем при аутентификации. Эти учетные данные используются
      // для создания соответствующей формы на странице входа в систему.
      // Мы можем указать любые поля, которые ожидаем получить.
      // Через объект мы можем передать любые HTML-атрибуты тега <input>.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },

      async authorize(credentials): Promise<any> {
        // Проверяем, если в credentials нет поля email или password - возвращаем null.
        if (!credentials?.email || !credentials.password) return null;

        // Теперь ищем пользователя с переданным email.
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Если такого пользователя нет или пароли не совпадают - возвращаем null.
        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.hashedPassword!))
        ) {
          return null;
        }

        // Если пароли совпадают - возвращаем полностью объект пользователя.
        return { ...user, password: null, role: user.role };
      },
    }),
  ],
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
