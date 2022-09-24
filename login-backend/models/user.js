var mongoose = require("mongoose");

var userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,

    role: {
        type: String,
        required: [true, "please enter  role"],
    },
    phone_number: {
        type: Number,
        required: [true, "please enter phone number"],
        validate: [
            {
                validator: function(v) {
                    return /^[6-9]\d{9}$/.test(v);
                },
                message: "please enter a valid indian phone number"
            }
        ]
    },
    isActive: {
        type: Boolean,
        default: true,
    },

});



module.exports = mongoose.model("User", userSchema);