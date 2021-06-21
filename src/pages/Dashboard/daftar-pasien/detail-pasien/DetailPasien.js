import HeaderBar from "@/components/navigation/HeaderBar";
import FormInput from "@/components/input/FormInput";
import { addData, showData, updateData } from "@/utils/ApiServices";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CloseButton from "@/components/button/CloseButton";
import SubmitButton from "@/components/button/SubmitButton";
import DateInput from "@/components/input/DateInput";
import FormSearch from "@/components/input/FormSearch";

const DetailPasien = (props) => {
  let { id } = useParams();
  let history = useHistory();
  const [data, setData] = useState({
    no_rm: "",
    nama: "",
    nik: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    alamat: "",
    no_telp: "",
    email: "",
    nama_wali: "",
    jenis_kelamin_wali: "",
    no_telp_wali: "",
  });
  const [loading, setLoading] = useState(true);
  const [rm, setRm] = useState();
  const [uploading, setUploading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    if (id !== undefined) {
      showData("patients", id)
        .then((res) => {
          if (isSubscribed) {
            setData(res);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setLoading(false);
    }

    if (isSubscribed) {
      props.title === "show" && setDisabled(true);
    }

    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    setUploading(true);
    data.no_rm = rm;
    e.preventDefault();
    console.log(data);
    if (props.title === "add") {
      addData("patients", data).then((res) => {
        console.log(res);
        setUploading(false);
        history.replace("/daftar-pasien/pembayaran");
      });
    } else if (props.title === "edit") {
      updateData("patients", data, id).then((res) => {
        console.log(res);
        setUploading(false);
        history.replace("/daftar-pasien/pembayaran");
      });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRmChange = (e) => {
    setRm(e.target.value);
  };

  const handleSearch = (e) => {
    console.log(rm);
    showData("patients/rm", rm)
      .then((res) => {
        setData(res[0]);
        data.patient_id = res[0].id;
        console.log(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-yellow-400 bg-pattern-lab pb-8">
      <HeaderBar>
        {(props.title === "add" && "Tambah Data Pasien") ||
          (props.title === "edit" && "Ubah Data Pasien") ||
          (props.title === "show" && "Lihat Data Pasien")}
      </HeaderBar>
      <div className="mx-4 my-2 px-10 py-5 bg-gray-50 rounded-lg">
        <div className="flex justify-end mb-10">
          <CloseButton backTo="/daftar-pasien" />
        </div>
        <form onSubmit={handleSubmit}>
          <FormSearch
            label="Nomor Rekam Medis"
            name="no_rm"
            type="text"
            required={true}
            onChange={handleRmChange}
            onClick={handleSearch}
            disabled={disabled}
          />
          <FormInput
            label="Nama"
            name="nama"
            type="text"
            required={true}
            onChange={handleChange}
            defaultValue={data !== undefined && data.nama}
            disabled={disabled}
          />
          <FormInput
            label="NIK"
            name="nik"
            type="number"
            onChange={handleChange}
            defaultValue={data !== undefined && data.nik}
            disabled={disabled}
          />
          <DateInput
            label="TTL"
            required={true}
            disabled={disabled}
            namePlace="tempat_lahir"
            nameDate="tanggal_lahir"
            onChangePlace={handleChange}
            onChangeDate={handleChange}
            defaultDate={data !== undefined && data.tanggal_lahir}
            defaultPlace={data !== undefined && data.tempat_lahir}
            date={data !== undefined && data.tanggal_lahir}
          />

          <div className="mb-6">
            <div className="text-gray-900 md:flex md:items-center">
              <div className="mb-1 md:mb-0 md:w-1/3">
                <label htmlFor="nama">Jenis Kelamin</label>
              </div>
              <div className={"md:flex-grow md:w-2/3"}>
                <select
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  name="jenis_kelamin"
                  autoComplete="off"
                  required
                  defaultValue={data !== undefined && data.jenis_kelamin}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="L">Laki-Laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
            </div>
          </div>
          <FormInput
            label="Alamat"
            name="alamat"
            type="text"
            required={true}
            onChange={handleChange}
            defaultValue={data !== undefined && data.alamat}
            disabled={disabled}
          />
          <FormInput
            label="Nomor Telp"
            name="no_telp"
            type="number"
            required={true}
            onChange={handleChange}
            defaultValue={data !== undefined && data.no_telp}
            disabled={disabled}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            onChange={handleChange}
            defaultValue={data !== undefined && data.email}
            disabled={disabled}
          />
          <FormInput
            label="Nama Wali"
            name="nama_wali"
            type="text"
            onChange={handleChange}
            defaultValue={data !== undefined && data.nama_wali}
            disabled={disabled}
          />
          <FormInput
            label="Jenis Kelamin"
            name="jenis_kelamin_wali"
            type="text"
            onChange={handleChange}
            defaultValue={data !== undefined && data.jenis_kelamin_wali}
            disabled={disabled}
          />
          <FormInput
            label="Nomor Telp Wali"
            name="no_telp_wali"
            type="number"
            onChange={handleChange}
            defaultValue={data !== undefined && data.no_telp_wali}
            disabled={disabled}
          />
          <div className="flex justify-end">
            {!(props.title === "show") && <SubmitButton loading={uploading} />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailPasien;
