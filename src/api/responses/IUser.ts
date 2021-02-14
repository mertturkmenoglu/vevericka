export interface IUser {
    username: string
    name: string
    email: string
    isAdmin: boolean
    image: string
    hobbies: Array<string>
    features: Array<string>
    bdate?: Date
    followers: Array<string>
    following: Array<string>
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
    wish_to_speak: Array<string>
}