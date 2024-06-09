import type { Axios } from 'axios';
import axios from 'axios';

export interface ApiConfig {
  url: string;
  timeout: number;
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: 'http://localhost:3000/api',
  timeout: 30000,
};

class Api {
  client: Axios;
  config: ApiConfig;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.client = axios.create({
      withCredentials: true,
      baseURL: 'http://localhost:3000/api',
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.data?.message === 'Internal server error') {
          error.response.data.message = 'ERR_BAD_RESPONSE';
        }
        throw error;
      }
    );
  }
}

export function apiClient() {
  return new Api().client;
}
