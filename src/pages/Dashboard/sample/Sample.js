import HeaderBar from "@/components/navigation/HeaderBar";
import { fetchDatas, updateData } from "@/utils/ApiServices";
import React, { useEffect, useMemo, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { useHistory } from "react-router-dom";

const Sample = ({ username, ...props }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    fetchDatas("labresults")
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const tableData = useMemo(() => {
    let computedData = Array.from(data);
    if (username === "Laboran" || username === "Registrasi") {
      computedData = computedData.filter(
        (data) =>
          data.status.indexOf("Sudah Bayar") > -1 ||
          (data.status !== undefined &&
            data.status.toString().includes("Sudah Bayar")) ||
          (data.status !== undefined &&
            data.status.toString().includes("On Proses"))
      );
    }
    return computedData;
  }, [data, username]);

  return (
    <div className="min-h-screen bg-yellow-400 bg-pattern-lab pb-8">
      <HeaderBar>Status Sample</HeaderBar>
      <div className="mx-4 my-2 p-3 bg-gray-50 rounded-lg">
        {!loading && (
          <>
            <table className="w-full">
              <thead className="bg-gray-100 text-base select-none ">
                <tr>
                  <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                    No.
                  </th>
                  <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                    No. Registrasi
                  </th>
                  <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                    No. Rekam Medis
                  </th>
                  <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                    Nama
                  </th>
                  <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                    Status
                  </th>
                  {!(username === "Registrasi") && (
                    <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                      Aksi
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {tableData.length !== 0 ? (
                  tableData.map((data, key) => (
                    <tr
                      className="text-center h-11 select-none cursor-pointer text-sm"
                      key={key}
                    >
                      <td className="border border-gray-300 p-1">{key + 1}</td>
                      <td className="border border-gray-300 p-1">
                        {String(data.id).padStart(8, "0")}
                      </td>
                      <td className="border border-gray-300 p-1">
                        {data.patient.no_rm}
                      </td>
                      <td className="border border-gray-300 p-1">
                        {data.patient.nama}
                      </td>
                      <td className="border border-gray-300 p-1">
                        {data.status}
                      </td>
                      {!(username === "Registrasi") && (
                        <td className="border border-gray-300 p-1">
                          <button
                            type="button"
                            className="focus:outline-none text-white text-sm p-2 bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg rounded-md"
                            onClick={() => {
                              history.push(`/hasil-pemeriksaan/${data.id}`);
                              updateData(
                                "labresults",
                                {
                                  status: "On Proses",
                                  patient_id: data.patient.id,
                                },
                                data.id
                              );
                            }}
                          >
                            <BiPencil />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr className="text-center">
                    <td
                      colSpan={!(username === "Registrasi") ? 6 : 5}
                      className="border border-gray-300 p-5"
                    >
                      <span className="text-xl">Data Not Found</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Sample;
