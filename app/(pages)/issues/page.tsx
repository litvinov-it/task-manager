"use client";
import React, { useEffect, useMemo, useState } from "react";
import Filter from "@/app/components/filter/filter";
import Link from "next/link";
import { IIssue } from "@/app/schemas/validation-schemas";
import Issue from "@/app/components/issue/issue";

const Page = () => {
  const [filter, setFilter] = useState("all");
  const [issues, setIssues] = useState<IIssue[]>([]);

  const refreshIssues = () => {
    fetch("http://localhost:3000/api/issues")
      .then((res) => res.json())
      .then((issues) => setIssues(issues));
  };

  useEffect(() => {
    refreshIssues();
  }, []);

  const editCompleted = (id: number) => {
    const issue = issues.find((item) => item.id === id);

    if (!issue) return;

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
      const index = issues.findIndex((item) => item.id === id);
      const newIssues = [...issues];
      newIssues[index].completed = !newIssues[index].completed;
      setIssues(newIssues);
    });
  };

  const filteredIssues: IIssue[] = useMemo(() => {
    if (filter === "all") {
      const completedIssues = issues.filter((item) => item.completed);
      const uncompletedIssues = issues.filter((item) => !item.completed);
      return [...uncompletedIssues, ...completedIssues];
    }
    if (filter === "completed") return issues.filter((item) => item.completed);
    if (filter === "uncompleted")
      return issues.filter((item) => !item.completed);
    return issues;
  }, [issues, filter]);

  return (
    <div>
      <div className="flex gap-4 justify-between border-y border-neutral-700 py-4 items-center my-6">
        <Filter filter={filter} setFilter={setFilter} />
        <Link className="btn btn-outline btn-md" href="/issues/new">
          Добавить задачу
        </Link>
      </div>

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
