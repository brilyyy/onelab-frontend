import HeaderBar from "@/components/navigation/HeaderBar";
import { fetchDatas } from "@/utils/ApiServices";
import React, { useEffect, useState } from "react";

const Sample = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchDatas("labresults/all")
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="min-h-screen bg-yellow-400 bg-pattern-lab pb-8">
      <HeaderBar>Daftar Pasien</HeaderBar>
      <div className="mx-4 my-2 p-3 bg-gray-50 rounded-lg"></div>
    </div>
  );
};

export default Sample;
