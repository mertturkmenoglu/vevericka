// export const BASE_URL = 'https://vevericka-backend.herokuapp.com';
export const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://api.vevericka.app' : 'http://localhost:5001';

export const API_VER = 'v3';
