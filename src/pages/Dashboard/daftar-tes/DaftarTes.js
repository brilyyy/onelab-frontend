import HeaderBar from "@/components/navigation/HeaderBar";
import Table from "@/components/table/Table";
import React from "react";

const tableHeader = ["No.", "Kelompok Tes", "Aksi"];
const cols = ["nama"];

const DaftarTes = () => {
  return (
    <div className="min-h-screen bg-yellow-400 bg-pattern-lab pb-8">
      <HeaderBar>Daftar Pemeriksaan</HeaderBar>
      <div className="mx-4 my-2 p-3 bg-gray-50 rounded-lg">
        <Table header={tableHeader} cols={cols} url="daftar-tes" path="tests" />
      </div>
    </div>
  );
};

export default DaftarTes;
