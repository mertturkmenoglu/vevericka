interface IComment {
    _id: string;
    postId: string;
    createdBy: {
        userId: string;
        username: string;
        name: string;
        image: string;
    };
    content: string;
    createdAt: string;
    updatedAt: string;
}

export default IComment;
