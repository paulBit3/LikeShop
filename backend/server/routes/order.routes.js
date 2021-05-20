// creating the shop API
import express from 'express';
import orderCtrl from '../controllers/order.controller';
import productCtrl from '../controllers/product.controller';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';
import shopCtrl from '../controllers/shop.controller';

const router = express.Router()



//the api endpoint to create a user order in the database
router.route('/api/orders/:userId')
  .post(authCtrl.requireSignin, userCtrl.stripeCustomer, productCtrl.decreaseQuantity, orderCtrl.create)


//the api endpoint to retrieve existing orders for a specific shop, if the user is a authorized seller
router.route('/api/orders/shop/:shopId')
  .get(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.listByShop)


// the api endpoint to retrieve a user order
router.route('/api/orders/user/:userId')
   .get(authCtrl.requireSignin, orderCtrl.listByUser)


//get order status values
router.route('/api/order/status_values')
  .get(orderCtrl.getStatusValues)


//cancel product order API endpoint
router.route('/api/order/:shopId/cancel/:productId')
  .put(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.increaseQuantity, orderCtrl.update)


//endpoint to update order charge
router.route('/api/order/:orderId/charge/:userId/:shopId')
  .put(authCtrl.requireSignin, shopCtrl.isOwner, userCtrl.createCharge, orderCtrl.update)


//endpoint update order status 
router.route('/api/order/status/:shopId')
  .put(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.update)


//get when an order is created(read an order)
router.route('/api/order/:orderId')
  .get(orderCtrl.read)



//path containing the :userId parameter to retrieve the assocaite user
router.param('userId', userCtrl.userByID)

//path containing parameters to perform specific action

router.param('userId', userCtrl.userByID)
router.param('shopId', shopCtrl.shopByID)
router.param('productId', productCtrl.productByID)
router.param('orderId', orderCtrl.orderByID)


export default router