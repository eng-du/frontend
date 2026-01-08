import axios from 'axios';
import authTokenStore from '@/store/authToken';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = authTokenStore.get();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { status, data },
    } = error;

    if (status === 401 && data.code === 'AUTH-002' && !config._retry) {
      config._retry = true;

      try {
        const res = await axios.get(`${BASE_URL}/auth/reissue`, {
          withCredentials: true,
        });

        const { accessToken } = res.data;
        authTokenStore.set(accessToken);
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${accessToken}`;

        return api(config);
      } catch (refreshError) {
        authTokenStore.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
