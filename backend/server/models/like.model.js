import mongoose from 'mongoose';


//function schema object
const Schema = mongoose.Schema;

/* generate a new mongoose schema
our like schema definition object */
const likeSchema = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    shop: {type: mongoose.Schema.ObjectId, ref: 'Shop'},
    post: {type: mongoose.Schema.ObjectId, ref: 'Post'},
    content: { type: String, required: true, trim: true },
    timestamps: { 
        createdAt: true, 
        updatedAt: false 
    },

})

export default mongoose.model('Like', likeSchema);