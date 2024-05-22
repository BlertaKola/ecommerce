const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [
            true,
            "First name is required"
        ]
    },
    last_name: {
        type: String,
        required: [
            true,
            "Last name is required"
        ]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [4, "Password must be 4 characters or longer"]
    },
    address: { type: String,
    
        default: ""
    },
    isAdmin : {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });


UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});



UserSchema.pre('save', function (next) {

    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});
module.exports = mongoose.model('User', UserSchema);