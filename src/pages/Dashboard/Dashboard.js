import React, { useState, useEffect } from "react";
import { BiToggleRight, BiToggleLeft } from "react-icons/bi";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { authMe, authLogout } from "@/utils/ApiServices";
import { clearData } from "@/utils/StorageServices";
import SidebarLink from "@/components/navigation/SidebarLink";
import DashboardRoute from "@/routes/DashboardRoute";

const Dashboard = () => {
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    authMe()
      .then((res) => {
        console.log(res);
        if (isSubscribed) {
          setUsername(res.name);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isSubscribed = false;
    };
  }, []);

  const logout = () => {
    authLogout().then((res) => {
      clearData();
      history.replace("/login");
    });
  };

  return (
    <>
      {!loading && (
        <Router>
          <div className="overflow-x-hidden">
            {open && (
              <div className="fixed inset-0 bg-gray-800 h-full opacity-75 transition-opacity"></div>
            )}
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
                  <span>{username}</span>
                </div>

                {/* Links */}
                <SidebarLink
                  to="/"
                  title="Home"
                  onClick={() => setOpen(!open)}
                />
                {username === "Manager" && (
                  <>
                    <SidebarLink
                      to="/daftar-tes"
                      title="Daftar Pemeriksaan"
                      onClick={() => setOpen(!open)}
                    />
                    <SidebarLink
                      to="/daftar-pasien"
                      title="Registrasi Pasien"
                      onClick={() => setOpen(!open)}
                    />
                  </>
                )}
                {username === "Registrasi" && (
                  <SidebarLink
                    to="/daftar-pasien/tambah"
                    title="Registrasi Pasien"
                    onClick={() => setOpen(!open)}
                  />
                )}
                <SidebarLink
                  to="/status"
                  title="Status"
                  onClick={() => setOpen(!open)}
                />

                <button
                  className="text-white cursor-pointer flex px-3 py-4 hover:bg-blue-600 hover:shadow-md w-full focus:outline-none"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </aside>
            <main>
              <DashboardRoute name={username} />
            </main>
          </div>
        </Router>
      )}
    </>
  );
};

export default Dashboard;
