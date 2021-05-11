import React, { useState, useEffect } from "react";
import HeaderBar from "@/components/HeaderBar";
import Table from "@/components/table/Table";
import uri from "@/config/uri";
import axios from "axios";

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
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${uri}/patients`, {
        headers: {
          Authorization:
            "Bearer " + window.sessionStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return (
    <div className="min-h-screen bg-yellow-400 pb-8">
      <HeaderBar>Daftar Pasien</HeaderBar>
      <div className="mx-4 my-2 p-3 bg-gray-200 rounded-lg">
        <Table
          header={tableHeader}
          data={data}
          loading={loading}
          cols={cols}
          toAdd=""
          toEdit=""
          uri="patients"
        />
      </div>
    </div>
  );
};

export default DaftarPasien;
