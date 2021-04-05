import IMessage from "@/api/responses/IMessage";

type ChatUser = {
    username: string;
    name: string;
    image: string;
}

export default interface IChat {
    users: ChatUser[];
    chatName: string;
    lastMessage: IMessage | null;
    chatImage: string;
    isGroupChat: boolean;
    createdAt: Date;
    updatedAt: Date;
}