const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
    const referer = req.headers.referer;

    if(!referer || !referer.includes("ec2-18-133-140-147")){
        res.status(403).send("Not authorised")
    } else {
        next();
    }
})

module.exports = protect