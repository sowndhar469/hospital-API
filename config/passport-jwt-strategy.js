const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;   // To extract request data

const Doctor = require('../models/doctor');

// Options for Passport configuration
let Options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header as a bearer token
    secretOrKey: "jaiShreeRam", // Secret key used to verify the JWT
}

// Configure Passport to use the JWT strategy
passport.use(
    new JWTStrategy(Options, async function (jwtPayload, done) {//jwtPayload refers to payload or decoded contents of (JWT)

        try {
            const user = await Doctor.findById(jwtPayload); // Find the doctor based on the _id extracted from the JWT payload
            if (user) {
                return done(null, user); // If a user is found, authentication is successful
            } else {
                return done(null, false); // If no user is found, authentication fails
            }
        } catch (error) {
            console.log('Error in finding user from JWT', error);
            return;
        }
    })
);

module.exports = passport;
