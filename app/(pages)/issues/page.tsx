"use client";
import React, { useEffect, useMemo, useState } from "react";
import Filter from "@/app/components/filter/filter";
import Link from "next/link";
import { IIssue } from "@/app/schemas/validation-schemas";
import Issue from "@/app/components/issue/issue";
import { useSession } from "next-auth/react";

const Page = () => {
  // Инициализация стейта
  const [filter, setFilter] = useState("all");
  const [issues, setIssues] = useState<IIssue[]>([]);

  // Инициализация сессии
  const { data: session } = useSession();

  // @ts-ignore так как ругается на типы сессии при получении роли (по умолчанию роли нет в типах)
  const role = session?.user.role;
  console.log(role, session)

  // Запрос на получение задач
  const refreshIssues = () => {
    fetch("http://localhost:3000/api/issues")
      .then((res) => res.json())
      .then((issues) => setIssues(issues));
  };

  // Обновление задач
  useEffect(() => {
    refreshIssues();
  }, []);

  // Обработчик изменения статуса задачи
  const editCompleted = (id: number) => {
    // Проверка на существование задачи
    const issue = issues.find((item) => item.id === id);
    if (!issue) return;

    // Обновление задачи
    fetch(`http://localhost:3000/api/issues/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !issue.completed,
        title: issue.title,
        description: issue.description,
      }),
    }).then(() => {
      // Обновление стейта

      // Ищем индекс задачи
      const index = issues.findIndex((item) => item.id === id);
      // Создаем копию стейта
      const newIssues = [...issues];
      // Обновляем статус задачи
      newIssues[index].completed = !newIssues[index].completed;
      // Обновляем стейт
      setIssues(newIssues);
    });
  };

  const filteredIssues: IIssue[] = useMemo(() => {
    // Фильтрация задач

    // Если фильтр "Все", то возвращаем все задачи
    if (filter === "all") {
      const completedIssues = issues.filter((item) => item.completed);
      const uncompletedIssues = issues.filter((item) => !item.completed);
      return [...uncompletedIssues, ...completedIssues];
    }
    // Если фильтр "Завершенные", то возвращаем только завершенные задачи
    if (filter === "completed") return issues.filter((item) => item.completed);

    // Если фильтр "Незавершенные", то возвращаем только незавершенные задачи
    if (filter === "uncompleted")
      return issues.filter((item) => !item.completed);

    // Иначе возвращаем все задачи
    return issues;

    // Фильтр срабатывает только при изменении issues, filter
  }, [issues, filter]);

  return (
    <div>
      {/* Панель действий */}
      <div className="flex gap-4 justify-between border-y border-neutral-700 py-4 items-center my-6">
        {/* Фильтр */}
        <Filter filter={filter} setFilter={setFilter} />
        {/* Добавить задачу (доступна только админу) */}
        {role && role === "ADMIN" && (
          <Link className="btn btn-outline btn-md" href="/issues/new">
            Добавить задачу
          </Link>
        )}
      </div>

      {/* Список задач */}
      <div className="flex flex-col gap-4">
        {filteredIssues.map((item: IIssue) => (
          <Issue
            key={item.id + item.title + item.description}
            item={item}
            editCompleted={editCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;