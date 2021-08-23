const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {type: String, required: true},
    brand: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
}, {collection: 'examen'}) //Collection: "" maakt zelf collection aan met gegeven string anders zal het de model naam overnemen als collection naam

module.exports = mongoose.model("modelProduct", schema);