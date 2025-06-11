import axios, { type AxiosRequestConfig } from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error: unknown): never => {
    const isInstanceOfError = error instanceof Error;
    if (!isInstanceOfError) {
      throw new Error(`Unexpected error happened: ${String(error)}`);
    }

    const fallbackMessage = `Error while performing API call: ${error.message}`;

    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || fallbackMessage);
    }

    throw new Error(fallbackMessage);
  },
);

function get<TResponse, TRequest = unknown>(
  url: string,
  config?: AxiosRequestConfig<TRequest>,
) {
  return apiClient.get<TResponse, TResponse>(url, config);
}

function post<TResponse, TRequest = unknown>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig<TRequest>,
) {
  return apiClient.post<TResponse, TResponse>(url, data, config);
}

function put<TResponse, TRequest = unknown>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig<TRequest>,
) {
  return apiClient.put<TResponse, TResponse, TRequest>(url, data, config);
}

function remove<TResponse, TRequest = unknown>(
  url: string,
  config?: AxiosRequestConfig<TRequest>,
) {
  return apiClient.delete<TResponse, TResponse>(url, config);
}

export { apiClient, get, post, put, remove };
export default apiClient;
