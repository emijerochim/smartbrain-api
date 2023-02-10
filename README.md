## 🧠 smartbrain-api 

This is a backend API built using Node.js, Express, and PostgreSQL that provides a RESTful API for a Face Detection application.
 
The server is designed to handle user registration and login through JWT and detect faces on a given image URL using data from the Clarifai API
<br></br>

## Installation ▶️ 

1. Clone the repository
```git clone https://github.com/emijerochim/smartbrain-api.git```

2. Enter into the project folder
```cd smartbrain-api```

3. Install the required packages
```npm update```

4. Create a `.env` file in the project directory and set the environment variables

5. Run the code with `npm run dev` or `npm start`

<br></br>
## Stack 🧰

### 📱 [Frontend](http://github.com/emijerochim/smartbrain)
* HTML5, CSS3, Sass, React.js

### 🖥️ [Backend](http://github.com/emijerochim/smartbrain-api)
* Node.js, Express, JWT Authentication, pg 

### 💾 Database 
* PostgreSQL

<br></br>
## Dependencies 📚

The following packages are required to run this code:

- `dotenv` for loading environment variables from a `.env` file
- `express` for creating the web server
- `jsonwebtoken` for handling JSON web tokens for authentication
- `cors` for handling Cross-Origin Resource Sharing (CORS)
- `pg` for interacting with a PostgreSQL database

<br></br>
## Endpoints 🛠️

The code creates an Express.js app and sets up the following routes:

- `GET /` : a protected route that requires a valid JSON web token to access. Returns the string "success!!!" if the token is valid.
- `POST /verify-token`: a route that verifies the validity of a JSON web token. Returns a 403 status code if the token is invalid, or the decoded token data if the token is valid.
- `POST /login` : a route that logs in a user. Accepts a `username` and `password` in the request body, and returns a JSON web token if the login is successful.
- `POST /register` : a route that registers a new user. Accepts a `username` and `password` in the request body, and returns a JSON web token if the registration is successful.
- `POST /image` : a protected route that requires a valid JSON web token to access. Accepts an image URL in the request body, and returns the image data processed by the Clarifai API.

The code also connects to a PostgreSQL database using the `pg` package, and includes a `verifyToken` middleware function to handle protected routes.

<br></br>
## Environment Variables 🔐️

The following environment variables are used in this code:

- `PGHOST` : the hostname of the PostgreSQL database
- `PGNAME` : the name of the PostgreSQL database
- `PGUSER` : the username to connect to the PostgreSQL database
- `PGPASSWORD` : the password to connect to the PostgreSQL database
- `PGPORT` : the port to use when connecting to the PostgreSQL database
- `JWT_KEY` : the secret key to sign JSON web tokens with
- `PORT` : the port number to run the web server on

<br></br>
## Logs 🗃️

The database should connect and log the message

```📁 Database connected ${process.env.PGHOST}```

If there's a connection error with the database 

```🔴 Database connection error```

The web server should start running and log the message

```💚 app is running on 🔌 port ${process.env.PORT}```

<br></br>
## Contact 👋

*  You can see my portfolio at <a href="https://emijerochim.com/">emijerochim.com</a> 💼
*  Mail me at <a href="mailto:dev@emijerochim.com/">dev@emijerochim.com</a> ✉️

<br></br>
______________________

### Frontend code:
* [github.com/emijerochim/smartbrain](http://github.com/emijerochim/smartbrain)

### Backend code:
* [github.com/emijerochim/smartbrain-api](http://github.com/emijerochim/smartbrain-api)

<br></br>

### [🧠 Try the demo](http://smartbrain-production.up.railway.app)

