const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const User = require('../Models/User')

const PUB_KEY = fs.readFileSync('passport/id_rsa_priv.pem', 'utf8');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
  };


module.exports = (passport) => {
    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        console.log(jwt_payload);
        
        User.findOne({_id: jwt_payload.sub}, function(err, user) {
            
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
            
        });
    }));
}