export function home(req, res) {
    res.render("index", { title: "Home" });
}

export function about(req, res) {
    res.render("about", { title: "About" });
}

export function projects(req, res) {
    res.render("projects", { title: "Projects" });
}

export function services(req, res) {
    res.render("services", { title: "Services" });
}

export function contact(req, res) {
    res.render("contact", { title: "Contact" });
}