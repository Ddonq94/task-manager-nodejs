const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./db/connect");
const notFound = require("./middleware/404");
const errorHandler = require("./middleware/errorHandler");

const { PORT, MONGO_URI } = process.env;

// json middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "<h2>Welcome to task manager API, this is a RESTful API so either build a client app or use POSTMAN(or similar apps) to use</h2>"
  );
});

app.use("/api/v1/tasks", tasks);

app.use(notFound);

app.use(errorHandler);

const port = PORT || 3500;

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(port, () => {
      console.log("server listening on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
