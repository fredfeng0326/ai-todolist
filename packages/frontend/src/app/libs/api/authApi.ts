import { apiClient } from './api';

export type LoginRequest = {
  username: string;
  password: string;
};

const AuthApi = {
  async login(
    loginRequest: LoginRequest,
  ): Promise<any> {
    const { data } = await apiClient().post(
      '/auth/login',
      JSON.stringify(loginRequest),
    );
    return data;
  },

  async updateUser(): Promise<any> {
    const { data } = await apiClient().put(
      '/user',
      JSON.stringify({
        isAdmin: true
      }),
    );
    return data;
  }
};

export default AuthApi;
