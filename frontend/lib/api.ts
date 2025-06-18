import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

const baseUrl = "http://127.0.0.1:8000/api/";

interface ApiResponse<T> {
  data: T;
  status?: number;
  headers?: Record<string, string>;
}

// interface ApiError {
//   data?: unknown;
//   status?: number;
//   headers?: Record<string, string>;
//   message?: string;
// }

export async function postRequest<T>(
  url: string,
  payload: object,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios.post(baseUrl + url, payload, config);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw {
        data: axiosError.response.data,
        status: axiosError.response.status,
        headers: axiosError.response.headers as Record<string, string>
      };
    } else if (axiosError.request) {
      throw {
        message: 'No response received from the server'
      };
    } else {
      throw {
        message: axiosError.message
      };
    }
  }
}

export async function getRequest<T>(
  url: string
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios.get(baseUrl + url);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw {
        data: axiosError.response.data,
        status: axiosError.response.status,
        headers: axiosError.response.headers as Record<string, string>
      };
    } else if (axiosError.request) {
      throw {
        message: 'No response received from the server'
      };
    } else {
      throw {
        message: axiosError.message
      };
    }
  }
}