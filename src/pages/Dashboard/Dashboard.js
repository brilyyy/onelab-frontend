import React, { useState } from "react";
import { BiToggleRight, BiToggleLeft } from "react-icons/bi";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import SidebarLink from "@/components/SidebarLink";
import Home from "./home/Home";
import DaftarPasien from "./daftar-pasien/DaftarPasien";
import axios from "axios";
import uri from "@/config/uri";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const logout = () => {
    axios
      .post(
        uri + "/auth/logout",
        {},
        {
          headers: {
            Authorization:
              "Bearer " + window.sessionStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        window.sessionStorage.removeItem("access_token");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <Router>
      <div className="overflow-x-hidden">
        <aside className="fixed z-50">
          <button
            onClick={() => setOpen(!open)}
            className={
              "transition-all duration-500 absolute bg-blue-800 top-5 px-1 py-2 rounded-r-lg text-white focus:outline-none hover:bg-blue-600 " +
              (open ? "left-52" : "left-0 opacity-50")
            }
          >
            {open ? <BiToggleRight /> : <BiToggleLeft />}
          </button>
          <div
            className={
              "transition-all duration-500 h-screen bg-blue-800 w-52 " +
              (open ? "left-52" : "-ml-52")
            }
          >
            {/* Header */}
            <div className="w-full h-24 w bg-blue-900 flex flex-col justify-center text-center text-white border-b-4 border-yellow-500">
              <div className="flex justify-center mb-3">
                <span className="text-4xl">
                  <FaUserCircle />
                </span>
              </div>
              <span>Username</span>
            </div>

            {/* Links */}
            <SidebarLink to="/" title="Home" />
            <SidebarLink to="/daftar-pasien" title="Daftar Pasien" />
            <button
              className="text-white cursor-pointer flex px-3 py-4 hover:bg-blue-600 hover:shadow-md w-full focus:outline-none"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </aside>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/daftar-pasien" component={DaftarPasien} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Dashboard;
