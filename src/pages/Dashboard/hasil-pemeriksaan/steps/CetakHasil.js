import React, { useState, useEffect } from "react";
import logo from "@/img/logo.png";
import { useParams } from "react-router-dom";
import { showData } from "@/utils/ApiServices";

const CetakHasil = () => {
  let { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subs = true;
    if (subs) {
      showData("labresults", id)
        .then((res) => {
          setData(res[0]);
          setLoading(false);
          setTimeout(() => {
            window.print();
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      subs = false;
    };
  }, []);

  const getAge = (date) => {
    let today = new Date();
    let birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <>
      {!loading && (
        <div className="p-5">
          <div className="flex border-b-2 border-black w-full pb-3">
            <div className="w-1/3 pl-10 pt-2">
              <img src={logo} alt="" width="150" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl">LABORATORIUM ONELAB</h1>
              <h1 className="text-xs">
                Jl. Simanjutak III Gang Melati No. 07, Bulaksumur, Kota
                Yogyakarta, DIY
              </h1>
              <h1>Email: OneLab@gmail.com / Telp. (0244) 6898448</h1>
            </div>
          </div>
          <h1 className="text-center mt-3 mb-6">
            HASIL PEMERIKSAAN LABORATORIUM
          </h1>
          <div className="flex w-full mb-6">
            <div className="w-1/2">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td>No. Registrasi</td>
                    <td>:</td>
                    <td>{String(data.patient.id).padStart(8, "0")}</td>
                  </tr>
                  <tr>
                    <td>Nama Pasien</td>
                    <td>:</td>
                    <td>{data.patient.nama}</td>
                  </tr>
                  <tr>
                    <td>Jenis Kelamin/Umur</td>
                    <td>:</td>
                    <td>
                      {data.patient.jenis_kelamin}/
                      {getAge(data.patient.tanggal_lahir)}
                    </td>
                  </tr>
                  <tr>
                    <td>Alamat</td>
                    <td>:</td>
                    <td>{data.patient.alamat}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-1/2">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td>NIK</td>
                    <td>:</td>
                    <td>{data.patient.nik}</td>
                  </tr>
                  <tr>
                    <td>Tanggal Pemeriksaan</td>
                    <td>:</td>
                    <td>{data.tanggal_pengambilan_spesimen}</td>
                  </tr>
                  <tr>
                    <td>Jam Pemeriksaan</td>
                    <td>:</td>
                    <td>{data.jam_pengambilan_spesimen}</td>
                  </tr>
                  <tr>
                    <td>No. Sample</td>
                    <td>:</td>
                    <td>{data.no_spesimen}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <table className="w-full mb-6">
            <thead>
              <tr>
                <th className="border border-black">Pemeriksaan</th>
                <th className="border border-black">Hasil</th>
                <th className="border border-black">Satuan</th>
                <th className="border border-black">Nilai Rujukan</th>
              </tr>
            </thead>
            <tbody>
              {data.testresults.map((test, key) => (
                <tr key={key}>
                  <td className="border border-black">
                    {test.examresults.nama}
                  </td>
                  <td className="border border-black">{test.hasil}</td>
                  <td className="border border-black">
                    {test.examresults.satuan}
                  </td>
                  <td className="border border-black">
                    {test.examresults.nilai_rujukan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-full mb-20">
            <tbody>
              <tr>
                <td className="align-top">Catatan :</td>
                <td>
                  {data.testresults.map((test, key) => (
                    <React.Fragment key={key}>
                      {test.examresults.nama} : {test.catatan}
                      <br />
                    </React.Fragment>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full text-center">
            <tbody>
              <tr>
                <td></td>
                <td>Tanggal Terbit</td>
              </tr>
              <tr>
                <td>Penanggung Jawab</td>
                <td>Petugas Laboratorium</td>
              </tr>
              <tr>
                <td className="pt-24"></td>
                <td></td>
              </tr>
              <tr>
                <td>dr. Snezka Putri Faradila, MMR</td>
                <td>{data.laborat.nama}</td>
              </tr>
              <tr>
                <td>SIP : 503/3975</td>
                <td>SIP : 503/0179/ATLM/IV/2021</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CetakHasil;
