import { fetchDatas, showData } from "@/utils/ApiServices";
import React, { useEffect, useState } from "react";
import logo from "@/img/logo.png";

const CetakPembayaran = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      fetchDatas("patient/latest")
        .then((res) => {
          showData("patients", res.id)
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

  const getHarga = (e) => {
    if (data.payment === undefined) {
      return 0;
    } else {
      let harga = 0;
      data.payment.forEach((pay) => {
        harga += parseInt(pay.examination.harga);
      });
      return harga;
    }
  };

  const formatRupiah = (b) => {
    var number_string = b.toString(),
      sisa = number_string.length % 3,
      rupiah = number_string.substr(0, sisa),
      ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    return rupiah;
  };

  return (
    <>
      {!loading && (
        <div className="py-3 px-5 m-2 border border-black">
          <div className="flex mb-10">
            <div className="mr-3">
              <img src={logo} alt="logo" className="mt-3" width="100" />
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
                <td>No. Registrasi</td>
                <td>:</td>
                <td>{String(data.id).padStart(8, "0")}</td>
              </tr>
              <tr>
                <td>No. Rekam Medis</td>
                <td>:</td>
                <td>{data.no_rm}</td>
              </tr>
              <tr>
                <td>Nama</td>
                <td>:</td>
                <td>{data.nama}</td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td>:</td>
                <td>{data.alamat}</td>
              </tr>
              <tr>
                <td>Umur</td>
                <td>:</td>
                <td>{getAge(data.tanggal_lahir)}</td>
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
                  <td>Rp {formatRupiah(pay.examination.harga)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-b border-black">
              <tr>
                <td>Total</td>
                <td>Rp {formatRupiah(getHarga())}</td>
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
