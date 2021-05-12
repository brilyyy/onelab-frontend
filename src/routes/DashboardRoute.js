import DaftarPasien from "@/pages/Dashboard/daftar-pasien/DaftarPasien";
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
          component={() => <div>tambah</div>}
        />
        <Route exact path="/daftar-pasien/ubah/:id" component={DaftarPasien} />
      </Switch>
    </>
  );
};

export default DashboardRoute;
