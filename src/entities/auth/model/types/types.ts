export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
