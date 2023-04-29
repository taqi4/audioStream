const Audio = require("../models/audio.model");

const uploadAudio = async(record)=>{
    return Audio.create(record);
}
const deleteAudio = async(id)=>{
    return Audio.deleteOne({ _id : id });
}
const updateAudio = async (id,record)=>{
    return Audio.updateOne({ _id : id },record);
}
const getAudioList = async (userId, limit, page)=>{
    return Audio.paginate({ owner : userId }, {
        page,
        limit
    })
}
module.exports = {
    uploadAudio,
    getAudioList,
    updateAudio,
    deleteAudio
}