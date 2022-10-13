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
};
