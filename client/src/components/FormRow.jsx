import React from "react";

const FormRow = ({
  type,
  name,
  value,
  labelText,
  defaultValue = "",
  onChange,
}) => {
  const isFileInput = type === "file";
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className="text-slate-600 font-medium text-sm">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={isFileInput ? undefined : value}
        onChange={onChange}
        className="p-2 w-full border text-left rounded-sm text-gray-700 placeholder-gray-400 border-slate-200 focus:border-slate-600 focus:outline-none box-border"
        required
      />
    </div>
  );
};

export default FormRow;
