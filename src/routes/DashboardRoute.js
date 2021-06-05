import DaftarPasien from "@/pages/Dashboard/daftar-pasien/DaftarPasien";
import DetailPasien from "@/pages/Dashboard/daftar-pasien/detail-pasien/DetailPasien";
import DaftarTes from "@/pages/Dashboard/daftar-tes/DaftarTes";
import DetailPemeriksaan from "@/pages/Dashboard/daftar-tes/detail-pemeriksaan/DetailPemeriksaan";
import DetailTes from "@/pages/Dashboard/daftar-tes/detail-tes/DetailTes";
import HasilPemeriksaan from "@/pages/Dashboard/hasil-pemeriksaan/HasilPemeriksaan";
import Home from "@/pages/Dashboard/home/Home";
import React from "react";
import { Route, Switch } from "react-router-dom";

const DashboardRoute = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/daftar-pasien" component={DaftarPasien} />
        <Route
          exact
          path="/daftar-pasien/tambah"
          component={() => <DetailPasien title="add" />}
        />
        <Route
          exact
          path="/daftar-pasien/lihat/:id"
          component={() => <DetailPasien title="show" fieldDisable={true} />}
        />
        <Route
          exact
          path="/daftar-pasien/ubah/:id"
          component={() => <DetailPasien title="edit" />}
        />
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
        <Route exact path="/hasil-pemeriksaan" component={HasilPemeriksaan} />
      </Switch>
    </>
  );
};

export default DashboardRoute;
