let express = require("express");
let router = express.Router();
let mainController = require("../controllers/index")

/* GET pages */
router.get("/", mainController.home);
router.get("/about", mainController.about);
router.get("/projects", mainController.projects);
router.get("/services", mainController.services);
router.get("/contact", mainController.contact);

module.exports = router;
