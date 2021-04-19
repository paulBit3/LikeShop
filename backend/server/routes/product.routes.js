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
router.route('/api/products/lates')
  .get(productCtrl.latestItem)



export default router