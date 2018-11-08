const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const ProfileSchema = new Schema({
    handle: {
        type: String,
        required: true,
        max: 40
    },
    location: {
        type: String
    },
    bio: {
        type: String
    },
    social: {
        twitter: {
            type: String
        },
        facebook: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = Profile = mongoose.model("profile", ProfileSchema);
