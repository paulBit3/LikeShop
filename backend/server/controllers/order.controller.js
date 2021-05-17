/* definition of the controller methods to be executed 
when a route request is received by the server */

import {Order, CartItem} from '../models/order.model';
import errorHandler from './../helper/dbErrorHandler';




// ----------- Creating method for a order

/* this function invoked, takes the order details,
 create a new order, and save it to the Order table */
const create = (req, res) => {
    try {
        req.body.order.user = req.profile
        const order = new Order(req.body.order)
        let result = await order.save()
        res.status(200).json(result)
    } catch (err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }

}



// ----------- Listing all orders that have product purchased with the matching shop ID

const listByShop = async (req, res) => {
    try {
        let orders = await Order.find({"products.shop": req.shop._id})
           .populate({path: 'products.product', select: '_id name price'})
           .sort('-created')
           .exec()
        res.json(orders)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// ----------- Retrieve the order from the database
/* this method will return all orders by ID*/
const orderByID = async (req, res, next, id) => {
    try {
        let order = await Order.findById(id)
          .populate('products.product', 'name price')
          .populate('products.shop', 'name')
          .exec()
        if (!order)
          return res.status('400').json({
              error: "No available order in the database "
          })
          req.order = order
          next()
    } catch (err) {
        return res.status('400').json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


// ----------- Listing all orders by User

const listByUser = async (req, res) => {
    try {
        let orders = await Order.find({"user": req.profile._id})
           .sort('-created')
           .exec()
        res.json(orders)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}



// ----------- Read order from the database
/* this method controller return a order object in respnse to the client*/
const read = (req, res) => {
    return res.json(req.order)
}


// ----------- Update the order from the database

const update = (req, res) => {
    try {
        let order = await Order.updateOne({'products._id': req.body.cartItemId}, {'$set': {
            'products.$.status': req.body.status
        }})
        res.json(order)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

//getting status of the cart
const getStatusValues = (req, res) => {
    res.json(CartItem.schema.path('status').enumValues)
}





export default {
    create,
    listByShop,
    orderByID,
    listByUser,
    read,
    update,
    getStatusValues,
}