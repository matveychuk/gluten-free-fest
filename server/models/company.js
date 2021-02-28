const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Company = new Schema(
    {
        name: { type: String, required: true },
        url: { type: String, required: true },
        imageUrl: { type: String, required: true },
        description: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Companies', Company)