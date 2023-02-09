## 🧠 smartbrain-api

This is a backend API built using Node.js, Express, and PostgreSQL that provides a RESTful API for a Face Detection application. 
The API is designed to handle user registration and login through JWT, and calculate the face position on a given image using the Clarifai API


## Stack

### 📱 Frontend
* HTML5, CSS3, Sass, React.js

### 🖥️ [Backend](http://github.com/emijerochim/smartbrain-api)
* Node.js, Express, JWT Authentication, pg 


### 💾 Database
* PostgreSQL

## Dependencies 📚

The following packages are required to run this code:

- `dotenv` for loading environment variables from a `.env` file
- `express` for creating the web server
- `jsonwebtoken` for handling JSON web tokens for authentication
- `cors` for handling Cross-Origin Resource Sharing (CORS)
- `pg` for interacting with a PostgreSQL database


## Functionality 🛠️

The code creates an Express.js app and sets up the following routes:

- `GET /`: a protected route that requires a valid JSON web token to access. Returns the string "success!!!" if the token is valid.
- `POST /verify-token`: a route that verifies the validity of a JSON web token. Returns a 403 status code if the token is invalid, or the decoded token data if the token is valid.
- `POST /login`: a route that logs in a user. Accepts a `username` and `password` in the request body, and returns a JSON web token if the login is successful.
- `POST /register`: a route that registers a new user. Accepts a `username` and `password` in the request body, and returns a JSON web token if the registration is successful.
- `POST /image`: a protected route that requires a valid JSON web token to access. Accepts an image URL in the request body, and returns the image data processed by the Clarifai API.

The code also connects to a PostgreSQL database using the `pg` package, and includes a `verifyToken` middleware function to handle protected routes.


## Environment Variables 🔐️

The following environment variables are used in this code:

- `PGHOST`: the hostname of the PostgreSQL database
- `PGNAME`: the name of the PostgreSQL database
- `PGUSER`: the username to connect to the PostgreSQL database
- `PGPASSWORD`: the password to connect to the PostgreSQL database
- `PGPORT`: the port to use when connecting to the PostgreSQL database
- `JWT_KEY`: the secret key to sign JSON web tokens with
- `PORT`: the port number to run the web server on


## Running the Code ▶️

1. Copy the code into a file named `index.js` in a new project directory.
2. Run `npm init` to create a `package.json` file for the project.
3. Install the required packages by running `npm install express dotenv jsonwebtoken cors pg`.
4. Create a `.env` file in the project directory and set the environment variables.
5. Run the code with `node index.js`.

________________


The database should connect and log the message

```📁 Database connected ${process.env.PGHOST}```

If there's a connection error with the database 

```🔴 Database connection error```


Its usually caused by undefined enviromental variables, specially if it happened when moving from ```development``` to ```production```


The web server should start running and log the message

```💚 app is running on 🔌 port ${process.env.PORT}```


________________

### Frontend code:
* [github.com/emijerochim/smartbrain](http://github.com/emijerochim/smartbrain)

### Backend code:
* [github.com/emijerochim/smartbrain-api](http://github.com/emijerochim/smartbrain-api)

### [🧠 Try the demo](http://smartbrain-production.up.railway.app)

## Contact
* 💼  You can see my portfolio at <a href="https://emijerochim.com/">emijerochim.com</a>
* ✉️  Mail me at <a href="mailto:dev@emijerochim.com/">dev@emijerochim.com</a></p>

