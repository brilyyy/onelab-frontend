import SubmitButton from "@/components/button/SubmitButton";
import FormInput from "@/components/input/FormInput";
import FormSearch from "@/components/input/FormSearch";
import DateInput from "@/components/input/DateInput";
import FormSelect from "@/components/input/FormSelect";
import HeaderBar from "@/components/navigation/HeaderBar";
import { showData, updateData } from "@/utils/ApiServices";
import React, { useState } from "react";
import DateTimeInput from "@/components/input/DateTimeInput";
import { useHistory } from "react-router";

const HasilPemeriksaan = () => {
  let history = useHistory();
  const [data, setData] = useState({ patient_id: 0 });
  const [patient, setPatient] = useState();
  const [rm, setRm] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    data.tanggal_transaksi = new Date().toISOString().slice(0, 10);
    data.status = "Sampled";
    showData("labresults/patient", data.patient_id)
      .then((res) => {
        console.log(res);
        updateData("labresults", data, res[0].id)
          .then((res) => {
            console.log(res);
            history.push("/hasil-pemeriksaan/hasil/" + res.id);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
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
    <div className="min-h-screen bg-yellow-400 bg-pattern-lab pb-8">
      <HeaderBar>Pemeriksaan</HeaderBar>
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
              <h1 className="text-xl text-center text-red-600">
                Pasien Tidak Ditemukan
              </h1>
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
            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HasilPemeriksaan;
