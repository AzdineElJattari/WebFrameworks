const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now, required: false}
})

module.exports = mongoose.model("modelProduct", schema);