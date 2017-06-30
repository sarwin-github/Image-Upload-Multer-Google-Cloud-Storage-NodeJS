const session 	 = require('express-session');
const mongoose 	 = require('mongoose');
const mongoStore = require('connect-mongo')(session);

let mongoConnectionLocal = {	
	'url': 'mongodb://sarwin:01610715@localhost:27017/image-upload-gcs?authSource=admin'
};

let mongoConnectionOnline = {
	'url': 'mongodb://usernameValue:01610715@ds139942.mlab.com:39942/album-db-multer-gcs'
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Session storage and database configuration 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports.pickEnv = (env, app) => {
	mongoose.Promise = global.Promise;
	switch (env) {
	    case 'dev':
	    	app.set('port', process.env.PORT || 9000);
	        mongoose.connect(mongoConnectionOnline.url, err => { if(err) { console.log(err.stack); }}); 
	        break;
	    case 'local':
	    	app.set('port', process.env.PORT || 9001);
	        mongoose.connect(mongoConnectionLocal.url,  err => { if(err) { console.log(err.stack); }});
			break;
	};
	
	///Set session and cookie max life, store session in mongo database
	app.use(session({
		key:      'app.sess',
		secret:   'my-application-secret-for-session',    
		resave:   true,
	  	saveUninitialized: false, 
		store:    new mongoStore({ mongooseConnection: mongoose.connection }),
		cookie:   { maxAge: 60 * 60 * 1000 }
	}));
};


