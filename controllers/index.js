//get pgs

exports.home = function (req, res) {
    res.render("index", { title: "Home", });
};

exports.about = function (req, res) {
    res.render("about", { title: "About", });
};

exports.projects = function (req, res) {
    res.render("projects", { title: "Projects", });
};

exports.services = function (req, res) {
    res.render("services", { title: "Services", });
};

exports.contact = function (req, res) {
    res.render("contact", { title: "Contact", });
};
