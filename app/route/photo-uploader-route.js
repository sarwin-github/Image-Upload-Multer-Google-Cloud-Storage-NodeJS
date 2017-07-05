const express   = require('express');
const csrf      = require('csurf');
const router    = express();

const photoUploaderController = require('../controller/photo-uploader-controller');
const photoUploaderMiddleware  = require('./photo-uploader-middleware');

const csrfProtection = csrf();
router.use(csrfProtection);

router.route('/list').get(photoUploaderController.getListOfPhoto);

router.route('/upload').get(photoUploaderController.getUploadForm);

router.route('/upload').post(photoUploaderMiddleware.gcsUpload.array('myImage', 10), 
							 photoUploaderController.postUploadPhoto);

module.exports = router;