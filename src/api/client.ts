import axios, { type AxiosRequestConfig } from "axios";
import { handleApiError } from "../utils";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => handleApiError(error),
);

function get<TResponse, TRequest = unknown>(
  url: string,
  config?: AxiosRequestConfig<TRequest>,
) {
  return apiClient.get<TResponse, TResponse, TRequest>(
    url,
    config,
  ) as Promise<TResponse>;
}

function post<TResponse, TRequest = unknown>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig<TRequest>,
): Promise<TResponse> {
  return apiClient.post<TResponse, TResponse, TRequest>(
    url,
    data,
    config,
  ) as Promise<TResponse>;
}

function put<TResponse, TRequest = unknown>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig<TRequest>,
): Promise<TResponse> {
  return apiClient.put<TResponse, TResponse, TRequest>(
    url,
    data,
    config,
  ) as Promise<TResponse>;
}

function del<TResponse, TRequest = unknown>(
  url: string,
  config?: AxiosRequestConfig<TRequest>,
): Promise<TResponse> {
  return apiClient.delete<TResponse, TResponse, TRequest>(
    url,
    config,
  ) as Promise<TResponse>;
}

export { apiClient, get, post, put, del };
export default apiClient;
