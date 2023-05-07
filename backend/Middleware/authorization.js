function checkRole(role) {
    return function (req, res, next) {
        // console.log(req.user.role);
        if (req.user && role.includes(req.user.role)) {
            return next();
        } else {
            return res.status(403).json({'Forbidden':"you are not authorize",err:"you do not have the permission to visit this route"});
        }
    };
}
module.exports = { checkRole }
