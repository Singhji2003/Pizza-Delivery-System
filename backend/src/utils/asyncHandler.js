const asyncHandler = (requetHandler) => (req, res, next) => {
    Promise.resolve(requetHandler(req, res, next)).catch((err) => next(err))
}

export default asyncHandler