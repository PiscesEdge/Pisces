const axios = require("axios");
const dotenv = require("dotenv");
dotenv URL =
    process.env.URL ||
;
exports.homeRoutes = (req, res) => {
    axios
        .get(`${URL}` + `dashboard/api/contact`)
        .then(function (response) {
            console.log(response.data);
            res.render("bContact", {
                users: response.data,
                title: "Contact Dashboard",
            });
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.add_contact = (req, res) => {
    res.render("add_contact", { title: "Add Contact" });
};

exports.update_contact = (req, res) => {
    axios
        .get(`${URL}` + `dashboard/api/contact`, {
            parms: { id: req.query.id },
        })
        .then(function (userdata) {
            console.log(iserdata.data);
            res.render("update_contact", {
                user: userdata.data,
                title: "Update Contact",
            });
        })
        .catch((err) => {
            res.send(err);
        });
};