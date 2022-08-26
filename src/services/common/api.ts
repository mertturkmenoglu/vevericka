import axios, { AxiosInstance } from 'axios';

export const createApi = (): AxiosInstance => {
  const suffix = process.env.NODE_ENV === 'production' ? '/v3' : '/api/v3';
  const baseUrl = process.env.NEXT_PUBLIC_SERVICE_URL + suffix;

  return axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });
};
