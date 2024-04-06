import { IIssue } from "@/app/schemas/validation-schemas";
import React, { useState } from "react";
import Checkbox from "../checkbox/checkbox";

interface IProps {
  item: IIssue;
  editCompleted: (id: number, completed: boolean) => void;
}

const Issue = ({ item, editCompleted }: IProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`collapse border border-neutral-700 collapse-arrow ${open ? "collapse-open" : ""}`}>
      <div className="collapse-title text-xl font-medium flex gap-2 items-center">
        <Checkbox
          id={item.id}
          completed={item.completed}
          editCompleted={editCompleted}
        />
        <p className="w-full" onClick={() => setOpen(!open)}>{item.title}</p>
      </div>
      <div className="collapse-content pl-11">
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default Issue;
