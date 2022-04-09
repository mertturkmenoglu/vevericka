import { IApplicationContextState } from '../context/ApplicationContext';
import { IUser } from '../service/models/IUser';
import { LocalStorage } from './LocalStorage';

export const initContext = (applicationContext: IApplicationContextState, user: IUser, userId: number) => {
  applicationContext.user.setEmail(user.email);
  applicationContext.user.setImage(user.image);
  applicationContext.user.setName(user.name);
  applicationContext.user.setUserId(userId);
  applicationContext.user.setUsername(user.username);
  const storage = new LocalStorage();
  applicationContext.setIsDarkTheme(storage.isDarkTheme);
};
