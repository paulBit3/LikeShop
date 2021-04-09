import mongoose from 'mongoose';


//function schema object
const Schema = mongoose.Schema;

/* generate a new mongoose schema
our post schema definition object */
const postSchema = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    shop: {type: mongoose.Schema.ObjectId, ref: 'Shop'},
    content: { type: String, required: true, trim: true },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

})

export default mongoose.model('Post', postSchema);