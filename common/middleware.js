module.exports = function (req, res, next) {
    req.isAdmin = true;
    next();
}