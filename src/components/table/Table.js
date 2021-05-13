import React, { useState, useMemo, useEffect } from "react";
import Pagination from "./pagination/Pagination";
import { BiPencil, BiTrash } from "react-icons/bi";
import { AiTwotoneEye } from "react-icons/ai";
import Search from "./search/Search";
import { useHistory } from "react-router-dom";
import { deleteData, fetchDatas, showData } from "@/utils/ApiServices";

const Table = ({ header, cols, url, path, child, id, ...props }) => {
  let history = useHistory();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [navbar, setNavbar] = useState(false);
  const [search, setSearch] = useState("");
  const [namaItem, setNamaItem] = useState("");
  const [activeItem, setActiveItem] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    child
      ? showData(path, id).then((res) => {
          console.log(res);
          if (isSubscribed) {
            setData(res[0][child]);
            setLoading(false);
          }
        })
      : fetchDatas(path)
          .then((res) => {
            console.log(res);
            if (isSubscribed) {
              setData(res);
              setLoading(false);
            }
          })
          .catch((err) => console.log(err));

    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ITEMS_PER_PAGE = 20;

  const headerLength = header.length;

  const handleDelete = () => {
    deleteData(child ? child : path, activeItem)
      .then((res) => {
        console.log(res);
        fetchDatas(path)
          .then((res) => {
            console.log(res);
            setData(res);
            setLoading(false);
          })
          .catch((err) => console.log(err));
        setDeleteModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tableData = useMemo(() => {
    let computedData = Array.from(data);
    if (search) {
      computedData = computedData.filter(
        (data) =>
          data.nama.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          (data.no_rm !== undefined && data.no_rm.toString().includes(search))
      );
    }

    setTotalItems(computedData.length);

    return computedData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [data, search, currentPage]);

  const colData = (data, header, show, key) => {
    let final = [];
    for (let i = 0; i < header.length; i++) {
      if (i === 0) {
        final.push(
          <td key={i} className="border border-gray-300 p-1">
            {key + 1 + getPage() + "."}
          </td>
        );
      } else if (i === header.length - 1) {
        final.push(
          <td key={i} className="border border-gray-300 p-1">
            <div className="w-full flex justify-center">
              <div className="flex m-1" role="group">
                <button
                  type="button"
                  className="focus:outline-none text-white text-sm p-2 bg-green-500 rounded-l-md hover:bg-green-600 hover:shadow-lg"
                  onClick={() => {
                    child
                      ? history.push(`${id}/${url}/lihat/${data.id}`)
                      : history.push(`${url}/lihat/${data.id}`);
                  }}
                >
                  <AiTwotoneEye />
                </button>
                <button
                  type="button"
                  className="focus:outline-none text-white text-sm p-2 bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg"
                  onClick={() => {
                    child
                      ? history.push(`${id}/${url}/ubah/${data.id}`)
                      : history.push(`${url}/ubah/${data.id}`);
                  }}
                >
                  <BiPencil />
                </button>
                <button
                  type="button"
                  className="focus:outline-none text-white text-sm p-2 bg-red-500 rounded-r-md hover:bg-red-600 hover:shadow-lg"
                  onClick={() => {
                    setDeleteModal(true);
                    setActiveItem(data.id);
                    setNamaItem(data.nama);
                  }}
                >
                  <BiTrash />
                </button>
              </div>
            </div>
          </td>
        );
      } else {
        final.push(
          <td key={i} className="border border-gray-300 p-1">
            {data[show[i - 1]]}
          </td>
        );
      }
    }
    return final;
  };

  const changeNavbar = () => {
    window.scrollY >= 80 ? setNavbar(true) : setNavbar(false);
  };

  const getPage = () => {
    return currentPage > 1 ? currentPage * 10 : 0;
  };

  window.addEventListener("scroll", changeNavbar);

  return (
    <div>
      <div
        className={
          "transition-all duration-500 flex items-center w-full justify-between mb-4 select-none " +
          (navbar &&
            "bg-gray-100 drop-shadow-md py-3 px-5 rounded-sm fixed top-0 left-0")
        }
      >
        <Search
          onSearch={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
        />
        <Pagination
          total={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
        <button
          className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
          onClick={() => {
            child
              ? history.push(`${id}/${url}/tambah/`)
              : history.push(`${url}/tambah`);
          }}
        >
          Tambah
        </button>
      </div>

      {!loading && (
        <>
          <table className="w-full">
            <thead className="bg-gray-100 text-base select-none ">
              <tr>
                {header.map((header, key) => (
                  <th
                    key={key}
                    className="border border-gray-300 px-2 py-1 font-medium text-sm"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tableData.length !== 0 ? (
                tableData.map((village, key) => (
                  <tr
                    className="text-center h-11 select-none cursor-pointer hover:bg-gray-100 text-sm"
                    key={key}
                  >
                    {colData(village, header, cols, key)}
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td
                    colSpan={headerLength}
                    className="border border-gray-300 p-5"
                  >
                    <span className="text-xl">Data Not Found</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
      {deleteModal && (
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
            >
              h
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
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
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Hapus Data
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Apakah anda yakin untuk menghapus data {namaItem}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDelete}
                >
                  Hapus
                </button>

                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setDeleteModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
