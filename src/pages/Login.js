import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { authLogin } from "@/utils/ApiServices";
import { storeData } from "@/utils/StorageServices";
import logo from "@/img/logo_white.png";

const Login = () => {
  let history = useHistory();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    authLogin(user)
      .then((res) => {
        console.log(res);
        storeData("access_token", res.access_token);
        setLoading(false);
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setFailed(true);
      });
  };

  return (
    <div className="w-full h-screen flex flex-col bg-yellow-500 bg-pattern-lab justify-center">
      <div className="flex justify-center py-10">
        <div className="p-8 w-80 rounded-l-xl bg-blue-900">
          <img src={logo} alt="logo" className="mt-20 ml-6" width="200" />
        </div>
        <div className="p-8 w-80 rounded-r-xl bg-white">
          <h1 className="text-blue-900 text-2xl font-bold mb-16">Login</h1>
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <input
              type="email"
              className="border border-blue-900 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full outline-none focus:border-mac-input-outline hover:shadow-md transition duration-200"
              name="email"
              autoComplete="off"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="border border-blue-900 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full outline-none focus:border-mac-input-outline hover:shadow-md transition duration-200"
              name="password"
              autoComplete="off"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="transition duration-200 hover:bg-blue-600 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center mt-3 focus:outline-none flex items-center justify-center bg-blue-900"
            >
              <span>Masuk</span>
              <span className="ml-2">
                <ClipLoader color="#fff" loading={loading} size={20} />
              </span>
            </button>
          </form>
        </div>
      </div>

      {failed && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.69d4-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Login Gagal
                    </h3>
                    <div className="mt-2">
                      <p className="text-lg text-gray-500">
                        Email atau Password Salah
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setFailed(false);
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
