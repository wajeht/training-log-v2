
  <a href="https://traininglog.tv">
    <img src="./docs/SCREENSHOTS/logo.png" height="128">
  </a>
  <h1 align="center">
  </h1>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://traininglog.tv/) ![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)



<p align="center">A full-stack web application to log training videos with the respect to your privacy.</p>

## Motivation

Instagram is the best medium for powerlifters among other social media. Back in the day, YouTube used to be it. Ever since powerlifting has gotten popular, majority of the content usually reside on Instagram.
Instagram used to be really good before facebook bought it. Now it has gotta a lot worse with unrelated contents. It has also gotten a lot worse on the aspect of privacy. So I decided to ditch Instagram and build my own platform to log my training.

## Demo

I have a live prototype running at the link below.

```
https://traininglog.tv/
```

## Screenshot

<img src="./docs/screenshots/../SCREENSHOTS/home.png" width="200"> <img src="./docs/screenshots/../SCREENSHOTS/signin.png" width="200"> <img src="./docs/screenshots/../SCREENSHOTS/user-profile.png" width="200"> <img src="./docs/screenshots/../SCREENSHOTS/users.png" width="200"> <img src="./docs/screenshots/../SCREENSHOTS/video.png" width="200"> <img src="./docs/screenshots/../SCREENSHOTS/videos.png" width="200">

## Technology

<p align="center"><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />‏ ‎ <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /> ‎ ‏<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />‏ ‎ <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> ‎ ‎ <img src="https://img.shields.io/badge/Docker-0081CB?style=for-the-badge&logo=docker&logoColor=white" />‏ ‎ <img src="https://img.shields.io/badge/CSS3-239120?&style=for-the-badge&logo=css3&logoColor=white" />‏ ‎ <img src="https://img.shields.io/badge/bootstrap-7852B3?style=for-the-badge&logo=bootstrap&logoColor=white" />‏ ‎ <img src="https://img.shields.io/badge/EJS-B4C965?style=for-the-badge&label=<%=&labelColor=A81F50" />‏ ‎ <img src="https://img.shields.io/badge/vuejs-ffffff?style=for-the-badge&logo=vuedotjs&logoColor=41B883" />‏ ‎ <img src="https://img.shields.io/badge/jquery-0969AD?style=for-the-badge&logo=jquery&logoColor=79CFF5" />‏ ‎ <img src="https://img.shields.io/badge/knex-E26326?style=for-the-badge&logo=knexdot.js&labelColor=79CFF5" />‏ ‎ </p>

## Database configuration

Within this project I have include `.evn.example` file with secret credentials. Name that file to `.env` and put in proper credentials. Also make sure to install `postgresql` database and create proper account first and password first.
I use my email as SMTP server. and OR you can use SendGrid as your mailing stuff!

## For `.env` file

```bash
# Port
PORT=3000

# Database connection
DATABASE_URL="postgres://node_user:node_password@localhost:5432/traininglog"
DB_HOST="localhost"
DB_USERNAME="node_user"
DB_PASSWORD="node_password"
DB_DATABASE="traininglog"
DB_PORT=5432

# Express cookie
COOKIE_SECRET="THIS IS NOT A SECRET"

# Sendgrid credentials
SENDGRID_API_KEY="your send grid api keys here"
SENDGRID_FROM_EMAIL="email@domain.com"

# Email credentials
EMAIL_HOST='mail.domain.com'
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_AUTH_USER='email@password.com'
EMAIL_AUTH_PASS='password'

#dev
NODE_ENV='development'

#default admin account
ADMIN='youremail@domain.com'
```

## Development

0. `git clone https://github.com/wajeht/training-log-v2.git` to download this repo
1. `npm run configure` to to set up database and table
2. `npm install` to install npm packages
3. `npm install` to install npm packages
4. `npm run cleandb` to to setup database migration
5. `npm run dev` to launch the app in dev environment
6. `npm run start` to launch the app
7. visit `localhost:6969` or whatever port you set in the browser to visit the site

## Contribute

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## CODE OF CONDUCT

See [docs/code_of_conduct.md](./docs/code_of_conduct.md)

## License

Distributed under the MIT License © [wajeht](https://www.github.com/wajeht/). See LICENSE for more information.
