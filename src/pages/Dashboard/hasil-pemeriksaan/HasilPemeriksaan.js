import SubmitButton from "@/components/button/SubmitButton";
import FormInput from "@/components/input/FormInput";
import DateInput from "@/components/input/DateInput";
import FormSelect from "@/components/input/FormSelect";
import HeaderBar from "@/components/navigation/HeaderBar";
import { addData, showData, updateData } from "@/utils/ApiServices";
import React, { useEffect, useState } from "react";
import DateTimeInput from "@/components/input/DateTimeInput";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";

const HasilPemeriksaan = () => {
  let history = useHistory();
  let { id } = useParams();
  const [data, setData] = useState({});
  const [dataLab, setDataLab] = useState({});
  const [loading, setLoading] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    data.patient_id = dataLab.patient.id;
    data.status = dataLab.status;
    updateData("labresults", data, id)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          dataLab.patient.payment.forEach((pay) => {
            pay.examination.examresults.forEach((exr) => {
              addData("testresult", {
                lab_result_id: id,
                exam_result_id: exr.id,
              }).then((res) => {
                showData("labresults", id).then((res) => {
                  console.log(res[0]);
                });
              });
            });
          });
          history.push(`/hasil-pemeriksaan/${id}/hasil`);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let subs = true;
    if (subs) {
      showData("labresults", id).then((res) => {
        console.log(res);
        setDataLab(res[0]);
        setLoading(false);
      });
    }
    return () => {
      subs = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-yellow-400 bg-pattern-lab pb-8">
      <HeaderBar>Pemeriksaan</HeaderBar>
      <>
        {!loading && (
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div className="ml-4 my-2 p-3 bg-gray-50 rounded-lg">
                {dataLab !== undefined ? (
                  <>
                    <FormInput
                      label="No. RM"
                      name="no_rm"
                      type="text"
                      defaultValue={dataLab.patient.no_rm}
                      disabled
                    />
                    <FormInput
                      label="Nama"
                      name="nama"
                      type="text"
                      defaultValue={dataLab.patient.nama}
                      disabled
                    />
                    <DateInput
                      label="TTL"
                      required={true}
                      namePlace="tempat_lahir"
                      nameDate="tanggal_lahir"
                      defaultDate={dataLab.patient.tanggal_lahir}
                      defaultPlace={dataLab.patient.tempat_lahir}
                      date={dataLab.patient.tanggal_lahir}
                      disabled
                    />
                    <FormInput
                      label="Jenis Kelamin"
                      name="jenis_kelamin"
                      type="text"
                      defaultValue={dataLab.patient.jenis_kelamin}
                      disabled
                    />
                    <FormInput
                      label="Alamat"
                      name="alamat"
                      type="text"
                      defaultValue={dataLab.patient.alamat}
                      disabled
                    />
                    <FormInput
                      label="No. Telp"
                      name="no_telp"
                      type="number"
                      defaultValue={dataLab.patient.no_telp}
                      disabled
                    />
                  </>
                ) : (
                  <h1 className="text-xl text-center text-red-600">
                    Pasien Tidak Ditemukan
                  </h1>
                )}
              </div>
              <div className="mr-4 my-2 p-3 bg-gray-50 rounded-lg">
                <FormInput
                  label="No. Spesimen"
                  name="no_spesimen"
                  type="number"
                  onChange={handleChange}
                  required
                />
                <DateTimeInput
                  label="Tanggal/Jam Pengambilan"
                  nameDate="tanggal_pengambilan_spesimen"
                  nameTime="jam_pengambilan_spesimen"
                  onChangeDate={handleChange}
                  onChangeTime={handleChange}
                />
                <FormSelect
                  label="Petugas Laboratorium"
                  name="laborat_id"
                  apiData="laborans"
                  onChange={handleChange}
                />
                <div className="flex justify-end">
                  <SubmitButton />
                </div>
              </div>
            </div>
          </form>
        )}
      </>
    </div>
  );
};

export default HasilPemeriksaan;
