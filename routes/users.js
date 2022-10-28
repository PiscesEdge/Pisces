const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

const { forwardAuthenticated } = require("../config.auth");
let autoController = require("../controllers/auth");

router.get("/login", forwardAuthenticated, autoController.login);

router.get("/resigter", forwardAuthenticated, autoController.register);

router.post("/register", (req, res) => {
    const { name, email, password, password1 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password1) {
        errors.push({ msg: "Fill in the fields" });
    }

    if (password != password1) {
        errors.push({ msg: "Mismatch Password" });
    }

    if (password.length < 8) {
        errors.push({ msg: "Password should be at least 8 characters" });
    }

    if (password.length > 0) {
        res.render("register", {
            errors,
            name,
            email,
            password,
            password1,
        });
    } else {
        User.findOne({ email: email }).then((user) => {
            if (user) {
                errors.push({ msg: "Email is previously registered" });
                res.render("register", {
                    errors,
                    name,
                    email,
                    password,
                    password1,
                });
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password,
                });
            }
        })
    }
});