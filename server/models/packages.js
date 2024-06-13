const mongoose = require('mongoose')

const Package = mongoose.Schema(
    {

        package_name: {
            type: String,
            required: [true, "Please add the user name"],
        },
        package_description: {
            type: String,
            required: [true, "Please add the user name"],
        },
        package_count: {
            type: Number,
            required: [true, "Please add the user name"],
        },
        package_cost: {
            type: Number,
            required: [true, "Please add the user name"],
        },
        imageUrl: {
            type: String,
            required: [true, "Please add the user name"],
        },
        imagename: {
            type: String,
            required: [true, "Please add the user name"],
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model("Package", Package) 