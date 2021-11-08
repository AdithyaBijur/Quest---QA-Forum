const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const us = require("underscore");
var validator = require("email-validator");
const User = require("../Models/User")

const router = express.Router();
router.use(bodyParser())

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())
router.post('/', (req, res) => {

    if (req.body.email == undefined || req.body.password == undefined || req.body.userName == undefined || req.body.interest == undefined || req.body.aos == undefined || req.body.firstname == undefined || req.body.lastname == undefined) {
        // console.log("send all details");
        res.status(403).json({ "msg": "all data not send" });
    }
    else {
        if (req.body.email == "" || req.body.password == "" || req.body.userName == "" || req.body.interest == "" || req.body.aos == "" || req.body.firstname == "" || req.body.lastname == "") {
            // console.log("please fill all values");
            res.status(403).json({ "msg": "fill all data" });
        }
        else {

            // console.log(req.body.userName)
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                // Store hash in your password DB.
                // console.log(hash);
                var same
                var a;
                const result12 = User.find({ 'userName': req.body.userName })
                    .then(result2 => {
                        // console.log(result2)
                        same = result2;
                        a = us.size(same);
                        // console.log("this is same"+ a)

                        if (a == 0) {


                            const em = validator.validate(req.body.email); // true
                            if (em == true) {
                                const user = new User({

                                    "email": req.body.email,
                                    "password": hash,
                                    "userName": req.body.userName,

                                    "aos": req.body.aos,
                                    "firstname": req.body.firstname,
                                    "interest": req.body.interest,
                                    "lastname": req.body.lastname,
                                    "rep": 0,
                                    "profile": "",
                                    "upvotedans": [],
                                    "downvotedans": [],
                                    "upvotedques": [],
                                    "downvotedques": [],
                                    "community": [],
                                    "badge": ""
                                });
                                const result = user.save().then((user) => res.status(202).json({ "msg": "user created succesfully" })).catch(err => {
                                    // console.log(err);
                                });
                                //console.log(result)
                            }
                            else {
                                res.status(400).json({ "msg": "enter valid email" })
                            }
                        }
                        if (a != 0) {
                            // console.log("username already present");
                            res.status(404).json({ "msg": "username already present" });
                        }



                    });


            });


        }
    }
});

// const port = process.env.PORT || 1080;
// router.listen(port, () => console.log(`Listening on port ${port}...`));
module.exports = router;
