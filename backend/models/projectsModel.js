const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    text:{
        type: String,
        required: [ true, 'Please add text value']
    }
},{
    timestamps: true,
  }
)


module.exports = mongoose.model('Projects', projectSchema)