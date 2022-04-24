const mongoose = require('mongoose')
const goalSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, 'please add goal in text form']
        },
},{
        // timestamps all lower case 
    timestamps: true,
  }
)


module.exports = mongoose.model('Goal', goalSchema)