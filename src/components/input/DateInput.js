import React from "react";

const DateInput = ({
  label,
  namePlace,
  nameDate,
  required,
  defaultPlace,
  defaultDate,
  onChangePlace,
  onChangeDate,
  disabled,
  ...props
}) => {
  const getAge = (date) => {
    let today = new Date();
    let birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <>
      <div className="mb-6">
        <div className="text-gray-900 md:flex md:items-center">
          <div className="mb-1 md:mb-0 md:w-1/3">
            <label htmlFor="nama">{label}</label>
          </div>
          <div className="md:w-2/3 md:flex-grow">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <input
                  className="w-1/2 h-10 px-3 text-base placeholder-gray-600 border rounded-l-lg focus:shadow-outline"
                  type="text"
                  name={namePlace}
                  autoComplete="off"
                  required={required || false}
                  defaultValue={defaultPlace || ""}
                  onChange={onChangePlace}
                  disabled={disabled || false}
                />
                <input
                  className="w-1/2 h-10 px-3 text-base placeholder-gray-600 border rounded-r-lg focus:shadow-outline"
                  type="date"
                  name={nameDate}
                  autoComplete="off"
                  required={required || false}
                  defaultValue={defaultDate || ""}
                  onChange={onChangeDate}
                  disabled={disabled || false}
                />
              </div>
              <div>
                <div className="mb-6">
                  <div className="text-gray-900 md:flex md:items-center">
                    <div className="mb-1 md:mb-0 md:w-1/3">
                      <label htmlFor="nama">Usia</label>
                    </div>
                    <div className="md:w-2/3 md:flex-grow">
                      <input
                        className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                        type="text"
                        disabled
                        value={getAge(props.date) || 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateInput;
