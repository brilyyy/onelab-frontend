import SubmitButton from "@/components/button/SubmitButton";
import FormInput from "@/components/input/FormInput";
import FormSearch from "@/components/input/FormSearch";
import DateInput from "@/components/input/DateInput";
import FormSelect from "@/components/input/FormSelect";
import HeaderBar from "@/components/navigation/HeaderBar";
import { addData, showData } from "@/utils/ApiServices";
import React, { useState } from "react";
import DateTimeInput from "@/components/input/DateTimeInput";
import NextButton from "@/components/button/NextButton";

const HasilPemeriksaan = () => {
  const [data, setData] = useState({ patient_id: 0 });
  const [patient, setPatient] = useState();
  const [exam, setExam] = useState();
  const [rm, setRm] = useState(0);
  const [next, setNext] = useState(false);
  const [done, setDone] = useState("0000-00-00");
  const [checked, setChecked] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // data.test_id = exam.test_id;
    // data.total_harga = 100000;
    // addData("labresults", data)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
    console.log(data);
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.name === "examination_id") {
      setExam({});
      showData("examinations", e.target.value)
        .then((res) => {
          setExam(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleRmChange = (e) => {
    setRm(e.target.value);
  };
  const handleSearch = (e) => {
    showData("patients/rm", rm)
      .then((res) => {
        setPatient(res[0]);
        data.patient_id = res[0].id;
        console.log(res[0]);
      })
      .catch((err) => {
        console.log(err);
        data.patient_id = 0;
      });
  };
  const handleCheck = (e) => {
    setChecked(!checked);
    if (!checked) {
      var today = new Date();
      var dd = today.getDate();

      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      setDone(yyyy + "-" + mm + "-" + dd);
    } else {
      setDone("YYYY-MM-DD");
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 pb-8">
      <HeaderBar>Hasil Pemeriksaan</HeaderBar>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <div className="ml-4 my-2 p-3 bg-gray-50 rounded-lg">
            <FormSearch onClick={handleSearch} onChange={handleRmChange} />
            {patient !== undefined ? (
              <>
                <FormInput
                  label="Nama"
                  name="nama"
                  type="text"
                  defaultValue={patient.nama}
                  disabled
                />
                <DateInput
                  label="TTL"
                  required={true}
                  namePlace="tempat_lahir"
                  nameDate="tanggal_lahir"
                  defaultDate={patient.tanggal_lahir}
                  defaultPlace={patient.tempat_lahir}
                  date={patient.tanggal_lahir}
                  disabled
                />
                <FormInput
                  label="Jenis Kelamin"
                  name="jenis_kelamin"
                  type="text"
                  defaultValue={patient.jenis_kelamin}
                  disabled
                />
                <FormInput
                  label="Alamat"
                  name="alamat"
                  type="text"
                  defaultValue={patient.alamat}
                  disabled
                />
                <FormInput
                  label="No. Telp"
                  name="no_telp"
                  type="number"
                  defaultValue={patient.no_telp}
                  disabled
                />
              </>
            ) : (
              <h1 className="text-xl text-center">Pasien Tidak Ditemukan</h1>
            )}
          </div>
          <div className="mr-4 my-2 p-3 bg-gray-50 rounded-lg">
            <FormInput
              label="No. Spesimen"
              name="no_spesimen"
              type="number"
              onChange={handleChange}
              required
            />
            <FormSelect
              label="Jenis Spesimen"
              name="sample_id"
              apiData="samples"
              sampleApi
              onChange={handleChange}
            />
            <DateTimeInput
              label="Tanggal/Jam Pengambilan"
              nameDate="tanggal_pengambilan_spesimen"
              nameTime="jam_pengambilan_spesimen"
              onChangeDate={handleChange}
              onChangeTime={handleChange}
            />
            <FormSelect
              label="Petugas Laboratorium"
              name="laborat_id"
              apiData="laborans"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mx-4 my-2 p-3 bg-gray-50 rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-100 text-base select-none">
              <tr>
                <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                  Jenis Pemeriksaan
                </th>
                <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                  Hasil
                </th>
                <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                  Nilai Rujukan
                </th>
                <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                  Satuan
                </th>
                <th className="border border-gray-300 px-2 py-1 font-medium text-sm">
                  Catatan
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center h-11 select-none cursor-pointer text-sm">
                <td className="border border-gray-300 p-1">
                  <FormSelect
                    name="examination_id"
                    apiData="examinations"
                    onChange={handleChange}
                    noLabel
                  />
                </td>
                <td className="border border-gray-300 p-1">
                  <FormInput name="hasil" noLabel onChange={handleChange} />
                </td>
                <td className="border border-gray-300 p-1">
                  <div className="mb-6">
                    <div className="text-gray-900 md:flex md:items-center">
                      <div className="md:w-full md:flex-grow">
                        <input
                          className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                          disabled
                          defaultValue={
                            exam !== undefined ? exam.nilai_rujukan : ""
                          }
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border border-gray-300 p-1">
                  <div className="mb-6">
                    <div className="text-gray-900 md:flex md:items-center">
                      <div className="md:w-full md:flex-grow">
                        <input
                          className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                          disabled
                          defaultValue={exam !== undefined ? exam.satuan : ""}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border border-gray-300 p-1">
                  <textarea
                    className="w-full h-20 px-3 mt-4 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    name="catatan"
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </div>
        {/* {next && (
          <div className="mx-4 my-2 p-3 bg-gray-50 rounded-lg">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-2 py-4">Rekam Medis</th>
                  <th className="px-2 py-4">Nama Pasien</th>
                  <th className="px-2 py-4">Jumlah Bayar</th>
                  <th className="px-2 py-4">Tanggal Lunas</th>
                  <th className="px-2 py-4">Status</th>
                  <th className="px-2 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 py-4 text-center">
                    <p>{patient.no_rm}</p>
                  </td>
                  <td className="px-2 py-4 text-center">
                    <p>{patient.nama}</p>
                  </td>
                  <td className="px-2 py-4 text-center">
                    <p>{exam.harga}</p>
                  </td>
                  <td className="px-2 py-4 text-center">
                    <p>{done}</p>
                  </td>
                  <td className="px-2 py-4 text-center">
                    <input type="checkbox" onChange={handleCheck} />
                  </td>
                  <td className="px-2 py-4 text-center">
                    <SubmitButton />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )} */}
      </form>
    </div>
  );
};

export default HasilPemeriksaan;
