const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
    f_id : String,
    name : String,
    price : Number,
    category : String
});

const foodModel = mongoose.model("foodDetail",foodSchema,"foodDetail");

module.exports = foodModel;