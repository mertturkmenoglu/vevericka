import { IUser } from "./IUser";

export interface IPost {
  id: number;

  user: IUser;

  content: string;

  likes: IUser[];

  dislikes: IUser[];

  createdAt: string;

  updatedAt: string;
}