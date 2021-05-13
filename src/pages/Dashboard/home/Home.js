import React from "react";
import HeaderBar from "@/components/navigation/HeaderBar";
import logo from "@/img/logo.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-yellow-400">
      <HeaderBar>Home</HeaderBar>
      <div className="mx-4 my-2 py-20 bg-gray-200 rounded-lg text-center">
        <h1 className="font-bold text-5xl mb-3">Selamat Datang</h1>
        <h1 className="font-bold text-3xl mb-3">di Sistem Informasi</h1>
        <h1 className="font-bold text-4xl">Laboratorium Klinik</h1>
        <div className="flex justify-center my-10">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="font-semibold text-lg mb-2 text-gray-600">
          Jalan Simanjuntak III Gang Melati, Bulaksumur, Kota Yogyakarta, Daerah
          Istimewa Yogyakarta
        </h1>
        <h1 className="font-semibold text-lg text-gray-600">
          E-mail: onelab@gmail.com / Telp. (0244) 6898448
        </h1>
      </div>
    </div>
  );
};

export default Home;
