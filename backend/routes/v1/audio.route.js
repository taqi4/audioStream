const express = require('express');
const validate = require('../../middlewares/validate');
const audioValidation = require('../../validations/audio.validation');
const audioController = require('../../controllers/audio.controller');
const auth = require('../../middlewares/auth');
const audioUpload = require("../../middlewares/multer/audio.upload");
const router = express.Router();

router.post("/upload",auth(),audioUpload.send,validate(audioValidation.uploadAudio),audioController.uploadAudio)
router.get("/list",auth(),audioController.getAudioList);
router
.route("/:id")
.delete(auth(),audioController.deleteAudio)
.post(auth(),validate(audioValidation.updateAudio),audioController.updateAudio)
module.exports = router;

