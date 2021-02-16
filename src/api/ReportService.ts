
export default class PostService {
    static readonly URL = "https://vevericka-report-service.herokuapp.com"

    public static async getReportTypes(locale?: string): Promise<any> {
        const lang = locale || "en"
        const url = `${this.URL}/api/v1/report_types?lang=${lang}`
        const response = await fetch(url)
        const {data} = await response.json()
        return data
    }

    public static async createReport(locale: string, postId: string, reportedUser: string, reportedBy: string,
                                     comment: string, type: string): Promise<number> {
        const lang = locale || "en"
        const url = `${this.URL}/api/v1?lang=${lang}`
        const requestBody = {
            reported_post_id: postId,
            reported_user: reportedUser,
            reported_by: reportedBy,
            reported_by_comment: comment,
            type: type,
        }

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestBody),
        };

        const response = await fetch(url, requestOptions);
        return response.status
    }
}