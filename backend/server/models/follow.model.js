import mongoose from 'mongoose';


//function schema object
const Schema = mongoose.Schema;

/* generate a new mongoose schema
our follow schema definition object */
const followSchema = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    shop: {type: mongoose.Schema.ObjectId, ref: 'Shop'},
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],

})

export default mongoose.model('Follow', followSchema);