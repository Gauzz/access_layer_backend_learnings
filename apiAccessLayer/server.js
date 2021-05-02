require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/userRoutes");

// const wishlistsRouter = require("./routes/wishlistRoutes");
const { genericErrorHandler, unknownRoutesHandler } = require('./helpers/errorHandler');

const app = express();
app.use(express.json());

app.use("/user", userRouter);

// this matches all routes and all methods
app.use(unknownRoutesHandler);
//Custom error handler. Always define at last
app.use(genericErrorHandler);


app.listen(parseInt(process.env.NODE_PORT), () => {
    console.log("Server Listening on:", process.env.NODE_PORT);
});
