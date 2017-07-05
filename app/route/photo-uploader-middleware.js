const multer    = require('multer');
const gcs = require( 'multer-gcs' );
const storage = gcs({
    filename: function( req, file, callback ) {
        callback(null, file.originalname);
    },
    bucket      : 'elite-bedrock-162205.appspot.com', // Required : bucket name to upload
    projectId   : 'elite-bedrock-162205', // Required : Google project ID
    keyFilename : './public/javascript/Entrenami Project-267c9bce0575.json', // Required : JSON credentials file for Google Cloud Storage
    acl         : 'publicread' // Optional : Defaults to private
});

module.exports.gcsUpload = multer({ storage: storage });