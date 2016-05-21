var mongoose = require('mongoose');
 
var labelSchema = new mongoose.Schema({
    user_id    : String,
    image_id   : String,
    //labels: {type: [Number], index: '2d'}
    labels     : String
});
 
module.exports = mongoose.model('Label', labelSchema);