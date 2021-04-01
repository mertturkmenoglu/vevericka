export default class PostService {
    static readonly URL = "https://vevericka-backend.herokuapp.com/api/v2/post"

    //
    // public static async getBookmarksByUsername(username: string): Promise<IResponse<Array<IBookmark>>> {
    //     try {
    //         const url = `${this.URL}/bookmark/user/${username}`
    //         const response = await fetch(url)
    //         const {data} = await response.json()
    //         const result = data as Array<IBookmark>
    //         return [result, null]
    //     } catch (e) {
    //         return [null, e.message];
    //     }
    // }
    //
    // public static async getPostById(id: string): Promise<IResponse<IPost>> {
    //     try {
    //         const url = `${this.URL}/post/${id}`
    //         const response = await fetch(url)
    //         const {data} = await response.json()
    //         const result = data as IPost
    //         return [result, null]
    //     } catch (e) {
    //         return [null, e.message]
    //     }
    // }
    //
    // public static async getCommentById(id: string): Promise<IResponse<IComment>> {
    //     try {
    //         const url = `${this.URL}/post/comment/${id}`
    //         const response = await fetch(url)
    //         const {data} = await response.json()
    //         const result = data as IComment
    //         return [result, null]
    //     } catch (e) {
    //         return [null, e.message]
    //     }
    // }
    //
    // public static async createComment(postId: string, content: string, username: string): Promise<boolean> {
    //     if (content.length > 255 || content.length === 0) {
    //         return false
    //     }
    //
    //     try {
    //         const requestBody = {
    //             postId,
    //             content,
    //             username,
    //             date: (new Date()).toISOString()
    //         }
    //
    //         const requestOptions = {
    //             method: "POST",
    //             headers: {"Content-Type": "application/json"},
    //             body: JSON.stringify(requestBody),
    //         }
    //
    //         const url = `${URL}/post/comment/`
    //
    //         await fetch(url, requestOptions)
    //         return true
    //     } catch (e) {
    //         return false
    //     }
    // }
}