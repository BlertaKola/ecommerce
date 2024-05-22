const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();




module.exports.register = (req, res) => {    
    User.create(req.body)
    .then(user => {
        const userToken = jwt.sign({
            id: user._id
        }, process.env.FIRST_SECRET_KEY);
 
        res.cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({ msg: "success!", user: user });
    })
    .catch(err => res.json(err));

}

module.exports.login= async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(`${process.env.FIRST_SECRET_KEY}`);
    if(user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }
 
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
 
    if(!correctPassword) {
        return res.sendStatus(400);
    }
 
    const userToken = jwt.sign({
        id: user._id
    }, "first key value");
 
    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: "success!", user: user});
}


module.exports.logout= (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.getUserByID = (req, res) => {
    User.find(
        {_id : req.params.id}
    )
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {    
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "An error occurred", error });
        });
};


module.exports.getAllUsers = (req, res) => {
    User.find({isAdmin: false})
        .then(allusers => res.json(allusers))
        .catch(err => res.json(err))
}


module.exports.updateUser = (req, res) => {
    const { first_name, last_name, address } = req.body;

    // Create the update object with only the fields to be updated
    const updateData = {};
    if (first_name) updateData.first_name = first_name;
    if (last_name) updateData.last_name = last_name;
    if (address) updateData.address = address;

    User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updateData },
        { new: true, runValidators: true }
    )
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

