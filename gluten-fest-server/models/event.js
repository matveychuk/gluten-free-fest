const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Event = new Schema(
    {
        name: { type: String, required: true },
        companies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Companies'
          }],
        expiredAt: { type: Date, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Events', Event)