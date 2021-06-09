import React from "react";

const DateTimeInput = ({
  label,
  nameDate,
  required,
  defaultDate,
  onChangeDate,
  onChangeTime,
  nameTime,
  disabled,
  defaultTime,
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
              className="w-1/2 h-10 px-3 text-base placeholder-gray-600 border rounded-l-lg focus:shadow-outline"
              type="date"
              name={nameDate}
              autoComplete="off"
              required={required || false}
              defaultValue={defaultDate || ""}
              onChange={onChangeDate}
              disabled={disabled || false}
            />
            <input
              className="w-1/2 h-10 px-3 text-base placeholder-gray-600 border rounded-r-lg focus:shadow-outline"
              type="text"
              name={nameTime}
              autoComplete="off"
              required={required || false}
              defaultValue={defaultTime || ""}
              onChange={onChangeTime}
              disabled={disabled || false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DateTimeInput;
