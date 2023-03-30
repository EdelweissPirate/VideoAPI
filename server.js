const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const port = 3000;

const protect = require("./middleware/authMiddleware");
const { errorHandler } = require("./middleware/errorMiddleware");

app.use(errorHandler);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public/ARP-L_LESSON_2_IMPLEMENTATION_PART_1")));

app.get("/api", protect, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
        .send("Welcome to the Mobius API");
})

app.get("/api/getVideo", protect, (req, res) => {
    // let range = req.headers.range;
    
    // console.log("range: ", range);

    // if(!range || range === undefined) {
    //     range = "bytes=0-";
    // }

    let params = (new URL(req.headers.referer + req.url)).searchParams;

    const urlParams = new URLSearchParams(params);
    const videoName = urlParams.get("videoName")
    const filename = __dirname + "/public/" + videoName + ".mp4";

    res.setHeader("Access-Control-Allow-Origin", "*")
        .status(200)
        .sendFile(filename);
    
    ////////
    // const videoSize = fs.statSync(filename).size;

    // // Set the response headers
    // res.writeHead(200, {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "video/mp4",
    //     "Content-Length": videoSize,
    // });

    // // Create a read stream and pipe it to the response object in chunks. Sent in 512kb chunks
    // const videoStream = fs.createReadStream(filename, { highWaterMark: 512 * 1024 });
    // videoStream.pipe(res);
    ///////////


    // const videoSize = fs.statSync(filename).size;
    // const CHUNK_SIZE = 10 ** 6;
    // const start = Number(range.replace(/\D/g, ""));
    // const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    // const contentLength = end - start + 1;
    // const headers = {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    //     "Accept-Ranges": "bytes",
    //     "Content-Length": contentLength,
    //     "Content-Type": "video/mp4",
    // };

    // // console.log(videoSize, CHUNK_SIZE, start, end, contentLength, headers);

    // res.writeHead(206, headers);
    // const videoStream = fs.createReadStream(filename, { start, end });
    // // console.log("Video stream created successfully: ", videoStream);
    // videoStream.pipe(res);
})

app.listen(port, () => {console.log(`listening at port: ${port}`)});