const express   = require('express');
const csrf      = require('csurf');
const router    = express();
const multer    = require('multer');

const photoUploaderController = require('../controller/photo-uploader-controller');
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

const gcsUpload = multer({ storage: storage });

const csrfProtection = csrf();
router.use(csrfProtection);

router.route('/list').get(photoUploaderController.getListOfPhoto);

router.route('/upload').get(photoUploaderController.getUploadForm);

router.route('/upload').post(gcsUpload.array('myImage', 10), photoUploaderController.postUploadPhoto);

module.exports = router;