import axios from 'axios'
import IChat from "@/api/responses/IChat";

type CreateChatDto = {
    createdBy: string;
    users: string[];
    isGroupChat: boolean;
}

class MessageService {
    static readonly service = axios.create({
        // baseURL: 'https://vevericka-backend.herokuapp.com/api/v2/message',
        baseURL: 'http://localhost:5000/api/v2/message',
        headers: {
            'authorization': localStorage.getItem('vev-token') || ''
        }
    })

    static async getUserChats(username: string): Promise<IChat[]> {
        const res = await MessageService.service.post<{ data: IChat[] }>('/chat/user-chats/' + username)
        return res.data.data
    }

    static async createChat(dto: CreateChatDto): Promise<IChat> {
        const res = await MessageService.service.post<{ data: IChat }>('/chat/', dto)
        return res.data.data
    }
}

export default MessageService
