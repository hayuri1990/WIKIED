import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const authAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

authAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

authAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // accessToken 만료 시 refreshToken을 이용하여 갱신
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('refreshToken이 존재하지 않습니다.');

        const res = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);

        // 헤더 갱신 후 API 재요청
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return authAxiosInstance(originalRequest);
      } catch (error) {
        console.error('토큰 갱신 실패: ', error);

        // refreshToken 만료 시 강제 로그아웃
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

const publicAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export { authAxiosInstance, publicAxiosInstance };
