import mongoose from 'mongoose';


//function schema object
const Schema = mongoose.Schema;

/* generate a new mongoose schema
our notification schema definition object */
const notifySchema = new Schema({
    type: { 
        type: Number, 
    },
    sender: {type: mongoose.Schema.ObjectId, ref: 'User'},
    shop: {type: mongoose.Schema.ObjectId, ref: 'Shop'},
    receiver: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    notify_type: {
        type: String,
    },
    isread: {
        type: Boolean,
        default: false
    },
    message: {
        type: String,
    },
    timestamps: { 
        createdAt: true, 
        updatedAt: false 
    },

})

export default mongoose.model('Notify', notifySchema);