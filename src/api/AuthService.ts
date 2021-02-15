import {IResponse} from "@/api/IResponse";

export default class AuthService {
    static readonly URL = "https://vevericka-auth-service.herokuapp.com"

    public static async sendPasswordResetEmail(email: string): Promise<IResponse<any>> {
        try {
            const url = `${this.URL}/auth/send_password_reset_email`
            const requestBody = { email }

            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(requestBody)
            }

            const response = await fetch(url, requestOptions)
            const {data} = await response.json()
            return [data, null]
        } catch (e) {
            return [null, e.message]
        }
    }

    public static async resetPassword(email: string, code: string, newPassword: string): Promise<IResponse<any>> {
        try {
            const url = `${this.URL}/auth/reset_password`
            const requestBody = {email, code, newPassword}

            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(requestBody)
            }

            const response = await fetch(url, requestOptions);
            const {data} = await response.json();
            return [data, null]
        } catch (e) {
            return [null, e.message]
        }
    }
}