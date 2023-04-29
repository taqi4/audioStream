const { createReadStream } = require('fs');
const httpStatus = require('http-status');
const { parseStream } = require('music-metadata');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const audioService = require("../services/audio.service");
const uploadAudio = catchAsync(async(req,res)=>{
    const { name, description } = req.body;
    const { _id } = req.user;
    const image = req.files.image ? req.files.image[0] : null;
    const audio = req.files.audio ? req.files.audio[0] : null;
  
    if (!image || !audio) {
        throw new ApiError(httpStatus.BAD_REQUEST,'Audio and image are required')
    }
  
    if (audio) {
      const audioStream = createReadStream(audio.path);
      const { format: { duration } } = await parseStream(audioStream);
      if (duration < 30) {
        throw new ApiError(httpStatus.BAD_REQUEST,"Audio should be 30 sec long")
    }
    }
    const audioRecord = {
        owner : _id,
        name,
        description,
        audioPath : audio.filename,
        imgPath : image.filename
    }
    const response = await audioService.uploadAudio(audioRecord);
    res.send(response);
});

const getAudioList = catchAsync(async(req,res)=>{
    const { _id } = req.user;
    const { page, limit }  = req.query;
    const response = await audioService.getAudioList(_id,limit,page);
    res.send(response);
})

const deleteAudio = catchAsync(async(req,res)=>{
    const { id } = req.params;
    await audioService.deleteAudio(id);
    res.send({status:"success"});
})
const updateAudio = catchAsync(async(req,res)=>{
    const { id } = req.params;
    await audioService.updateAudio(id,req.body);
    res.send({status: "success"}); 
})

module.exports = {
    uploadAudio,
    getAudioList,
    deleteAudio,
    updateAudio
}