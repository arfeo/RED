import axios from 'axios';

export const auhtorizeApi = (params) => {
  return axios.get('/authorize', { params });
};
