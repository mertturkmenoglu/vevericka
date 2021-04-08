export type UserPopulated = {
    _id: string;
    name: string;
    username: string;
    image: string;
}

export interface IUser {
    _id: string;
    username: string
    name: string
    email: string
    image: string
    hobbies: string[]
    features: string[]
    bdate?: Date
    followers: UserPopulated[]
    following: UserPopulated[]
    location: {
        city?: string
        country?: string
    }
    job: string
    school: string
    website: string
    twitter: string
    bio: string
    gender: string
    languages: Array<{ language: string, proficiency: string }>
    wishToSpeak: Array<string>
}
