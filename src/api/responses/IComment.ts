export default interface IComment {
    id: string
    postId: string
    content: string
    username: string
    date: Date | string
}