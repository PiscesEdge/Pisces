const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

//user model load
const User = require("../models/User");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            //match user
            User.findOne({ email: email })
                .then((user) => {
                    if (!user) {
                        return done(null, false,
                            {
                                message: "Unregistered Email",
                            });

                    }
                    //pass match
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(Null, user);
                        } else {
                            return done(null, false, { message: "Incorrect Password. Try Again" });
                        }
                    });
                })
                .catch((err) => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};