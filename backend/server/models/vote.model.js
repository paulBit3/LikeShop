import mongoose from 'mongoose';


//function schema object
const Schema = mongoose.Schema;

/* generate a new mongoose schema
our vote schema definition object */
const votesSchema = new Schema({
    voter: {type: mongoose.Schema.ObjectId, ref: 'User'},
    product: {type: mongoose.Schema.ObjectId, ref: 'Product'},
    vote: { type: Number },
    timestamps: { 
        createdAt: true, 
        updatedAt: false 
    },

})

export default mongoose.model('Votes', votesSchema);