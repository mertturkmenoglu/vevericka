import axios, { AxiosInstance } from 'axios';
import { AvailableApiModules } from './ApiModules';
import { API_VER, BASE_URL } from './constants';

export const createApi = (
  module: AvailableApiModules,
  token: string
): AxiosInstance => {
  return axios.create({
    baseURL: `${BASE_URL}/api/${API_VER}/${module}`,
    headers: {
      authorization: token,
    },
  });
};

export const createPublicApi = (module: AvailableApiModules): AxiosInstance => {
  return axios.create({
    baseURL: `${BASE_URL}/api/${API_VER}/${module}`,
  });
};
