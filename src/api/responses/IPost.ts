export default interface IPost {
    id: string
    content: string
    comments: Array<string>
    username: string
    date: Date
    countdown: number
    hashtags: Array<string>
    mentions: Array<string>
}