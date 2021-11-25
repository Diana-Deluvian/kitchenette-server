const express = require('express');
const router = express.Router();
const passport = require('passport');
const connection = require('../Models/index');
const Recipe = require('../Models/Recipe');

router.get('/recipes', (req, res) => {
    Recipe.find({}, (err, recipes) =>{
    if(err) return handleError(err)
    res.send(recipes)   
    });
});

router.post('/recipe', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body)
    Recipe.create(req.body, function (err, recipe) {
        if (err) return handleError(err);
        console.log(recipe)
        res.send(recipe);
      });
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
