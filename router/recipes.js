const express = require('express');
const router = express.Router();
const passport = require('passport');
const connection = require('../Models/index');
let multer  = require('multer');
const Recipe = require('../Models/Recipe');
var cloudinary = require('cloudinary').v2;
const { Readable } = require("stream");
require('dotenv').config();

const bufferToStream = (buffer) => {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
}


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
});

let upload  = multer({ dest: 'uploads/',storage: multer.memoryStorage() });


router.get('/recipes', (req, res) => {
    Recipe.find({}, (err, recipes) =>{
    if(err) return handleError(err)
    res.send(recipes)   
    });
});

router.post('/recipe', passport.authenticate('jwt', { session: false }), upload.single('somefile'), (req, res) => {
  const stream = cloudinary.uploader.upload_stream(
    { folder: "recipes" },
    (error, result) => {
      if (error) return console.error(error);
      req.body.imgUrl = result.secure_url;
      Recipe.create(req.body, function (err, recipe) {
        if (err) return handleError(err);
        console.log(recipe)
        res.send(recipe);
      });
    }
  );
  bufferToStream(req.file.buffer).pipe(stream);
});
  
router.put('/recipe/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Recipe.findOneAndUpdate(
      {_id: req.params.id},
      req.body,
      {returnDocument: 'after'})
    .then(result => res.send(result))
    .catch(err => handleError(err))
  });
  
router.delete('/recipe/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Recipe.deleteOne({_id: req.params.id})
    .then(result => res.send(result))
    .catch(err => handleError(err))
  });

const handleError = (err) => {
    console.log(err);
}

module.exports = router
