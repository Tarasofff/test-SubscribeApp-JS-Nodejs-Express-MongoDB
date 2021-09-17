const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const User = new mongoose.Schema(
    {
        name: {type: String, required: true, validate: {validator: name => name.length > 2, message: "Name must be longer than 2 characters"}},
        surname: {type: String, required: true, validate: {validator: surname => surname.length > 2, message: "surname must be longer than 2 characters"}},
        age: {type: Number, required: true},
        date: {type: Date, default: Date.now},
        friend: {type: [Schema.Types.ObjectId]},
        subscribed: {type: [Schema.Types.ObjectId]},
        follower: {type: [Schema.Types.ObjectId]},
    },
    {
            timestamps: true
    }
);

module.exports = mongoose.model('User', User);