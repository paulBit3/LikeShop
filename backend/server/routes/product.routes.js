// creating the shop API
import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import productCtrl from '../controllers/product.controller'
import shopCtrl from '../controllers/shop.controller'

const router = express.Router()


//the api endpoint to create product and retrieve product from the database
router.route('/api/products/by/:shopId')
  .post(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.create)
  .get(productCtrl.listByShop)


//the api endpoint to fetch the latest product 
router.route('/api/products/latest')
  .get(productCtrl.latestItem)



//the api endpoint to fetch the related product 
router.route('/api/products/related/:productId')
  .get(productCtrl.listRelated)



//path containing the :productId parameter to retrieve the product from the database
router.param('productId', productCtrl.productByID)







export default router