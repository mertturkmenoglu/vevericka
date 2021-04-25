import axios, {AxiosInstance} from 'axios';

export enum NotificationType {
    ON_USER_FOLLOW = 'ON_USER_FOLLOW',
    ON_MENTION = 'ON_MENTION',
    ON_COMMENT = 'ON_COMMENT',
}

export type Notification = {
    _id: string;
    origin: {
        _id: string;
        name: string;
        username: string;
        image: string;
    };
    target: {
        _id: string;
        name: string;
        username: string;
        image: string;
    };
    type: NotificationType;
    delivered: boolean;
    metadata: string;
    createdAt: Date;
    updatedAt: Date;
    deliveredAt: Date;
}

class NotificationService {
  static get service(): AxiosInstance {
    return axios.create({
      baseURL: process.env.NODE_ENV === 'production'
        ? 'https://vevericka-backend.herokuapp.com/api/v2/notifications'
        : 'http://localhost:5000/api/v2/notifications',
      headers: {
        'authorization': localStorage.getItem('vev-token') || '',
      },
    });
  }

  static async getNotifications(username: string): Promise<Notification[]> {
    const res = await NotificationService.service.get<Notification[]>('/user/' + username);
    return res.data;
  }

  static async deleteNotification(id: string): Promise<{ message: string }> {
    const res = await NotificationService.service.delete<{ message: string}>('/' + id);
    return res.data;
  }
}

export default NotificationService;
