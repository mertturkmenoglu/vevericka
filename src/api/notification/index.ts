import axios, {AxiosInstance} from 'axios';
import INotification from '@/api/responses/INotification';

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

  static async getNotifications(username: string): Promise<INotification[]> {
    const res = await NotificationService.service.get<INotification[]>('/user/' + username);
    return res.data;
  }

  static async deleteNotification(id: string): Promise<{ message: string }> {
    const res = await NotificationService.service.delete<{ message: string}>('/' + id);
    return res.data;
  }
}

export default NotificationService;
