import FormInput from "@/components/input/FormInput";
import HeaderBar from "@/components/navigation/HeaderBar";
import { fetchDatas, showData, updateData } from "@/utils/ApiServices";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

const Hasil = () => {
  let history = useHistory();
  const [data, setData] = useState({});
  const [currentId, setCurrentId] = useState();
  const [testId, setTestId] = useState();
  const [examId, setExamId] = useState();
  const [dataLab, setDataLab] = useState();
  const [addHasil, setAddHasil] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      fetchDatas("labresults/latest")
        .then((res) => {
          setCurrentId(res.id);
          console.log(currentId);
          showData("labresults", res.id)
            .then((res) => {
              setDataLab(res[0]);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    data.lab_result_id = currentId;
    data.id = testId;
    data.examination_id = examId;
    console.log(data);

    updateData("testresult", data, testId)
      .then((res) => {
        console.log(res);
        showData("labresults", currentId)
          .then((res) => {
            setDataLab(res[0]);
          })
          .catch((err) => {
            console.log(err);
          });
        setAddHasil(false);
      })
      .catch((err) => {
        console.log(err);
        setAddHasil(false);
      });
  };

  return (
    <div className="min-h-screen bg-yellow-400 pb-8">
      <HeaderBar>Hasil Pemeriksaan (3/3)</HeaderBar>
      <div className="mx-4 my-2 p-3 bg-gray-50 rounded-lg">
        <table className="w-full mb-6">
          <thead className="bg-gray-100 text-base select-none ">
            <tr>
              <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                No.
              </th>
              <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                Jenis Pemeriksaan
              </th>
              <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                Hasil
              </th>
              <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                Rujukan
              </th>
              <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                Satuan
              </th>
              <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                Catatan
              </th>
              <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="text-base select-none">
            {dataLab !== undefined &&
              Array.from(dataLab.testresults).map((testresults, key) => (
                <tr key={key}>
                  <td className="border border-gray-300 p-1">{key + 1}</td>
                  <td className="border border-gray-300 p-1">
                    {testresults.examination.nama}
                  </td>
                  <td className="border border-gray-300 p-1">
                    {testresults.hasil}
                  </td>
                  <td className="border border-gray-300 p-1">
                    {testresults.examination.nilai_rujukan}
                  </td>
                  <td className="border border-gray-300 p-1">
                    {testresults.examination.satuan}
                  </td>
                  <td className="border border-gray-300 p-1">
                    {testresults.catatan}
                  </td>
                  <td className="border border-gray-300 p-1 flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        console.log(testresults.id);
                        setTestId(testresults.id);
                        setExamId(testresults.examination.id);
                        setAddHasil(true);
                      }}
                      className="focus:outline-none text-white text-sm py-2.5 px-3 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg mb-3"
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={() => {
            history.push("/hasil-pemeriksaan/selesai");
          }}
          className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg mb-3"
        >
          Lanjut
        </button>
        {addHasil && (
          <>
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                ></span>

                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <form onSubmit={handleSubmit}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg
                            className="h-6 w-6 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3
                            className="text-lg leading-6 font-medium text-gray-900"
                            id="modal-headline"
                          >
                            Tambah Jenis Pemeriksaan
                          </h3>
                          <div className="mt-2">
                            <FormInput
                              name="hasil"
                              label="Hasil"
                              onChange={handleChange}
                            />
                            <FormInput
                              name="catatan"
                              label="Catatan"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Simpan
                      </button>

                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => {
                          setAddHasil(false);
                        }}
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Hasil;
