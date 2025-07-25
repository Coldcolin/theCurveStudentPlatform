import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_REST_URL;
const PUNCTUALITY = import.meta.env.VITE_PUNCTUALITY_API;
// const PUNCTUALITY = "https://the-curve-puntuality-api.vercel.app/api/v1/"

const URL_SIGN_UP = import.meta.env.VITE_API_REST_URL_SIGN_UP
const URL_LOGIN = import.meta.env.VITE_API_REST_URL_LOG_IN

const axiosInstance = axios.create({
    baseURL: BASE_URL
});
export const axiosInstancePunc = axios.create({
    baseURL: PUNCTUALITY
});
export const axiosInstanceSign = axios.create({
    baseURL: URL_SIGN_UP
});
export const axiosInstanceLogin = axios.create({
    baseURL: URL_LOGIN
});

// Retry configuration
const retryConfig = {
    retries: 3,
    retryDelay: (retryCount) => {
        return retryCount * 1000; // time interval between retries
    },
    retryCondition: (error) => {
        // Retry only on network errors or 5xx status codes
        return axios.isAxiosError(error) && !error.response;
    }
};

// Add a request interceptor
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const { config } = error;
        if (!config || !retryConfig.retryCondition(error)) {
            return Promise.reject(error);
        }

        config.__retryCount = config.__retryCount || 0;

        if (config.__retryCount >= retryConfig.retries) {
            return Promise.reject(error);
        }

        config.__retryCount += 1;

        const delay = retryConfig.retryDelay(config.__retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));

        return axiosInstance(config);
    }
);

axiosInstancePunc.interceptors.response.use(
    response => response,
    async error => {
        const { config } = error;
        if (!config || !retryConfig.retryCondition(error)) {
            return Promise.reject(error);
        }

        config.__retryCount = config.__retryCount || 0;

        if (config.__retryCount >= retryConfig.retries) {
            return Promise.reject(error);
        }

        config.__retryCount += 1;

        const delay = retryConfig.retryDelay(config.__retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));

        return axiosInstance(config);
    }
);
axiosInstanceSign.interceptors.response.use(
    response => response,
    async error => {
        const { config } = error;
        if (!config || !retryConfig.retryCondition(error)) {
            return Promise.reject(error);
        }

        config.__retryCount = config.__retryCount || 0;

        if (config.__retryCount >= retryConfig.retries) {
            return Promise.reject(error);
        }

        config.__retryCount += 1;

        const delay = retryConfig.retryDelay(config.__retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));

        return axiosInstance(config);
    }
);

export default axiosInstance;


export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

// Apply the same interceptor to axiosPrivate
axiosPrivate.interceptors.response.use(
    axiosInstance.interceptors.response.handlers[0].fulfilled,
    axiosInstance.interceptors.response.handlers[0].rejected
);

