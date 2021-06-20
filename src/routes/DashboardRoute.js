import DaftarPasien from "@/pages/Dashboard/daftar-pasien/DaftarPasien";
import DetailPasien from "@/pages/Dashboard/daftar-pasien/detail-pasien/DetailPasien";
import DaftarTes from "@/pages/Dashboard/daftar-tes/DaftarTes";
import DetailPemeriksaan from "@/pages/Dashboard/daftar-tes/detail-pemeriksaan/DetailPemeriksaan";
import DetailTes from "@/pages/Dashboard/daftar-tes/detail-tes/DetailTes";
import CetakPembayaran from "@/pages/Dashboard/daftar-pasien/detail-pasien/CetakPembayaran";
import HasilPemeriksaan from "@/pages/Dashboard/hasil-pemeriksaan/HasilPemeriksaan";
import Hasil from "@/pages/Dashboard/hasil-pemeriksaan/steps/Hasil";
import Pembayaran from "@/pages/Dashboard/daftar-pasien/detail-pasien/Pembayaran";
import Selesai from "@/pages/Dashboard/hasil-pemeriksaan/steps/Selesai";
import Home from "@/pages/Dashboard/home/Home";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Sample from "@/pages/Dashboard/sample/Sample";

const DashboardRoute = ({ name, ...props }) => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        {name === "Registrasi" && (
          <>
            <Route exact path="/daftar-pasien" component={DaftarPasien} />
            <Route
              exact
              path="/daftar-pasien/tambah"
              component={() => <DetailPasien title="add" />}
            />
            <Route
              exact
              path="/daftar-pasien/lihat/:id"
              component={() => (
                <DetailPasien title="show" fieldDisable={true} />
              )}
            />
            <Route
              exact
              path="/daftar-pasien/ubah/:id"
              component={() => <DetailPasien title="edit" />}
            />
            <Route
              exact
              path="/daftar-pasien/pembayaran"
              component={Pembayaran}
            />
            <Route
              exact
              path="/daftar-pasien/pembayaran/cetak"
              component={CetakPembayaran}
            />
            <Route exact path="/status" component={Sample} />
          </>
        )}
        {name === "Laboran" && (
          <>
            {" "}
            <Route
              exact
              path="/hasil-pemeriksaan"
              component={HasilPemeriksaan}
            />
            <Route
              exact
              path="/hasil-pemeriksaan/hasil/:id"
              component={Hasil}
            />
            <Route
              exact
              path="/hasil-pemeriksaan/selesai/:id"
              component={Selesai}
            />
            <Route exact path="/status" component={Sample} />
          </>
        )}

        {name === "Manager" && (
          <>
            <Route exact path="/daftar-tes" component={DaftarTes} />
            <Route
              exact
              path="/daftar-tes/lihat/:id"
              component={() => <DetailTes title="show" />}
            />

            <Route
              exact
              path="/daftar-tes/ubah/:id"
              component={() => <DetailTes title="edit" />}
            />
            <Route
              exact
              path="/daftar-tes/tambah"
              component={() => <DetailTes title="add" />}
            />
            <Route
              exact
              path="/daftar-tes/lihat/:parent/detail/tambah"
              component={() => <DetailPemeriksaan title="add" />}
            />
            <Route
              exact
              path="/daftar-tes/lihat/:parent/detail/lihat/:id"
              component={() => <DetailPemeriksaan title="show" />}
            />
            <Route
              exact
              path="/daftar-tes/lihat/:parent/detail/ubah/:id"
              component={() => <DetailPemeriksaan title="edit" />}
            />
            <Route exact path="/status" component={Sample} />
          </>
        )}
      </Switch>
    </>
  );
};

export default DashboardRoute;
