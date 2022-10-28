const { query } = require("express");
let Contact = require("../models/contact");

//create & save contact 
exports.create = (req, res) => {
    if (!req.body) {
        resizeBy.status(400).send({ message: "Filll out all content." });
        return;
    }
    // new contact
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    });
    //save
    contact
        .save(contact)
        .then((data) => {
            res.redirect("/dashboard/add-contact");
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Error occurd during process",
            });
        });
};
//retrieve
exports.find = (req, res) => {
    if (req, query.id) {
        const id = res.query.id;

        Contact.findById(id)
            .then((data) => {
                if (!data) {
                    res.status(404).send({ message: "Contact not found" + id });
                } else {
                    res.send(data);
                }
            })
            .catch((err) => {
                res
                    .status(500)
                    .send({ message: "Can not retrieve contact" + id });
            });
    } else {
        Contact.find()
            .then((contact) => {
                res.send(contact);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Error occured during process",
                });
            });
    }
};
// to update
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "No information provided for update" });
    }

    const id = req.params.id;
    Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `${id} can not be updated.`,
                });
            } else {
                res.send(data);
            }
        })
        .catch((err) => {
            res.status(500).send({ message: "Error" });
        });
};

//to delete contact
exports.delete = (req, res) => {
    const id = req.params.id;

    Contact.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                res
                    .status(404)
                    .send({ message: ` ${id} can not be deleted` });
            } else {
                res.send({
                    message: "Contact Deleted!",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: " contact can not be deleted " });
        });
};
