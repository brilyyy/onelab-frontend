import HeaderBar from "@/components/navigation/HeaderBar";
import FormInput from "@/components/input/FormInput";
import DateInput from "@/components/input/DateInput";
import DateTimeInput from "@/components/input/DateTimeInput";
import React, { useState, useEffect } from "react";
import { fetchDatas, showData } from "@/utils/ApiServices";
import { useHistory } from "react-router";

const Selesai = () => {
  let history = useHistory();
  const [data, setData] = useState({});
  const [currentId, setCurrentId] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      fetchDatas("labresults/latest")
        .then((res) => {
          setCurrentId(res.id);
          console.log(currentId);
          showData("labresults", res.id)
            .then((res) => {
              setData(res[0]);
              setLoading(false);
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

  return (
    <div className="min-h-screen bg-yellow-400 pb-8">
      {!loading && (
        <>
          <HeaderBar>Data Hasil Pemeriksaan</HeaderBar>
          <div className="grid grid-cols-2 gap-3">
            <div className="ml-4 my-2 p-3 bg-gray-50 rounded-lg">
              <FormInput
                label="No. Rekam Medis"
                name="no_rm"
                type="text"
                disabled
                defaultValue={data.patient.no_rm}
              />
              <FormInput
                label="Nama"
                name="nama"
                type="text"
                disabled
                defaultValue={data.patient.nama}
              />
              <DateInput
                label="TTL"
                required={true}
                namePlace="tempat_lahir"
                nameDate="tanggal_lahir"
                defaultDate={data.patient.tanggal_lahir}
                defaultPlace={data.patient.tempat_lahir}
                disabled
              />
              <FormInput
                label="Jenis Kelamin"
                name="jenis_kelamin"
                type="text"
                defaultValue={data.patient.jenis_kelamin}
                disabled
              />
              <FormInput
                label="Alamat"
                name="alamat"
                type="text"
                disabled
                defaultValue={data.patient.alamat}
              />
              <FormInput
                label="No. Telp"
                name="no_telp"
                type="number"
                disabled
                defaultValue={data.patient.no_telp}
              />
            </div>
            <div className="mr-4 my-2 p-3 bg-gray-50 rounded-lg">
              <FormInput
                label="No. Spesimen"
                name="no_spesimen"
                type="number"
                disabled
                defaultValue={data.no_spesimen}
              />
              <FormInput
                label="Jenis Spesimen"
                name="jenis_spesimen"
                disabled
                defaultValue={data.sample.jenis_spesimen}
              />
              <DateTimeInput
                label="Tanggal/Jam Pengambilan"
                nameDate="tanggal_pengambilan_spesimen"
                nameTime="jam_pengambilan_spesimen"
                disabled
                defaultDate={data.tanggal_pengambilan_spesimen}
                defaultTime={data.jam_pengambilan_spesimen}
              />
              <FormInput
                label="Petugas Laboratorium"
                disabled
                defaultValue={data.laborat.nama}
              />
            </div>
          </div>

          <div className="mx-4 my-2 p-3 bg-gray-50 rounded-lg">
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
                {Array.from(data.payment).map((paymentData, key) => (
                  <tr key={key}>
                    <td className="border border-gray-300 p-1">{key + 1}</td>
                    <td className="border border-gray-300 p-1">
                      {paymentData.examination.nama}
                    </td>
                    <td className="border border-gray-300 p-1">
                      {paymentData.examination.harga === ""
                        ? 0
                        : paymentData.examination.harga}
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
                    0
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="mx-4 my-3 p-3 bg-gray-50 rounded-lg">
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
                </tr>
              </thead>
              <tbody className="text-base select-none">
                {Array.from(data.testresults).map((testresults, key) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center">
              <button className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg mb-3 mr-2">
                Cetak Hasil
              </button>
              <button
                className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg mb-3 ml-2"
                onClick={() => {
                  history.replace("/hasil-pemeriksaan");
                }}
              >
                Selesai
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Selesai;
