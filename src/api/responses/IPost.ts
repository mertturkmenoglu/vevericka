export default interface IPost {
    id: string;
    createdBy: {
        userId: string;
        username: string;
        image: string;
    };
    content: string;
    comments: string[];
    hashtags: string[];
    mentions: string[];
    createdAt: Date;
    updatedAt: Date;
}