import axios from 'axios';

export const authorizeApi = (params) => {
  return axios.get('/authorize', { params });
};
