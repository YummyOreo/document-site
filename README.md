# Document Site

![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase) ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## How to get working

- Clone This repo
- Once in the dir, run `npm i` in:
  - base
  - `backend`
- install `firebase cli` and `netlify cli`

## Frontend

- make a firebase project
- clone `.firebaserc example` and rename it to `.firebaserc`. Then replace `Your project name` here with your projects name

## Backend

- make a [discord application](https://discord.com/developers/applications)
- duplicate `.env example` and rename it to `.env`
- fill in `DISCORD_CLIENT_ID` with your discord app's client id
- do the same with `DISCORD_SECRET`
- go to OAuth2 > General
- add a new redicet with the value `http://localhost:9000/.netlify/functions/api/user/auth`
- then go to URL genorator and select `identity` and your rediret url
- then put this into your .env file

### Mongo DB

- download mongodb
- after you run the backend at least one (using something like mongoDBCompas):
  - go into the `document` > `config` and fill in every field there.

## Running

- to run, run the command `npm run dev` in the base dir
- to run only backend, run `npm run dev-be`
- to run only frontend, run `npm run dev-fe`
