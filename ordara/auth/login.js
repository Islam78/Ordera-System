const router = require('express').Router()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const connection = require('../model/database')
const jwt = require('jsonwebtoken')
//login
router.post("/login", bodyParser.json(), function (req, res) {
    console.log(req.body)
    var email = req.body.email
    var password = req.body.password
    var type = req.body.type;
    // if user select type user send 1
    if (type == 1) {
        // check if user exist 
        connection.query("SELECT * FROM `User` WHERE Email=?", email, function (err, result) {
            if (result.length > 0) {//if exist convert string paswd to hash code 
                if (bcrypt.compareSync(password, result[0].password)) {
                    console.log("This is user")//المفروض يتحول علي الداش بورد
                    // send user info to frontend 
                    res.status(200).json({
                        result: {
                            sucsess: "this is user"
                        }
                    })

                }
                else {
                    // send Wrong Password to frontend 
                    console.log("Password dont match")//المفروض يتطبع الرسالة 
                    res.status(202).json({
                        error: "Wrong Password"
                    })
                }
                if (err) throw err;
            }
            else {
                // send user dont Exist to frontend
                console.log("User dont Exist")
                res.status(202).json({
                    error: "User dont Exist"
                })
            }
        });
    } else if (type == 2) {
        // if type = 2 this is Delvary 
        connection.query("SELECT * FROM `Delvary` WHERE Email=?", email, function (err, result) {
            if (result.length > 0) {
                //if exist convert string paswd to hash code 
                if (bcrypt.compareSync(password, result[0].password)) {
                    console.log("This is Admin")//المفروض يتحول علي الداش بورد
                    res.status(200).json({
                        result: {
                            sucsess: "This is Delvary"

                        }
                    })
                }
                else {
                    console.log("Passwords dont match")//المفروض يتطبع الرسالة 
                    res.status(202).json({
                        error: "Wrong Passwords"
                    })
                }
                if (err) throw err;
            }
            else {
                console.log("Delvary dont Exist")
                res.status(202).json({
                    error: "Delvary dont Exist"
                })
            }
        });

    }

});
module.exports = router;