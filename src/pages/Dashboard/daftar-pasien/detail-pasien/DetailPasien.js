import HeaderBar from "@/components/navigation/HeaderBar";
import FormInput from "@/components/input/FormInput";
import { addData, showData, updateData } from "@/utils/ApiServices";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CloseButton from "@/components/button/CloseButton";
import SubmitButton from "@/components/button/SubmitButton";
import DateInput from "@/components/input/DateInput";

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
    kecamatan: "",
    kabupaten: "",
    provinsi: "",
    no_telp: "",
    email: "",
    nama_wali: "",
    jenis_kelamin_wali: "",
    no_telp_wali: "",
  });
  const [loading, setLoading] = useState(true);
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
    e.preventDefault();
    if (props.title === "add") {
      addData("patients", data).then((res) => {
        console.log(res);
        setUploading(false);
        history.replace("/daftar-pasien");
      });
    } else if (props.title === "edit") {
      updateData("patients", data, id).then((res) => {
        console.log(res);
        setUploading(false);
        history.replace("/daftar-pasien");
      });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-yellow-400 pb-8">
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
          <FormInput
            label="Nomor Rekam Medis"
            name="no_rm"
            type="number"
            required={true}
            onChange={handleChange}
            defaultValue={data.no_rm}
            disabled={disabled}
          />
          <FormInput
            label="Nama"
            name="nama"
            type="text"
            required={true}
            onChange={handleChange}
            defaultValue={data.nama}
            disabled={disabled}
          />
          <FormInput
            label="NIK"
            name="nik"
            type="number"
            onChange={handleChange}
            defaultValue={data.nik}
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
            defaultDate={data.tanggal_lahir}
            defaultPlace={data.tempat_lahir}
            date={data.tanggal_lahir}
          />
          <FormInput
            label="Jenis Kelamin"
            name="jenis_kelamin"
            type="text"
            required={true}
            onChange={handleChange}
            defaultValue={data.jenis_kelamin}
            disabled={disabled}
          />
          <FormInput
            label="Alamat"
            name="alamat"
            type="text"
            required={true}
            onChange={handleChange}
            defaultValue={data.alamat}
            disabled={disabled}
          />
          <FormInput
            label="Kecamatan"
            name="kecamatan"
            type="text"
            required={true}
            onChange={handleChange}
            defaultValue={data.kecamatan}
            disabled={disabled}
          />
          <FormInput
            label="Kabupaten"
            name="kabupaten"
            type="text"
            required={true}
            onChange={handleChange}
            defaultValue={data.kabupaten}
            disabled={disabled}
          />
          <FormInput
            label="Provinsi"
            name="provinsi"
            type="text"
            onChange={handleChange}
            defaultValue={data.provinsi}
            disabled={disabled}
          />
          <FormInput
            label="Nomor Telp"
            name="no_telp"
            type="number"
            required={true}
            onChange={handleChange}
            defaultValue={data.no_telp}
            disabled={disabled}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            onChange={handleChange}
            defaultValue={data.email}
            disabled={disabled}
          />
          <FormInput
            label="Nama Wali"
            name="nama_wali"
            type="text"
            onChange={handleChange}
            defaultValue={data.nama_wali}
            disabled={disabled}
          />
          <FormInput
            label="Jenis Kelamin"
            name="jenis_kelamin_wali"
            type="text"
            onChange={handleChange}
            defaultValue={data.jenis_kelamin_wali}
            disabled={disabled}
          />
          <FormInput
            label="Nomor Telp Wali"
            name="no_telp_wali"
            type="number"
            onChange={handleChange}
            defaultValue={data.no_telp_wali}
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
