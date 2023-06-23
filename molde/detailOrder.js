const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailOrder = new Schema({
    ID_KH: String,
    ID_Address: String,
    ID_Product: String,
    nameSP: String,
    giaSP: String,
    soluongSP: String,
    image : String,
    tongTien : Number,
    status : String,
    sold: Number,
    date :Date,
    review: Number,
});

module.exports = mongoose.model("detailOrder", detailOrder);