//File: server.js//
//Student: Vida Majd//
//Stu ID: 301238005//
//Date: OCt 26 2022//

let express = require("express");
let path = require("path");
let logger = require("morgan");

let mainRoute = require("./routes/index");

let app = express();
let port = 8000;

//eng
app.set("views", path.joint(__dirname, "./views"));
app.set("view engine", "ejs");

//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//static
app.use(express.static(path.joint(__dirname, "./public")));
app.use(express.static(path.joint(__dirname, "./node_modules")));

//rts
application.use("/", mainRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
