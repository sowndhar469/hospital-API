const express = require('express');
const app = express();
const port = 7200;

const session = require('express-session');
const db = require('./config/mongoose');
const passport = require('passport');
const passportJwt = require('./config/passport-jwt-strategy');

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


app.use(
    session({
        secret: "!A%D*G-KaPdSgVkYp3s5v8y/B?E(H+MbQeThWmZq4t7w9z$C&F)J@NcRfUjXn2r5u8x/A%D*G-KaPdSgVkYp3s6v9y$B&E(H+MbQeThWmZq4t7w!z%C*F-J@NcRfUjXn2r5u8x/A?D(G+KbPdSgVkYp3s6v9y$B&E)H@McQfThWmZq4t7w!z%C*F-JaNdRgUkXn2r5u8x/A?D(G+KbPeShVmYq3s6v9y$B&E)H@McQfTjWnZr4u7w!z%C*F-JaNdRgUkXp2s5v8y/A?D(G+KbPeShVmYq3t6w9z$C&E)H@McQfTjWnZr4u7x!A%D*G-JaNdRgUkXp2s5v8y/B?E(H+MbPeShVmYq3t6w9z$C&F)J@NcRfTjWnZr4u7x!A%D*G-KaPdSgVkXp2s5v8y/B?E(H+MbQeThWmZq3t6w9z$C&F)J@NcRfUjXn2r5u7x!A%D*G-KaPdSgVkYp3s6v9y/B?E(H+MbQeThWmZq4t7w!z%C*F)J@NcRfUjXn2r5u8",
        resave: false,
        saveUninitialized: true
    })
)


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


// Using routes
app.use('/', require('./routes'));



// Start the server
app.listen(port, function (err) {
    if (err) {
        console.log('Error', err);
        return;
    }

    console.log("Server is online and running at port " + port);
    return;
});

