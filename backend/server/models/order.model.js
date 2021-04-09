import mongoose from 'mongoose';


//function schema object
const Schema = mongoose.Schema;

//record details of each products ordered
const cartItemSchema = new Schema({
    product: {type: mongoose.Schema.ObjectId, ref: 'Product'},
    quantity: Number,
    shop: {type: mongoose.Schema.ObjectId, ref: 'Shop'},
    status: {type: String,
      default: 'Not processed',
      enum: ['Not processed' , 'Processing', 'Shipped', 'Delivered', 'Cancelled']}
})

//represent each product ordered when order was placed
const CartItem = mongoose.model('CartItem', CartItemSchema)

/* generate a new mongoose schema
our order schema definition object */
const orderSchema = new Schema({
    products: [cartItemSchema],
    customer_name: { 
        type: String, 
        trim: true, 
        required: 'Customer name required'
    },
    customer_email: {
        type: String,
        trim: true,
        unique: 'This email already exists',
        match: [/.+\@.+\..+/, 'Email address not valid'],
        required: 'Email required'
    },
    delivery_address: {
        street: {type: String, required: 'Street address is required'},
        city: {type: String, required: 'City name is required'},
        state: {type: String},
        zipcode: {type: String, required: 'Zip Code is required'},
        country: {type: String, required: 'Country name is required'}
    },
    payment_id: {},
    category: {
        type: String
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    created: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }

})

const Order = mongoose.model('Order', orderSchema);
export {Order, CartItem} 