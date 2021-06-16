import { fetchDatas } from "@/utils/ApiServices";
import React, { useEffect, useState } from "react";

const FormSelect = ({
  name,
  label,
  type,
  required,
  onChange,
  apiData,
  sampleApi,
  noLabel,
  defaultValue,
  disabled,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mb-6">
        <div className="text-gray-900 md:flex md:items-center">
          {!noLabel && (
            <div className="mb-1 md:mb-0 md:w-1/3">
              <label htmlFor="nama">{label}</label>
            </div>
          )}
          <div
            className={"md:flex-grow " + (!noLabel ? "md:w-full" : "md:w-2/3")}
          >
            <select
              className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type={type || "text"}
              name={name}
              autoComplete="off"
              required={required || false}
              onChange={onChange}
              disabled={disabled}
              defaultValue={defaultValue}
            >
              <option value=""></option>
              {!loading &&
                Array.from(data).map((option, key) => (
                  <option value={option.id} key={key}>
                    {sampleApi ? option.jenis_spesimen : option.nama}
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
