import React from "react";

const FormInput = ({
  name,
  type,
  required,
  defaultValue,
  label,
  onChange,
  disabled,
  ...props
}) => {
  return (
    <>
      <div className="mb-6">
        <div className="text-gray-900 md:flex md:items-center">
          <div className="mb-1 md:mb-0 md:w-1/3">
            <label htmlFor="nama">{label}</label>
          </div>
          <div className="md:w-2/3 md:flex-grow">
            <input
              className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type={type || "text"}
              name={name}
              autoComplete="off"
              required={required || false}
              defaultValue={defaultValue || ""}
              onChange={onChange}
              disabled={disabled || false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormInput;
