import axios from 'axios'
import IChat from "@/api/responses/IChat";
import IMessage from "@/api/responses/IMessage";

type CreateChatDto = {
    createdBy: string;
    users: string[];
    isGroupChat: boolean;
}

type CreateMessageDto = {
    sender: string;
    content: string;
    chat: string;
}

type UpdateChatNameDto = {
    chat: string;
    chatName: string;
}

type AddUserToChatDto = {
    chatId: string;
    userId: string;
}

type RemoveUserFromChatDto = {
    chatId: string;
    userId: string;
}

class MessageService {
    static get service() {
        return axios.create({
            baseURL: process.env.NODE_ENV === 'production'
                ? 'https://vevericka-backend.herokuapp.com/api/v2/message'
                : 'http://localhost:5000/api/v2/message',
            headers: {
                'authorization': localStorage.getItem('vev-token') || ''
            }
        })
    }

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

    static async createMessage(dto: CreateMessageDto): Promise<IMessage> {
        const res = await MessageService.service.post<IMessage>('/', dto)
        return res.data
    }

    static async updateChatName(dto: UpdateChatNameDto): Promise<IChat> {
        const res = await MessageService.service.put<IChat>('/update-chat-name', dto);
        return res.data;
    }

    static async addUserToChat(dto: AddUserToChatDto): Promise<string> {
        const res = await MessageService.service.put<{ message: string }>('/chat/add-user', dto);
        return res.data.message
    }

    static async removeUserFromChat(dto: RemoveUserFromChatDto): Promise<string> {
        const res = await MessageService.service.put<{ message: string }>('/chat/remove-user', dto);
        return res.data.message
    }

    static async deleteChat(chatId: string): Promise<string> {
        const res = await MessageService.service.delete<{ message: string }>('/chat/' + chatId)
        return res.data.message
    }
}

export default MessageService
