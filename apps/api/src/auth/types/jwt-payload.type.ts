import { OAuthType } from '@/auth';

export interface JwtPayload {
  type: OAuthType;
  sub: string;
  image: string;
  id: string;
  name: string;
  email: string;
}
