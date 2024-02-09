const mongoose = require('mongoose');
const { Schema } = mongoose;
const authSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        isUnique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Courses'
        }
    ]

})

module.exports = mongoose.model('auth', authSchema)