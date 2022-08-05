export interface GetUserByUsernameResponse {
  id: number;

  username: string;

  email: string;

  name: string;

  image: string;

  job: string | null;

  twitterHandle: string | null;

  school: string | null;

  birthDate: Date | null;

  website: string | null;

  description: string | null;

  verified: boolean;

  protected: boolean;

  bannerImage: string;

  // gender: GenderOptions;

  // genderOther: string | null;

  // speaking: SpeakingLanguage[];

  // wishToSpeak: WishToSpeakLanguage[];

  // hobbies: Hobby[];

  // features: Hobby[];

  // location: Location;

  // posts: Post[];

  createdAt: string;

  updatedAt: string;
}
