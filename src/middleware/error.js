//error handling middleware
module.exports = (error, req, res, next) => {
    const status = error.statusCode || 500;
    let message = error.message;

    //custom error message for all 500 errors to avoid exposing internal server errors
    if (error.statusCode === 500) {
        message = "Internal server error, Please try again later";
    }
    const data = error.data;
    res.status(status).json({ message: message, data: data });
};