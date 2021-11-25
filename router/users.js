const express = require('express');
const router = express.Router();
const generatePassword = require('../passport/utils').generatePassword;
const issueJWT = require('../passport/utils').issueJWT;
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('../Models/User');


router.post("/login", async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json({ success: false, msg: "user not found" });
    bcrypt.compare(req.body.password + process.env.PEPPER, user.hashedPassword, (err, result) => {
        if (err) handleError(err);
        
        if (result === true) {
            const tokenObject = issueJWT(user);
            res.status(200).json({ 
                success: true, 
                token: tokenObject.token, expiresIn: tokenObject.expires 
            });

        } else {
            res.status(401).json({ success: false, msg: "YOUR CREDENTIALS ARE REJECTED." });
        };
    })
});

router.post('/register', async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(401).json({ success: false, msg: "username already exists" });

    const hashedPassword = await generatePassword(req.body.password);
    User.create({ username: req.body.username, hashedPassword }, function (err, user) {
        if (err) return handleError(err);
        res.status(200).json({ success: true, msg: "Welcome aboard!" });
      });
})



const handleError = (err) => {
    console.log(err);
}

module.exports = router
