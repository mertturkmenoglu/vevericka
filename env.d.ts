declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    JWT_SECRET: string;
    NEXTAUTH_URL: string;
    NEXT_PUBLIC_HCAPTCHA_SITE_KEY: string;
    NEXT_PUBLIC_HCAPTCHA_SECRET: string;
    NEXT_PUBLIC_ALGOLIA_APPLICATION_ID: string;
    NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY: string;
  }
}
