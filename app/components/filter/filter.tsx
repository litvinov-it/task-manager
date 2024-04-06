import React from "react";

interface IProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const Filter = ({ filter, setFilter }: IProps) => {
  const filterList = [
    {
      name: "all",
      text: "Все",
      color: "bg-blue-500",
    },
    {
      name: "completed",
      text: "Выполненные",
      color: "bg-green-500",
    },
    {
      name: "uncompleted",
      text: "Невыполненные",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="flex gap-4">
      {filterList.map((item) => (
        <div key={item.name + item.text} className="form-control">
          <label className="label cursor-pointer flex gap-2">
            <span className="label-text">{item.text}</span>
            <input
              type="radio"
              name="filter_task"
              className={`radio checked:${item.color}`}
              defaultChecked={filter === item.name}
              onChange={() => setFilter(item.name)}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default Filter;
