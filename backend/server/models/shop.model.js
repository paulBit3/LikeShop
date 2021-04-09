import mongoose from 'mongoose';


//function schema object
const Schema = mongoose.Schema;

/* generate a new mongoose schema
our shop schema definition object */
const shopSchema = new Schema({
    name: { 
        type: String, 
        trim: true, 
        required: 'Shop name required'
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String,
        trim: true
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    created: {
        type: Date,
        default: Date.now()
    },
    notifications: [{
        type: Schema.Types.ObjectId,
        ref: 'Notify',
      }]

})

export default mongoose.model('Shop', shopSchema);