const express = require('express');
const router = express.Router();
const generatePassword = require('../passport/utils').generatePassword;

const User = require('../Models/Recipe');


app.post("/login", async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(401).json({ success: false, msg: "user not found" });
    
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) handleError(err);
        
        if (result === true) {
            const tokenObject = utils.issueJWT(user);
            res.status(200).json({ 
                success: true, 
                token: tokenObject.token, expiresIn: tokenObject.expires 
            });

        } else {
            res.status(401).json({ success: false, msg: "YOUR CREDENTIALS ARE REJECTED." });
        };
    })
});

app.post('/register', async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(401).json({ success: false, msg: "username already exists" });

    const hashedPassword = await generatePassword(req.body.password);
    User.create({ username: req.body.username, hashedPassword }, function (err, user) {
        if (err) return handleError(err);
        console.log(user)
        res.status(200).json({ success: true, msg: "Welcome aboard!" });
      });
})



const handleError = (err) => {
    console.log(err);
}
