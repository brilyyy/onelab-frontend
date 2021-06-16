import { fetchDatas, showData } from "@/utils/ApiServices";
import React, { useEffect, useState } from "react";

const CetakPembayaran = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      fetchDatas("labresults/latest")
        .then((res) => {
          showData("labresults", res.id)
            .then((res) => {
              setData(res[0]);
              setLoading(false);
              window.print();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {!loading && (
        <div className="py-3 px-5 m-2 border border-black">
          <div className="flex mb-10">
            <div className="mr-3">
              <h1>Onelab</h1>
            </div>
            <div className="flex flex-col">
              <h1>Laboratorium OneLab</h1>
              <h1>
                Jl. Simanjuntak III gang melati, Bulaksumur, Kota Yogyakarta,
                DIY
              </h1>
              <h1>Email: OneLab@gmail.com/ Telp. (0244)6898448</h1>
            </div>
          </div>
          <h1 className="mb-10 text-center">
            KWITANSI PEMBAYARAN LABORATORIUM
          </h1>
          <table className="w-1/3 mb-10">
            <tbody>
              <tr>
                <td>No. Rekam Medis</td>
                <td>:</td>
                <td>{data.patient.no_rm}</td>
              </tr>
              <tr>
                <td>Nama</td>
                <td>:</td>
                <td>{data.patient.nama}</td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td>:</td>
                <td>{data.patient.alamat}</td>
              </tr>
              <tr>
                <td>Umur</td>
                <td>:</td>
                <td>{data.patient.tanggal_lahir}</td>
              </tr>
            </tbody>
          </table>
          <table className=" text-center w-full mb-10">
            <thead className="border-t border-b border-black">
              <tr>
                <th>URAIAN</th>
                <th>BIAYA</th>
              </tr>
            </thead>
            <tbody>
              {data.payment.map((pay, key) => (
                <tr key={key}>
                  <td>{pay.examination.nama}</td>
                  <td>{pay.examination.harga}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-b border-black">
              <tr>
                <td>Total</td>
                <td>0</td>
              </tr>
            </tfoot>
          </table>
          <div className="flex justify-between">
            <div>
              <h1>TERIMA KASIH ATAS KEPERCAYAAN ANDA TERHADAP KAMI</h1>
              <h1 className="text-sm">
                *Bukti pembayaran ini sah apabila dibubuhi cap dan tanda tangan
                petugas
              </h1>
            </div>
            <div>
              <h1 className=" mb-20">Tanggal, 21 Mei 2000</h1>
              <h1 className="text-right">Admin</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CetakPembayaran;
