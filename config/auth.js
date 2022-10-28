
export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    req.flash("Login to view");
    res.redirect("/");
}
export function forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
}