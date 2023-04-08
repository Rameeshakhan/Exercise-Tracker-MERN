const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema ({
    username: {  // single feild name username
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3 // these all are validation for the feid
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;