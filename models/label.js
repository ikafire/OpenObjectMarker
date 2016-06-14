var mongoose = require('mongoose');

var label = new mongoose.Schema({
    startX: Number,
    startY: Number,
    w: Number,
    h: Number,
    class: String
});

var labelSchema = new mongoose.Schema({
    user_id    : String,
    image_id   : String,
    labels     : [label]
});
 
module.exports = mongoose.model('Label', labelSchema);