const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');


//   /doctors/register
// username : String (required)
// name : String (required)
// password : String (required)
module.exports.register = async function (req, res) {
    try {
        // console.log(req.body, 'body');

        let user = await Doctor.findOne({ username: req.body.username });
        if (user) {
            return res.status(200).send({
                isRegistered: false,
                message: 'User already exists',
            });
        }

        let newUser = await Doctor.create({
            name: req.body.name ? req.body.name : req.body.username,
            username: req.body.username,
            password: req.body.password
        });

        console.log(newUser, 'doctor');

        if (newUser) {
            return res.status(200).send({
                isRegistered: true,
                data: newUser,
                message: 'User registered',
            });
        }

    } catch (error) {
        console.log('Internal server error', error);
        return res.status(500).send({
            isRegistered: false,
            message: 'Internal Server Error',
        });
    }
};

// Function to login an existing doctor if the credentials provided are correct
// It returns a JWT to be used for further authentication
//  /doctors/login
// Input: username, password
module.exports.login = async function (req, res) {
    try {
        console.log(req.body, 'body');
        let user = await Doctor.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        if (user) {

            // jwt.sign() function is used to generate a JSON Web Token (JWT) for authentication purposes
            let token = jwt.sign({ _id: user._id }, // user.toJSON() --> first parameter is the payload/contents of the token(id,usrename etc)
                "jaiShreeRam",//This is the secret key used to sign the JWT. 
                { expiresIn: '1h' });

            return res.status(200).send({
                isAuthenticated: true,
                token: token,
            });
        } else {
            return res.status(422).send({
                isAuthenticated: false,
                message: "Invalid Username or Password",
            });
        }
    } catch (error) {
        console.log('Internal server error', error);
        return res.status(500).send({
            isAuthenticated: false,
            message: 'Internal Server Error',
        });
    }
}
