import IMessage from '@/api/responses/IMessage';

export type ChatUser = {
    username: string;
    name: string;
    image: string;
    _id: string;
}

interface IChat {
    _id: string;
    users: ChatUser[];
    chatName: string;
    lastMessage: IMessage | null;
    chatImage: string;
    isGroupChat: boolean;
    createdAt: string;
    updatedAt: string;
}

export default IChat;
