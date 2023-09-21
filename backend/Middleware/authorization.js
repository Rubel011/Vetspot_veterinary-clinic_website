const { errorResponse } = require("../helpers/successAndErrorResponse");

function checkRole(role) {
    return function (req, res, next) {
        // console.log(req.user.role);
        if (req.user && role.includes(req.user.role)) {
            return next();
        } else {
            return res.status(404).json(errorResponse(404, "Unauthorized - You are not allowed to access this route."));
        }
    };
}
module.exports = { checkRole }
