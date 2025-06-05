import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const isDevelopment = process.env.NODE_ENV !== 'production';
const isProductionApp = process.env.REACT_APP_APP_ENV === 'production';
export const getUserToken = () => {
  return 'Bearer ' + Cookies.get('user_access_token');
};

export const setAuthCookie = (token) => {
  const cookieName = isDevelopment
    ? 'test__users__isLoggedIn'
    : isProductionApp
    ? '__users__isLoggedIn'
    : `${process.env.APP_ENV}__users__isLoggedIn`;
  Cookies.set(cookieName, 'true', { expires: 1 });
  Cookies.set('user_access_token', token, { expires: 1 });
};

export const removeAuthCookie = () => {
  const cookieName = isDevelopment
    ? 'test__users__isLoggedIn'
    : isProductionApp
    ? '__users__isLoggedIn'
    : `${process.env.APP_ENV}__users__isLoggedIn`;

  Cookies.remove(cookieName);
  Cookies.remove('user_access_token');
  Cookies.remove('__user__authToken');
};

export const isLoggedIn = () => {
  const cookieName = isDevelopment
    ? 'test__users__isLoggedIn'
    : isProductionApp
    ? '__users__isLoggedIn'
    : `${process.env.APP_ENV}__users__isLoggedIn`;

  return Boolean(Cookies.get(cookieName));
};

export const showErrorMessage = (message) => {
  if (message instanceof Array) {
    message.forEach((msg) => toast.error(msg));
  } else {
    toast.error(message);
  }
};

const responseFormatter = (status, data, error) => {
  return { status, data: data || null, error };
};

const handleApiError = (err) => {
  return responseFormatter(false, null, err?.response?.data?.message);
};

export const postReq = async (endpoint, data) => {
  const url = `https://filpkartclone-6hc7.onrender.com/api${endpoint}`;
  const headers = {
    Accept: 'application/json',
    Authorization: getUserToken(),
  };
  return await axios
    .post(url, data, { withCredentials: true, headers })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};

export const patchReq = async (endpoint, data) => {
  const url = `https://filpkartclone-6hc7.onrender.com/api${endpoint}`;

  const headers = {
    Accept: 'application/json',
    Authorization: getUserToken(),
  };

  return await axios
    .patch(url, data, { withCredentials: true, headers })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};

export const getReq = async (endpoint) => {
  const url = `https://filpkartclone-6hc7.onrender.com/api${endpoint}`;

  const headers = {
    Accept: 'application/json',
    Authorization: getUserToken(),
  };

  return await axios
    .get(url, { withCredentials: true, headers })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};

export const deleteReq = async (endpoint, data) => {
  const url = process.env.API_URL + endpoint;

  const headers = {
    Accept: 'application/json',
    Authorization: getUserToken(),
  };

  try {
    const response = await axios.delete(url, {
      data,
      withCredentials: true,
      headers,
    });
    return responseFormatter(true, response.data, null);
  } catch (err) {
    return handleApiError(err);
  }
};

export const postFile = async (endpoint, data) => {
  const url = process.env.API_URL + endpoint;
  const headers = {
    Accept: 'application/json',
    Authorization: getUserToken(),
    'Content-Type': 'multipart/form-data',
  };

  try {
    const response = await axios.post(url, data, {
      withCredentials: true,
      headers,
    });
    return responseFormatter(true, response.data, null);
  } catch (err) {
    console.log(err);
    return handleApiError(err);
  }
};
