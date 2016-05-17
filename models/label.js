var mongoose = require('mongoose');
 
var labelSchema = new mongoose.Schema({
    user_id    : String,
    image_id   : String,
    updated_at : Date,
    labels: {type: [Number], index: '2d'}
});
 
module.exports = mongoose.model('Label', labelSchema);