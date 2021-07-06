const mongoose = require ('mongoose')

const usersSchema = new mongoose.Schema ({
    name: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true
    },
    
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true
    },

    userName: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true
    },

    email: {
        type: String,
        minLength: 2,
        maxLength: 100,
        match: /.+@.+\..+/,
        required: true
    },

    bio: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: false
    },
    
    cellphone: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: false
    },

    password: {
        type: String,
        minLength: 2,
        required: true
        //Falta regex
    },

    role: {
        type: [String],
        enum: ['admin', 'partner', 'user'],
        minLength: 1,
        maxLength: 50,
        required: true,
        },

    purchasedCourses: [],
    purchasedId: {      //<- 'subscriptionId'
        type: String
    },

    // uploadedCourses: [],
    // title: {
    //     type: String,
    //     minLength: 2,
    //     maxLength: 100,
    //     required: false
    // },
    // courseId: {
    //     type: String,
    //     minLength: 2,
    //     maxLength: 100,
    //     required: false
    // }
})

const model = mongoose.model ('users', usersSchema)

module.exports = model

