import axios from 'axios'
import IChat from "@/api/responses/IChat";
import IMessage from "@/api/responses/IMessage";

type CreateChatDto = {
    createdBy: string;
    users: string[];
    isGroupChat: boolean;
}

class MessageService {
    static readonly service = axios.create({
        baseURL: process.env.NODE_ENV === 'production'
            ? 'https://vevericka-backend.herokuapp.com/api/v2/message'
            : 'http://localhost:5000/api/v2/message',
        headers: {
            'authorization': localStorage.getItem('vev-token') || ''
        }
    })

    static async getUserChats(username: string): Promise<IChat[]> {
        const res = await MessageService.service.get<IChat[]>('/chat/user-chats/' + username)
        return res.data
    }

    static async createChat(dto: CreateChatDto): Promise<IChat> {
        const res = await MessageService.service.post<IChat>('/chat/', dto)
        return res.data
    }

    static async getChatMessages(chatId: string): Promise<IMessage[]> {
        const res = await MessageService.service.get<IMessage[]>('/chat/messages/' + chatId)
        return res.data
    }
}

export default MessageService
