const mongoose  = require('mongoose');

const albumSchema = mongoose.Schema({
    image       : [String],
    uploadedBy  : String,
    dateCreated : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Album', albumSchema);