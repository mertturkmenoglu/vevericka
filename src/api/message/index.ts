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
        baseURL: 'https://vevericka-backend.herokuapp.com/api/v2/message',
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

    static async getChatMessages(username: string, chatId: string): Promise<IMessage[]> {
        const dto = { username }
        const res = await MessageService.service.post<{ data: IMessage[] }>('/chat/messages/' + chatId, dto)
        return res.data.data
    }
}

export default MessageService
