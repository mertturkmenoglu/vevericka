import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { createPublicApi } from '@service/Api';
import { IError } from '../models/IError';
import { LoginRequestDto } from './dto/LoginRequestDto';
import { LoginResponseDto } from './dto/LoginResponseDto';
import { RegisterRequestDto } from './dto/RegisterRequestDto';
import { RegisterResponseDto } from './dto/RegisterResponseDto';

interface ILoginResponse {
  id: number;
  username: string;
  email: string;
  image: string;
  token: string;
}

export class Auth {
  private static get api(): AxiosInstance {
    return createPublicApi('auth');
  }

  public static async login(email: string, password: string): Promise<ILoginResponse | null> {
    try {
      const response = await Auth.api.post<any, AxiosResponse<LoginResponseDto>, LoginRequestDto>('/login', {
        email,
        password,
      });

      const { id, username, email: emailFromResponse, image } = response.data;
      const token = response.headers.authorization;

      return {
        id,
        username,
        token,
        image,
        email: emailFromResponse,
      };
    } catch (e) {
      return null;
    }
  }

  public static async register(dto: RegisterRequestDto): Promise<RegisterResponseDto | IError> {
    try {
      const response = await Auth.api.post<any, AxiosResponse<RegisterResponseDto>, RegisterRequestDto>(
        '/register',
        dto,
      );
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return {
          message: e.response.data.message,
          status: e.response.status,
          isError: true,
        };
      }

      return {
        message: '',
        status: 500,
        isError: true,
      };
    }
  }
}
