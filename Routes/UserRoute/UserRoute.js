const express = require('express');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const router = express.Router();

const users = require("../../Models/User");

router.get('/getUser', async (req, res) => {
    try {
        const id = req.query.userId;

        if (!id) {
            res.status(400).send({err: "Please enter a valid user ID."});
        } else {

            const user = await users.findOne({ _id: id });
                if (!user) {
                    res.status(404).send({err: 'User not found'});
                } else {
                    res.status(200).send({message: user});
                }
        }

    } catch (error) {
        res.status(400).send({err: error.message})
    }
})

const salt = 10;

router.post('/register', async (req, res) => {
    try {
        const {name, age, gender, phone, email, password } = req.body;
        console.log(req.body);
        if (!name ||!age ||!gender ||!phone ||!email ||!password) {
            res.status(400).send({err: "Please enter all fields."});
        } else {
            const user = await users.findOne({ email: email });

            if(user){
                res.status(400).send({err: "User already exists."});
            } else {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if(err){
                        res.status(500).send({err: err});
                    } else{
                        const newUser = new users({
                            _id: shortid.generate(),
                            name: name,
                            age: age,
                            gender: gender,
                            phone: phone,
                            email: email,
                            password: hash               
                            
                        });
                        console.log(password);

            await newUser.save();

            res.status(200).send({message: "User created successfully."});
        }
    })
}
}
    } catch (error) {
        res.status(400).send({err: error})
    }
})


router.get('/login', async (req, res) => {
    try {
        const { email, password } = req.query;

        if (!email || !password) {
            res.status(400).send({err: "Please enter all fields."});
        } else {
            const user = await users.findOne({ email: email });

            if (!user) {
                res.status(404).send({err: 'Wrong Credentials'});
            } else {
                bcrypt.compare(password, user.password, async (err, match) => {
                    if(err){
                        res.status(400).send({err: err.message});
                    } else if (match) {
                    res.status(200).send({message: "Login Successfull"});
                } else if (!match) {
                    res.status(404).send({err: 'Incorrect password'});
                }
            })
        }
    }
    } catch (error) {
        res.status(400).send({err: "Something went wrong please try again"})
    }
})


module.exports = router;