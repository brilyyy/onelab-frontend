import axios from "axios";
import { getData } from "@/utils/StorageServices";

const uri = "http://onelab-backend.test/api";

const authLogin = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${uri}/auth/login`, data)
      .then((res) => {
        console.log(res.data);
        resolve(res.data.data);
      })
      .catch((err) => reject(err.response));
  });
};

const authLogout = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${uri}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getData("access_token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        resolve(res.data.data);
      })
      .catch((err) => reject(err.response));
  });
};

const authMe = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${uri}/auth/me`, {
        headers: {
          Authorization: `Bearer ${getData("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        resolve(res.data.data);
      })
      .catch((err) => reject(err.response));
  });
};

const fetchDatas = (path) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${uri}/${path}`, {
        headers: {
          Authorization: `Bearer ${getData("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        resolve(res.data.data);
      })
      .catch((err) => reject(err.response));
  });
};

const addData = (path, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${uri}/${path}`, data, {
        headers: {
          Authorization: `Bearer ${getData("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        resolve(res.data.data);
      })
      .catch((err) => reject(err.response));
  });
};

const showData = (path, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${uri}/${path}/${id}`, {
        headers: {
          Authorization: `Bearer ${getData("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        resolve(res.data.data);
      })
      .catch((err) => reject(err.response));
  });
};

const updateData = (path, data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${uri}/${path}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${getData("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        resolve(res.data.data);
      })
      .catch((err) => reject(err.response));
  });
};

const deleteData = (path, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${uri}/${path}/${id}`, {
        headers: {
          Authorization: `Bearer ${getData("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        resolve(res.data.data);
      })
      .catch((err) => reject(err.response));
  });
};

export {
  authLogin,
  authLogout,
  authMe,
  fetchDatas,
  addData,
  showData,
  deleteData,
  updateData,
};
