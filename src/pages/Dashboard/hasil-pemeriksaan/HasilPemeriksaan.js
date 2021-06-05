import SubmitButton from "@/components/button/SubmitButton";
import FormSelect from "@/components/input/FormSelect";
import HeaderBar from "@/components/navigation/HeaderBar";
import React, { useState } from "react";

const HasilPemeriksaan = () => {
  const [data, setData] = useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="min-h-screen bg-yellow-400 pb-8">
      <HeaderBar>Hasil Pemeriksaan</HeaderBar>
      <div className="mx-4 my-2 p-3 bg-gray-50 rounded-lg">
        <form onSubmit={onSubmit}>
          <FormSelect
            label="Nama Pasien"
            name="patient_id"
            apiData="patients"
            onChange={handleChange}
          />
          <FormSelect
            label="Nama Tes"
            name="test_id"
            apiData="tests"
            onChange={handleChange}
          />
          <FormSelect
            label="Jenis Pemeriksaan"
            name="examination_id"
            apiData="examinations"
            onChange={handleChange}
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};

export default HasilPemeriksaan;
