import axios from 'axios';

export const axiosBase = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: process.env.REACT_APP_FINHUB_API_KEY,
  },
});
