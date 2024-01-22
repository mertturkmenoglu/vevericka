# Vevericka
## Important Note
* I'm no longer working on Vevericka. For the last ~4 years, I've been trying to implement a lot of things for Vevericka but I think it's time to drop. I'll work on other projects and it's time for Vevericka to retire.
* This code is not the feature-complete version of Vevericka, she had better times in terms of feature completeness. You can find different public archived repositories in my GitHub profile and you can also view the commit history and find a version that is better than this.
* I've rewritten Vevericka, I don't know, 4 or 5 times. It started as an Android application with a Firebase backend. I used Vue, React (CRA), Next, and React(Vite) again. It was my test project and I wrote it again and again.

---
* Vevericka is a social media platform.
* We love squirrels.
## Requirements
* Node.js v18.0.0 or later
* Docker
* Doppler CLI
## Running
* Clone the repo
* Configure the Doppler CLI in the root directory.
* Go to `apps/web` and run `yarn` to install dependencies.
* Go to `apps/api` and:
    * Run `docker compose up` to start Docker containers.
    * Run `yarn` to install dependencies.
* Run the database migrations using `doppler run yarn generate`.
* Run the API using `doppler run yarn start:dev`.
* Run the Web application using `doppler run yarn dev`.
