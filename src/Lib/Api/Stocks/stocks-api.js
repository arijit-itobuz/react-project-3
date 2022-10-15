import { axiosBase } from '../Axios/axios-api';

export const stocksApi = {
  quote: async (symbol) => {
    const response = await axiosBase.get(`/quote`, {
      params: {
        symbol: symbol,
      },
    });
    return response;
  },
  symbolLookup: async (q) => {
    const response = await axiosBase.get(`/search`, {
      params: {
        q: q,
      },
    });
    return response;
  },
};
