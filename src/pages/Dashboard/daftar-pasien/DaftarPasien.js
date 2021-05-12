import React from "react";
import HeaderBar from "@/components/HeaderBar";
import Table from "@/components/table/Table";

const tableHeader = [
  "No.",
  "Nomor Rekam Medis",
  "Nama",
  "Nomor Telp",
  "Kecamatan",
  "Aksi",
];
const cols = ["no_rm", "nama", "no_telp", "kecamatan"];

const DaftarPasien = () => {
  return (
    <div className="min-h-screen bg-yellow-400 pb-8">
      <HeaderBar>Daftar Pasien</HeaderBar>
      <div className="mx-4 my-2 p-3 bg-gray-200 rounded-lg">
        <Table
          header={tableHeader}
          cols={cols}
          url="daftar-pasien"
          path="patients"
        />
      </div>
    </div>
  );
};

export default DaftarPasien;
