export default interface IComment {
    _id: string
    postId: string
    createdBy: {
        userId: string;
        username: string;
        image: string;
    };
    content: string
    createdAt: Date;
    updatedAt: Date;
}