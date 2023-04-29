const httpStatus = require("http-status");

const multer = require('multer');
const path = require('path');



// Set up Multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedImageTypes = /jpeg|jpg|png|gif/;
    const allowedAudioTypes = /mp3|wav/;
    const isImage = allowedImageTypes.test(path.extname(file.originalname).toLowerCase());
    const isAudio = allowedAudioTypes.test(path.extname(file.originalname).toLowerCase());
    if (isImage) {
      cb(null, true);
    } else if (isAudio) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});


module.exports.send = (req, res, next) => {
    
    return  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }])(req, res, () => {
        // for validations  if required
        // if (!req.file){
        //     return res.status(httpStatus.BAD_REQUEST).send({ error: 'Please upload valid Image'});
        //  }
      next()
    })
  };