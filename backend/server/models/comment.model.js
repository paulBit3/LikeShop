import mongoose from 'mongoose';


//function schema object
const Schema = mongoose.Schema;

/* generate a new mongoose schema
our comment schema definition object */
const commentSchema = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    shop: {type: mongoose.Schema.ObjectId, ref: 'Shop'},
    post: {type: mongoose.Schema.ObjectId, ref: 'Post'},
    content: { type: String, required: true, trim: true },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    timestamps: { 
        createdAt: true, 
        updatedAt: false 
    },

})

export default mongoose.model('Comment', commentSchema);