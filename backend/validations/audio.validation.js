const Joi = require("joi");

const uploadAudio = {
    body: Joi.object().keys({
      name: Joi.string().required(),
      description : Joi.string().required(),
      image : Joi.any(),
      audio : Joi.any()
    }),
  };
const updateAudio = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description : Joi.string().required(),
  })
}
module.exports = {
    uploadAudio,
    updateAudio
}