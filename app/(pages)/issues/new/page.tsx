"use client";

import Input from "@/app/components/input/input";
import { IIssueForm, IssueScheme } from "@/app/schemas/validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const [error, setError] = useState('')
  const router = useRouter()

  const { register, handleSubmit, formState: {errors} } = useForm<IIssueForm>({
    resolver: zodResolver(IssueScheme),
  });

  const submitHandler = (data: IIssueForm) => {
    try {
      fetch('http://localhost:3000/api/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      router.push('/issues')
    } catch (error) {
      setError("Произошла ошибка при создании задачи")
    }
  }

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)}>
        <Input
          label="Заголовок"
          placeholder="введите текст..."
          type="text"
          register={register("title")}
          error={errors.title?.message}
        />
        <Input
          label="Описание"
          placeholder="введите текст..."
          type="text"
          register={register("description")}
          error={errors.description?.message}
        />
        {error ? <p className="text-red-500">{error}</p> : null}
        <button className="btn btn-secondary" type="submit">Создать</button>
      </form>
    </div>
  );
};

export default Page;
