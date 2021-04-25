interface IPost {
    _id: string;
    createdBy: {
        userId: string;
        username: string;
        image: string;
    };
    content: string;
    comments: string[];
    hashtags: string[];
    mentions: string[];
    createdAt: string;
    updatedAt: string;
}

export default IPost;
