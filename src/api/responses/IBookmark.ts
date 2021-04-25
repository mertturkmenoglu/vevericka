interface IBookmark {
    _id: string;
    belongsTo: {
        _id: string;
        username: string;
        name: string;
        image: string;
    };
    postId: {
        content: string;
        comments: string[];
        hashtags: string[];
        mentions: string[];
        createdBy: {
            _id: string;
            name: string;
            username: string;
            image: string;
        };
    };
    createdAt: string;
    updatedAt: string;
}

export default IBookmark;
