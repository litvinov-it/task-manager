"use client"
import React from "react";

interface IProps {
    id: number;
    completed: boolean;
    editCompleted: (id: number, completed: boolean) => void;
}

const Checkbox = ({ id, completed, editCompleted }: IProps) => {
  return (
    <input
      type="checkbox"
      defaultChecked={completed}
      onChange={() => editCompleted(id, !completed)}
      className="checkbox checkbox-sm z-50"
    />
  );
};

export default Checkbox;
