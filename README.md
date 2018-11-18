# Memo
[https://memo-web.herokuapp.com](https://memo-web.herokuapp.com)

A simple social network to share the worst moments in day. Wait for the approval before see it available, if not anyway you've let that go. But don't worry, always you'll have something to tell us back.

**Release:** v1.0.0

**Status:** Done and working on future release.

**About the idea:** This project was born to give a space to throw your daily problems and laugh about, and is the result of my web development skills acquired on the last months. I want to collect some good stories here, so if you are interested in collaborate in some way or just to give a suggestion feel free to contact me.

## **Built with**
mLab (mongoDB) + Express + React.js + Redux

## **Prerequisites**
- Memo is running on mLab database service. You can create an account at [mlab.com](https://mlab.com), then create a new user and database for free. The generated URI will be pasted on ./config/keys_dev.js
- Node.js (last stable version): Download from https://nodejs.org/es/download/
-  create-react-app globally installed:
```bash
npm i -g create-react-app
```

## **Installation**
- Express server running on localhost:5000
- React App is running on localhost:3000

```bash
cd memo
npm i
```

```bash
cd memo/client
npm i
```

You can run the project from the root directory with "dev" script. See others in *package.json*
```bash
npm run dev
```

## **Deployment**
You can deploy this project on [Heroku](https://heroku.com) with Heroku CLI.  Follow the instructions on Heroku documentation and set the Config Vars (MONGO_URI, SECRET_OR_KEY) of the ./config/keys_dev.js file on your Heroku app settings.

## **Administrator**
The approval of the posts is given by an administrador, with an independent authorization and functions. Admin user(s) can visit **localhost:3000/admin/login** to sign in. Administrator user can edit, delete and approve a post from a user. Each post model have a "status" flag with two possible values: **"pending"** and **"approved".**

## **API**
Find it on **./routes/api** and **./routes/admin/api**. The approval of the posts is given by an administrador, with an independent authorization and functions. 

There are three main endpoints for users page:

-  **api/posts**
-  **api/profile**
-  **api/users**
 
 There are two main endpoints for admin page:
-  **api/admin/users**
-  **api/admin/posts**
 
 Please check the description on files to understand the function and the access of each route.
 
## **Author**
Please, give your feedback. If you have any question or suggestion feel free to write me an email.

Erick Calle Castillo
ecalle17@gmail.com
