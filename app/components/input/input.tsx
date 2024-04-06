import React from "react";

interface IProps {
  label: string;
  placeholder: string;
  type: string;
  error?: string;
  register: any;
}

const Input = ({ label, placeholder, type, error, register }: IProps) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <p>{label}</p>
        {error && <p className="label-text-alt text-red-400">{error}</p>}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full"
        {...register}
      />
    </label>
  );
};

export default Input;
