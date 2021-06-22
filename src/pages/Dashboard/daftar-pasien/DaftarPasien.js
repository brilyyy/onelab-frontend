import React from "react";
import HeaderBar from "@/components/navigation/HeaderBar";
import Table from "@/components/table/Table";

const tableHeader = [
  "No.",
  "Nomor Rekam Medis",
  "Nama",
  "Nomor Telp",
  "Alamat",
  "Aksi",
];
const cols = ["no_rm", "nama", "no_telp", "alamat"];

const DaftarPasien = () => {
  return (
    <div className="min-h-screen bg-yellow-400 bg-pattern-lab pb-8">
      <HeaderBar>Daftar Pasien</HeaderBar>
      <div className="mx-4 my-2 p-3 bg-gray-50 rounded-lg">
        <Table
          header={tableHeader}
          cols={cols}
          url="daftar-pasien"
          path="patients"
          patient
        />
      </div>
    </div>
  );
};

export default DaftarPasien;
