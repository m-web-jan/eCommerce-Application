import axios from 'axios';

const CTP_API_URL = import.meta.env.VITE_REACT_CTP_API_URL;
const CTP_PROJECT_KEY = import.meta.env.VITE_REACT_CTP_PROJECT_KEY;
const CTP_AUTH_URL = import.meta.env.VITE_REACT_CTP_AUTH_URL;

export const publicInstance = axios.create({
  baseURL: `${CTP_API_URL}/${CTP_PROJECT_KEY}`,
});

export const authInstance = axios.create({
  baseURL: `${CTP_AUTH_URL}/oauth`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});