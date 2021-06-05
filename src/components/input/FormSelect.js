import { fetchDatas } from "@/utils/ApiServices";
import React, { useEffect, useMemo, useState } from "react";

const FormSelect = ({
  name,
  label,
  type,
  required,
  onChange,
  apiData,
  ...props
}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;

    fetchDatas(apiData).then((res) => {
      if (isSubscribed) {
        setData(res);
        setLoading(false);
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      <div className="mb-6">
        <div className="text-gray-900 md:flex md:items-center">
          <div className="mb-1 md:mb-0 md:w-1/3">
            <label htmlFor="nama">{label}</label>
          </div>
          <div className="md:w-2/3 md:flex-grow">
            <select
              className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type={type || "text"}
              name={name}
              autoComplete="off"
              required={required || false}
              onChange={onChange}
            >
              <option value=""></option>
              {Array.from(data).map((option, key) => (
                <option value={option.id} key={key}>
                  {option.nama}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSelect;
