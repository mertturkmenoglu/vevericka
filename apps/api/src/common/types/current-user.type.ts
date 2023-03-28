export interface CurrentUser {
  email: string;
  user: {
    id: string;
    username: string;
    email: string;
    name: string;
    image: string;
    verified: boolean;
    protected: boolean;
  };
}
