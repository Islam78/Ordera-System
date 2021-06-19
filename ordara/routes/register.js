const router = require('express').Router()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const connection = require('../model/database')
//Creat new user
router.post("/signupuser", bodyParser.json(), function (req, res) {
    console.log(req.body)
    var user = req.body.type
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var password = req.body.password
    var email = req.body.email
    let pw = bcrypt.hashSync(password, 10);
    if (user) {// user is exist
        connection.query("SELECT * FROM `User` WHERE `Email`=?", email, function (err, result) {
            if (result.length > 0) {
                console.log("User is exit");
                res.status(202).json({
                    error: "User is Exist"
                })
                if (err) throw err;
            }
            else {// create new user 
                var sql = "INSERT INTO `User`(`First_name`, `last_name`, `password`,`Email`) VALUES ('" + first_name + "','" + last_name + "','" + pw + "','" + email + "');"
                connection.query(sql, function (err, result) {
                    if (err) throw err
                    console.log(user, "inserted");
                    res.status(200).json({
                        record: "User inserted"
                    })
                })
            }
        });
    }


})
router.post("/signupdelvary", bodyParser.json(), function (req, res) {
    console.log(req.body)
    var Delvary = req.body.type
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var password = req.body.password
    var email = req.body.email
    let pw = bcrypt.hashSync(password, 10);
    if (Delvary) {// Delvary is exist
        connection.query("SELECT * FROM `Delvary` WHERE `Email`=?", email, function (err, result) {
            if (result.length > 0) {
                console.log("Delvary is exit");
                res.status(202).json({
                    error: "Delvary is Exist"
                })
                if (err) throw err;
            }
            else {
                // create new Delvary 
                var sql = "INSERT INTO `Delvary`(`First_name`, `last_name`, `password`,`Email`) VALUES ('" + first_name + "','" + last_name + "','" + pw + "','" + email + "');"
                connection.query(sql, function (err, result) {
                    if (err) throw err
                    console.log("1 record inserted");
                    res.status(200).json({
                        record: "Delvary inserted"
                    })
                })
            }
        });
    }


})

module.exports = router;
