import { message } from "antd";

import Auth from "../store/Authentication";
import { STRINGS } from "../constants";

const URL_API = process.env.REACT_APP_API;
const CANT_CONNECT_INTERNET = "Can't connect internet";
const NETWORK_ERROR = "Network error";
const SIZE = 10;

let responseRefresh;

const refreshToken = async () => {
  // const refresh_token = encodeURIComponent(account.refresh_token);
  const header = {
    method: "POST",
    Accept: "application/json",
    // "Access-Control-Request-Headers": "*",
  };
  const api = `${URL_API}refreshToken?refreshToken=${Auth.getRefreshToken()}`;
  try {
    if (!responseRefresh) {
      responseRefresh = true;
      responseRefresh = await fetch(api, header);
    }
    // console.log('response', responseRefresh);
    const res = await responseRefresh.json();
    console.log("responseRefresh", res);

    if (res.success) {
      Auth.setAccessToken(res.accessToken);
      return {
        success: true,
        access_token: res.accessToken,
      };
    }

    if (responseRefresh.status === 500) {
      Auth.logout();
      window.location.href = "/login";
    }
    return {
      success: false,
      message: "Server error, please try again later",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  } finally {
    responseRefresh = undefined;
  }
};

function fetchWithTimeOut(promise, ms = 25000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(CANT_CONNECT_INTERNET));
    }, ms);
    promise.then(resolve, reject);
  });
}

const CommonCall = async (api, header) => {
  try {
    const accessToken = Auth.getAccessToken();
    let headers;
    if (accessToken) {
      headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Request-Headers": "*",
      };
    } else {
      headers = {
        Accept: "application/json",
      };
    }
    if (header && (header.method === "POST" || header.method === "PUT")) {
      headers = {
        ...headers,
        "Content-Type": "application/json",
      };
    }
    let head = {
      ...header,
      headers,
    };

    const response = await fetchWithTimeOut(
      fetch(api, {
        ...head,
        credentials: "omit",
      })
    );

    if (response.status === 500) {
      return {
        code: response.status,
        message: "Server error, please try again later",
        success: false,
      };
    }

    if (response.status === 200) {
      return await response.json();
    }

    if (response.status === 401) {
      //refresh token
      const resToken = await refreshToken();
      console.log("resToken", resToken);

      if (resToken.success) {
        const newHeaders = {
          ...headers,
          Authorization: `Bearer ${resToken.access_token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Request-Headers": "*",
        };
        const newHead = {
          ...head,
          headers: newHeaders,
        };
        const responseRefeshToken = await fetch(api, newHead);
        const resultRefeshToken = await responseRefeshToken.json();
        return resultRefeshToken;
      } else {
        return {
          code: response.code,
          success: false,
        };
      }
    } else {
      const resJson = await response.json();
      return {
        code: resJson.status,
        message: resJson.message,
        success: false,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Network error, please try again.",
    };
  }
};

const FetchApi = {
  login: async (data) => {
    const header = {
      method: "POST",
      body: JSON.stringify(data),
    };
    const api = `${URL_API}staffLogIn`;
    const result = await CommonCall(api, header);
    return result;
  },
  getUsers: async ({ page, size, search }) => {
    const header = {
      method: "GET",
    };
    const api = `${URL_API}api/getUsers?page=${page}&size=${size}${
      search ? "&search=" + search : ""
    }`;
    const result = await CommonCall(api, header);
    return result;
  },
  createUser: async (obj) => {
    // "birthday": "string",
    // "email": "string",
    // "gender": "string",
    // "id": 0,
    // "name": "string",
    // "phoneNumber": "string"
    const header = {
      method: "POST",
      body: JSON.stringify(obj),
    };
    const api = `${URL_API}api/createUser`;
    const result = await CommonCall(api, header);
    return result;
  },
  updateUser: async (obj) => {
    const header = {
      method: "PUT",
      body: JSON.stringify(obj),
    };
    const api = `${URL_API}api/updateUser`;
    const result = await CommonCall(api, header);
    return result;
  },
  getStaffs: async ({ page, size, search }) => {
    const header = {
      method: "GET",
    };
    const api = `${URL_API}api/getStaff?page=${page}&size=${size}${
      search ? "&search=" + search : ""
    }`;
    const result = await CommonCall(api, header);
    return result;
  },
  createStaff: async (obj) => {
    // "avatarUrl": "string",
    // "birthday": "string",
    // "email": "string",
    // "gender": "string",
    // "id": 0,
    // "isActive": true,
    // "name": "string",
    // "password": "string",
    // "phoneNumber": "string",
    // "role": "string"
    const header = {
      method: "POST",
      body: JSON.stringify(obj),
    };
    const api = `${URL_API}api/createStaff`;
    const result = await CommonCall(api, header);
    return result;
  },
  updateStaff: async (obj) => {
    const header = {
      method: "PUT",
      body: JSON.stringify(obj),
    };
    const api = `${URL_API}api/updateStaff`;
    const result = await CommonCall(api, header);
    return result;
  },
  uploadFile: async (file) => {
    var formData = new FormData();
    formData.append("file", file.file || file);
    const header = {
      method: "POST",
      body: formData,
    };
    const api = `${URL_API}api/uploadFile`;
    try {
      const result = await fetch(api, header);
      const responseJSON = await result.json();
      return responseJSON;
    } catch (error) {
      // message.warning(NETWORK_ERROR);
    }
  },
  getTable: async ({ page, size }) => {
    const header = {
      method: "GET",
    };
    const api = `${URL_API}api/getTable?page=${page}&size=${size}`;
    const result = await CommonCall(api, header);
    return result;
  },
  getCategory: async () => {
    const header = {
      method: "GET",
    };
    const api = `${URL_API}api/getCategory`;
    const result = await CommonCall(api, header);
    return result;
  },
  getFood: async ({ page, size, categoryId }) => {
    const header = {
      method: "GET",
    };
    const api = `${URL_API}api/getFood?page=${page}&size=${size}${
      categoryId ? "&categoryId=" + categoryId : ""
    }`;
    const result = await CommonCall(api, header);
    return result;
  },
  createFood: async (obj) => {
    const header = {
      method: "POST",
      body: JSON.stringify(obj),
    };
    const api = `${URL_API}api/createFood`;
    const result = await CommonCall(api, header);
    return result;
  },
  updateFood: async (obj) => {
    const header = {
      method: "POST",
      body: JSON.stringify(obj),
    };
    const api = `${URL_API}api/updateFood`;
    const result = await CommonCall(api, header);
    return result;
  },
  createBooking: async (obj) => {
    const header = {
      method: "POST",
      body: JSON.stringify(obj),
    };
    const api = `${URL_API}api/createBooking`;
    const result = await CommonCall(api, header);
    return result;
  },
  updateBooking: async (obj) => {
    const header = {
      method: "PUT",
      body: JSON.stringify(obj),
    };
    const api = `${URL_API}api/updateBooking`;
    const result = await CommonCall(api, header);
    return result;
  },
  deleteBooking: async (id) => {
    const header = {
      method: "DELETE",
    };
    const api = `${URL_API}api/deleteBooking?id=${id}`;
    const result = await CommonCall(api, header);
    return result;
  },
  actionBooking: async (obj) => {
    const header = {
      method: "PUT",
      body: JSON.stringify(obj),
    };
    const api = `${URL_API}api/actionBooking`;
    const result = await CommonCall(api, header);
    return result;
  },
  getCoupon: async ({ page, size }) => {
    const header = {
      method: "GET",
    };
    const api = `${URL_API}api/getCoupon?page=${page}&size=${size}`;
    const result = await CommonCall(api, header);
    return result;
  },
  getCouponAvailable: async () => {
    const header = {
      method: "GET",
    };
    const api = `${URL_API}api/getCouponAvailable`;
    const result = await CommonCall(api, header);
    return result;
  },
  getTableBooking: async (day) => {
    const header = {
      method: "GET",
    };
    const api = `${URL_API}api/getTableBooking?day=${day}`;
    const result = await CommonCall(api, header);
    return result;
  },
  getBookingDetail: async (id) => {
    const header = {
      method: "GET",
    };
    const api = `${URL_API}api/getBookingDetail?id=${id}`;
    const result = await CommonCall(api, header);
    return result;
  },
  getHistoryBooking: async ({ startDate, endDate, page, size }) => {
    const header = {
      method: "GET",
    };
    const api = `${URL_API}api/getHistoryBooking?page=${page}&size=${size}&startDate=${startDate}&endDate=${endDate}`;
    const result = await CommonCall(api, header);
    return result;
  },
  getTableAvaliable: async () => {
    const header = {
      method: "GET",
    };
    const api = `${URL_API}api/getTableAvailable`;
    const result = await CommonCall(api, header);
    return result;
  },
};

const downFile = async (api, method, fileName) => {
  const accessToken = Auth.getAccessToken();
  try {
    const result = await fetch(api, {
      method: method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (result.status === 200) {
      const blob = await result.blob();
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      // Append to html link element page
      document.body.appendChild(link);
      // Start download
      link.click();
      // Clean up and remove the link
      link.parentNode.removeChild(link);
    } else if (result.status === 401) {
      const resToken = await refreshToken();
      if (resToken.success) {
        const responseRefeshToken = await fetch(api, {
          method: method,
          headers: {
            Authorization: `Bearer ${resToken.access_token}`,
          },
        });
        const resultRefeshToken = await responseRefeshToken.json();
        return resultRefeshToken;
      } else {
        message.error("Something wrong. Please try again.");
      }
    } else {
      return message.error("Something wrong. Please try again.");
    }
  } catch (e) {
    message.error("Network error. Please try again.");
  }
};

export { FetchApi, CommonCall };
