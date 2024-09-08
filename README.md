# Task-Manager

Task management application similar to Trello build with the power of MERN Stack. [here](https://task-manager.sahank29.online)

## Installation Guide

### Requirements

- [Nodejs](https://nodejs.org/en/download)
- [Mongodb](https://www.mongodb.com/docs/manual/administration/install-community/)

Both should be installed and make sure mongodb is running.

### Installation

#### First Method

```shell
git clone https://github.com/Sahank29/Task-Manager.git
cd Task-Manager
```

Now rename env files from .env.example to .env

```shell
cd server
mv .env.example .env.development
cd ..
```

Change the .env configuration as you need

Now install the dependencies

```shell
cd server
npm i
cd ..
cd frontend
npm i
```

We are almost done, Now just start the development server.

For Frontend.

```shell
cd frontend
npm start
```

For Backend.

Open another terminal in folder, Also make sure mongodb is running in background.

```shell
cd server
npm run dev
```

Done! Now open localhost:3000 in your browser.
