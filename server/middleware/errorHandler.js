
const errorHandler = (err, req, res, next) => {
    const { constants } = require("./constants");

    switch (err.statusCode) {
        case 300:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case 400:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
        case 201:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
        case 302:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
        case 500:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
        case 401:
            res.json({
                title: "Review Error",
                message: err.message,
                stackTrace: err.stack,
            });
        default:
            console.log("No Error, All good !");
            break;
    }
}
module.exports = errorHandler;
