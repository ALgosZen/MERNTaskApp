const mongoose = require('mongoose')
const goalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },


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