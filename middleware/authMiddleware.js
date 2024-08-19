const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
    const referer = req.headers?.referer;

    if(!referer || !referer.includes("ec2-35-178-195-77")){
        res.status(403).send("Not authorised")
    } else {
        next();
    }
})

module.exports = protect