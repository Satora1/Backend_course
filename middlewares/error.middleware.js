const errorMiddleware = (err, req, res, enxt) => {
    try {
        let error = { ...err };
        error.mesage = err.message
        console.error(err)
        if (err.name == "CastError") {
            const message = "Resource not found"
            error = new Error(message);
            error.statusCode = 404;
        }
        if (err.code == 11000) {
            const message = "Duplicate field value entred";
            error = new Error(message);
            error.statusCode = 400;
        }
        if (err.name == "ValidationError") {
            const message = Object.values(err.errors).map(val => val.message)
            error = new Error(message.join(", "));
            error.statusCode = 400;
        }
        res.status(error.statusCode || 500).json({ success: false, error: error.message || "Server Error" });
    } catch (error) {
        next(error)

    }
}
export default errorMiddleware;
