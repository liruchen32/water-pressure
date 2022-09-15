import axios from 'axios';
import Vue from 'vue';

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 30000
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
  },
  (error) => {
    // Do something with request error
    console.error('error:', error); // for debug
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export const api = async (url, data = {}) => {
  const headers = {};
  const method = 'post';
  try {
    const result = await service.request({
      method,
      url,
      data,
      headers
    });
    return result;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      const detail = error.response
        ? error.response.data || error.response
        : error;
      console.error(error);
      console.error(detail);
      Vue.$toast.error(
        `error: ${error}\ndetail: ${
          typeof detail === 'object' ? JSON.stringify(detail) : detail
        }`
          .trim()
          .replace(`{"`, `{\n"`)
          .replace(`"}`, `"\n}`)
          .replace(/,"/g, `,\n"`),
        {
          duration: 0
        }
      );
    }
    return { error };
  }
};
