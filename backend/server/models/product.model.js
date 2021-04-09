import mongoose from 'mongoose';


//function schema object
const Schema = mongoose.Schema;

/* generate a new mongoose schema
our product schema definition object */
const productSchema = new Schema({
    name: { 
        type: String, 
        trim: true, 
        required: 'Product name required'
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String
    },
    quantity: {
        type: Number,
        required: "Stock quantity required"
    },
    price: {
        type: Number,
        required: "Product price is required"
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    created: {
        type: Date,
        default: Date.now()
    },
    shop: {
        type: mongoose.Schema.ObjectId,
        ref: 'Shop'
    }

})

export default mongoose.model('Product', productSchema);