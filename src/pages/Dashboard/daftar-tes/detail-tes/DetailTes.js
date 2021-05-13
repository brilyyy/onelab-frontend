import CloseButton from "@/components/button/CloseButton";
import SubmitButton from "@/components/button/SubmitButton";
import FormInput from "@/components/input/FormInput";
import HeaderBar from "@/components/navigation/HeaderBar";
import Table from "@/components/table/Table";
import { addData, showData, updateData } from "@/utils/ApiServices";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

const tableHeader = [
  "No.",
  "Jenis Pemeriksaan",
  "Harga",
  "Nilai Rujukan",
  "Aksi",
];

const cols = ["nama", "harga", "nilai_rujukan"];

const DetailTes = ({ title, ...props }) => {
  let { id } = useParams();
  let history = useHistory();
  const [data, setData] = useState({ nama: "" });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    if (id !== undefined) {
      showData("tests", id)
        .then((res) => {
          if (isSubscribed) {
            setData(res[0]);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setLoading(false);
    }

    if (isSubscribed) {
      title === "show" && setDisabled(true);
    }

    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setUploading(true);
    e.preventDefault();
    if (title === "add") {
      addData("tests", data)
        .then((res) => {
          console.log(res);
          setUploading(false);
          history.replace("/daftar-tes");
        })
        .catch((err) => console.log(err));
    } else if (title === "edit") {
      updateData("tests", data, id).then((res) => {
        console.log(res);
        setUploading(false);
        history.replace("/daftar-tes");
      });
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 pb-8">
      <HeaderBar>
        {(title === "add" && "Tambah Data Tes") ||
          (title === "edit" && "Ubah Data Tes") ||
          (title === "show" && "Lihat Data Tes")}
      </HeaderBar>
      <div className="mx-4 my-2 px-10 py-5 bg-gray-50 rounded-lg">
        <div className="flex justify-end mb-10">
          <CloseButton backTo="/daftar-tes" />
        </div>

        <form onSubmit={handleSubmit} className="mb-10">
          <FormInput
            label="Kelompok Tes"
            name="nama"
            required={true}
            onChange={handleChange}
            disabled={disabled}
            defaultValue={data.nama}
          />
          <div className="flex justify-end">
            {!(title === "show") && <SubmitButton loading={uploading} />}
          </div>
        </form>
        {title === "show" && (
          <Table
            header={tableHeader}
            cols={cols}
            child="examinations"
            url="detail"
            path="tests"
            id={id}
          />
        )}
      </div>
    </div>
  );
};

export default DetailTes;
