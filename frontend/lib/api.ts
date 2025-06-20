import axios, { AxiosResponse, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

//const baseUrl = "http://localhost:8000/api/";
//const csrfToken = getCookie('csrftoken');

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // This is crucial for sending cookies
});

let csrfToken: string | null = null;
let authToken: string | null = null;

async function fetchCSRFToken() {
  try {
    const response = await axios.get('http://localhost:8000/api/auth/csrf/', {
      withCredentials: true
    });
    return response.data.csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return null;
  }
}

function getAuthToken(): string | null {
  return localStorage.getItem('Token') || Cookies.get('Token') || null;
}

// Request interceptor
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  // If it's a GET request to the CSRF endpoint, skip adding the header
  if (config.url?.includes('/csrf/') && config.method === 'get') {
    return config;
  }

  // Get CSRF token from cookie or fetch a new one if not available
  csrfToken = Cookies.get('csrftoken') || await fetchCSRFToken();
  authToken = getAuthToken();

  if (csrfToken && authToken) {
    config.headers = config.headers || {};
    config.headers['X-CSRFToken'] = csrfToken;
    config.headers['Authorization'] = `Token ${authToken}`;
  }

  return config;
});

export default api;

// interface ApiResponse<T> {
//   data: T;
//   status?: number;
//   headers?: Record<string, string>;
// }

// // interface ApiError {
// //   data?: unknown;
// //   status?: number;
// //   headers?: Record<string, string>;
// //   message?: string;
// // }

// export async function postRequest<T>(
//   url: string,
//   payload: object,
// ): Promise<ApiResponse<T>> {
//   try {
//     const response: AxiosResponse<T> = await axios.post(baseUrl + url, payload);
//     return {
//       data: response.data,
//       status: response.status,
//       headers: response.headers as Record<string, string>
//     };
//   } catch (error) {
//     const axiosError = error as AxiosError;
//     if (axiosError.response) {
//       throw {
//         data: axiosError.response.data,
//         status: axiosError.response.status,
//         headers: axiosError.response.headers as Record<string, string>
//       };
//     } else if (axiosError.request) {
//       throw {
//         message: 'No response received from the server'
//       };
//     } else {
//       throw {
//         message: axiosError.message
//       };
//     }
//   }
// }

// export async function getRequest<T>(
//   url: string
// ): Promise<ApiResponse<T>> {
//   try {
//     const response: AxiosResponse<T> = await axios.get(baseUrl + url);
//     return {
//       data: response.data,
//       status: response.status,
//       headers: response.headers as Record<string, string>
//     };
//   } catch (error) {
//     const axiosError = error as AxiosError;
//     if (axiosError.response) {
//       throw {
//         data: axiosError.response.data,
//         status: axiosError.response.status,
//         headers: axiosError.response.headers as Record<string, string>
//       };
//     } else if (axiosError.request) {
//       throw {
//         message: 'No response received from the server'
//       };
//     } else {
//       throw {
//         message: axiosError.message
//       };
//     }
//   }
// }