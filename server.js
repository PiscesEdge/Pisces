//File: server.js//
//Student: Vida Majd//
//Stu ID: 301238005//
//Date: OCt 26 2022//

let express = require("express");
let path = require("path");
let mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
let logger = require("morgan");
let session = require("express-session");
let passport = require("passport");
const flash = require("connect-flash");
const { connected } = require("process");

//passport conf
require("./config/passport")(passport);

//app initi
let app = express();
let port = process.env.port || 8000;

//db
const db = process.env.MONGO_Url;

//mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useInifiedTopology: true,
    })
    .them(() => {
        console.log("Mongo DB connected.");
    })
    .catch((err) => console.log(err));

//eng
app.set("views", path.joint(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

//middleware
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true.)};

app.use(logger("dev"));
app.use(express.json());
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//g var
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.erros = req.flash("error");
    next();
})

//static
app.use(express.static(path.joint(__dirname, "./public")));
app.use(express.static(path.joint(__dirname, "./node_modules")));

//rts
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
// app.use("/dashboard", require("./routes/contact"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
