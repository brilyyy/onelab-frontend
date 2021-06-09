import SubmitButton from "@/components/button/SubmitButton";
import FormInput from "@/components/input/FormInput";
import FormSearch from "@/components/input/FormSearch";
import DateInput from "@/components/input/DateInput";
import FormSelect from "@/components/input/FormSelect";
import HeaderBar from "@/components/navigation/HeaderBar";
import { addData, showData } from "@/utils/ApiServices";
import React, { useState } from "react";
import DateTimeInput from "@/components/input/DateTimeInput";

const HasilPemeriksaan = () => {
  const [data, setData] = useState({ patient_id: 0 });
  const [patient, setPatient] = useState();
  const [exam, setExam] = useState();
  const [rm, setRm] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    data.test_id = exam.test_id;

    addData("labresults", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
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
            <thead>
              <tr>
                <th>Jenis Pemeriksaan</th>
                <th>Hasil</th>
                <th>Nilai Rujukan</th>
                <th>Satuan</th>
                <th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FormSelect
                    name="examination_id"
                    apiData="examinations"
                    onChange={handleChange}
                    noLabel
                  />
                </td>
                <td>
                  <FormInput name="hasil" noLabel onChange={handleChange} />
                </td>
                <td>
                  <div className="mb-6">
                    <div className="text-gray-900 md:flex md:items-center">
                      <div className="md:w-full md:flex-grow">
                        <input
                          className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                          disabled
                          value={exam !== undefined && exam.nilai_rujukan}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="mb-6">
                    <div className="text-gray-900 md:flex md:items-center">
                      <div className="md:w-full md:flex-grow">
                        <input
                          className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                          disabled
                          value={exam !== undefined && exam.satuan}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <FormInput name="catatan" noLabel onChange={handleChange} />
                </td>
              </tr>
            </tbody>
          </table>

          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

export default HasilPemeriksaan;
