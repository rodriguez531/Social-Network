const { Schema, model, Types } = require('mongoose');

const thoughtSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String, 
            required: true, 
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
    },

    
    {
        thoughtText: {
            type: String,
            required: true,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String, 
            required: true, 
        },
        reactions: [ {
            type: Schema.Types.ObjectId,
            ref: 'reaction'
        }],
    }
)
const Thought = model('Thought', thoughtSchema,)
module.exports = Thought;