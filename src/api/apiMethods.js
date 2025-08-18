// // /src/api/apiMethods.js
// import { axiosInstance } from './axiosInstance';

// function apiGet(url, params = {}) {
//   return axiosInstance.get(url, { params });
// }

// function apiPost(url, body, contentType = "application/json") {
//   const headers = {
//     "Content-Type": contentType,
//   };
//   return axiosInstance.post(url, body, { headers });
// }

// function apiPut(url, body, contentType = "application/json") {
//   const headers = {
//     "Content-Type": contentType,
//   };
//   return axiosInstance.put(url, body, { headers });
// }

// function apiPatch(url, body) {
//   return axiosInstance.patch(url, body);
// }

// function apiDelete(url) {
//   return axiosInstance.delete(url);
// }

// export { apiGet, apiPost, apiPut, apiPatch, apiDelete };



import { axiosInstance } from './axiosInstance';

function apiGet(url, params = {}) {
  return axiosInstance.get(url, { params });
}

function apiPost(url, body, contentType) {
  let headers = {};
  let data = body;

  if (body instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  } else {
    headers["Content-Type"] = contentType || "application/json";
  }

  return axiosInstance.post(url, data, { headers });
}

function apiPut(url, body, contentType) {
  let headers = {};
  let data = body;

  if (body instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  } else {
    headers["Content-Type"] = contentType || "application/json";
  }

  return axiosInstance.put(url, data, { headers });
}

function apiPatch(url, body) {
  return axiosInstance.patch(url, body);
}

function apiDelete(url) {
  return axiosInstance.delete(url);
}

export { apiGet, apiPost, apiPut, apiPatch, apiDelete };
