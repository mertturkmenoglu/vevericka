export type LoginPayload = {
    email: string;
    password: string;
}

export type RegisterPayload = {
    email: string;
    username: string;
    name: string;
    password: string;
}

export type LoginSuccess = {
    userId: string;
    username: string;
    token: string;
}