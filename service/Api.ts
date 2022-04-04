import axios, { AxiosInstance } from 'axios';
import { AvailableApiModules } from './ApiModules';
import { API_VER, BASE_URL } from './constants';

export const createApi = (module: AvailableApiModules, token: string): AxiosInstance => {
  const baseURL =
    process.env.NODE_ENV === 'production' ? `${BASE_URL}/${API_VER}/${module}` : `${BASE_URL}/api/${API_VER}/${module}`;
  return axios.create({
    baseURL,
    headers: {
      authorization: token,
    },
  });
};

export const createPublicApi = (module: AvailableApiModules): AxiosInstance => {
  const baseURL =
    process.env.NODE_ENV === 'production' ? `${BASE_URL}/${API_VER}/${module}` : `${BASE_URL}/api/${API_VER}/${module}`;

  return axios.create({
    baseURL,
  });
};
