import React, { useEffect, useState } from "react";
import { addData, fetchDatas, showData } from "@/utils/ApiServices";
import FormSelect from "@/components/input/FormSelect";
import HeaderBar from "@/components/navigation/HeaderBar";
import { useHistory } from "react-router";

const Pembayaran = () => {
  const [addExam, setAddExam] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [dataLab, setDataLab] = useState({});
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      fetchDatas("patient/latest")
        .then((res) => {
          setCurrentId(res.id);
          console.log(res);
          showData("patients", res.id).then((res) => {
            setDataLab(res);
            console.log(res);
            setLoading(false);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    data.patient_id = currentId;
    addData("payment", data).then((res) => {
      console.log(res);
      showData("patients", currentId).then((res) => {
        setDataLab(res);
        console.log(res);
        setAddExam(false);
        setLoading(false);
      });
    });
  };

  const handleDone = (e) => {
    addData("labresults", {
      patient_id: currentId,
      status: "Sudah Bayar",
    })
      .then((res) => {
        console.log(res);
        history.push("/daftar-pasien/tambah");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getHarga = (e) => {
    if (dataLab[0].payment === undefined) {
      return 0;
    } else {
      let harga = 0;
      dataLab[0].payment.forEach((pay) => {
        harga += parseInt(pay.examination.harga);
      });
      return harga;
    }
  };

  const formatRupiah = (b) => {
    var number_string = b.toString(),
      sisa = number_string.length % 3,
      rupiah = number_string.substr(0, sisa),
      ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    return rupiah;
  };

  return (
    <div className="min-h-screen bg-yellow-400 bg-pattern-lab pb-8">
      <HeaderBar>Pembayaran</HeaderBar>
      <div className="mx-4 my-2 p-3 bg-gray-50 rounded-lg">
        <button
          type="button"
          onClick={() => setAddExam(true)}
          className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg mb-3"
        >
          +
        </button>

        <table className="w-full">
          <thead className="bg-gray-100 text-base select-none ">
            <tr>
              <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                No.
              </th>
              <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                Jenis Pemeriksaan
              </th>
              <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                Harga
              </th>
            </tr>
          </thead>
          <tbody className="text-base select-none">
            {!loading &&
              Array.from(dataLab[0].payment).map((paymentData, key) => (
                <tr key={key}>
                  <td className="border border-gray-300 p-1">{key + 1}</td>
                  <td className="border border-gray-300 p-1">
                    {paymentData.examination.nama}
                  </td>
                  <td className="border border-gray-300 p-1">
                    Rp{" "}
                    {paymentData.examination.harga === ""
                      ? 0
                      : formatRupiah(paymentData.examination.harga)}
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot className="bg-gray-100 text-base select-none ">
            <tr>
              <td
                colSpan="2"
                className="border border-gray-300 px-2 py-1 font-medium text-sm"
              >
                Total Harga
              </td>
              <td className="border border-gray-300 px-2 py-1 font-medium text-sm">
                Rp {!loading && formatRupiah(getHarga())}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => {
              const win = window.open(
                "/daftar-pasien/pembayaran/cetak",
                "_blank"
              );
              win.focus();
            }}
            className="mr-2 focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg mb-3"
          >
            Cetak Bukti Pembayaran
          </button>
          <button
            type="button"
            onClick={handleDone}
            className="ml-2 focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg mb-3"
          >
            Selesai
          </button>
        </div>
      </div>
      {addExam && (
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
                <form onSubmit={handlePaymentSubmit}>
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
                          <FormSelect
                            name="examination_id"
                            noLabel
                            apiData="examinations"
                            onChange={(e) => {
                              setData({
                                ...data,
                                [e.target.name]: e.target.value,
                              });
                            }}
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
                      Tambah
                    </button>

                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setAddExam(false);
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
  );
};

export default Pembayaran;
