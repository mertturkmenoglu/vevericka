import { OAuthType } from "./oauth.type";

export interface JwtPayload {
  type: OAuthType;
  sub: string;
  email: string;
  image: string;
}
