import axios, { AxiosInstance } from 'axios';

export const createApi = (token?: string): AxiosInstance => {
  const suffix = process.env.NODE_ENV === 'production' ? '/v3' : '/api/v3';
  const baseUrl = process.env.NEXT_PUBLIC_SERVICE_URL + suffix;

  if (token) {
    return axios.create({
      baseURL: baseUrl,
      headers: {
        authorization: token,
      },
    });
  }

  return axios.create({
    baseURL: baseUrl,
  });
};
