"use client";

import Input from "@/app/components/input/input";
import { IIssueForm, IssueScheme } from "@/app/schemas/validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  // Инициализация стейта
  const [error, setError] = useState("");

  // Инициализация роутера
  const router = useRouter();

  // Инициализация формы
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IIssueForm>({
    resolver: zodResolver(IssueScheme),
  });

  // Обработчик создания задачи
  const submitHandler = (data: IIssueForm) => {
    try {
      // Отправка данных на сервер
      fetch("http://localhost:3000/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // Перенаправление на страницу с задачами
      router.push("/issues");
    } catch (error) {
      setError("Произошла ошибка при создании задачи");
    }
  };

  return (
    <div>
      {/* Форма */}
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        {/* Заголовок */}
        <Input
          label="Заголовок"
          placeholder="введите текст..."
          type="text"
          register={register("title")}
          error={errors.title?.message}
        />
        {/* Описание */}
        <Input
          label="Описание"
          placeholder="введите текст..."
          type="text"
          register={register("description")}
          error={errors.description?.message}
        />
        {/* Статус */}
        {error ? <p className="text-red-500">{error}</p> : null}
        {/* Отправка */}
        <button className="btn btn-secondary" type="submit">
          Создать
        </button>
      </form>
    </div>
  );
};

export default Page;
