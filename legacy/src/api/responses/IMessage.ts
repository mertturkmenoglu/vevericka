interface IMessage {
    sender: string;
    content: string;
    chat: string;
    readBy: string[];
    createdAt: string;
    updatedAt: string;
}

export default IMessage;
