const https = require("https");
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const port = 3001;

const protect = require("./middleware/authMiddleware");
const { errorHandler } = require("./middleware/errorMiddleware");

app.use(errorHandler);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public/English")));
app.use(express.static(path.join(__dirname, "/public/English/VACATI")));

app.get("/api", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
        .send("Welcome to the Mobius API");
})

app.get("/api/getVideo", (req, res) => {
    const videoName = req.query.videoName;

    const filename = __dirname + "/public/" + videoName + ".mp4";

    res.setHeader("Access-Control-Allow-Origin", "*")
        .status(200)
        .sendFile(filename);
})

// app.listen(port, () => {console.log(`listening at port: ${port}`)});

https
  .createServer(
    {
      key: fs.readFileSync('./ssl/server.key'),
      cert: fs.readFileSync('./ssl/server.cer')
    }, 
    app
  )
  .listen(port, ()=>{
    console.log(`server is runing at port ${port}`)
  });