const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const audioSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    audioPath : String,
    imgPath : String,
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
audioSchema.plugin(toJSON);
audioSchema.plugin(paginate)
/**
 * @typedef Audio
 */
const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;
