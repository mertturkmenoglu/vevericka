# Vevericka
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
