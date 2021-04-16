// creating the shop API
import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import shopCtrl from '../controllers/shop.controller'

const router = express.Router()


//the api endpoint to retrieve shops on in the database
router.route('/api/shops')
  .get(shopCtrl.list)


//the api endpoint to create a new shops and get shop by ownwer in the database
router.route('/api/shops/by/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.isSeller, shopCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, shopCtrl.listByOwner)


//path containing the :userId parameter to retrieve the assocaite user
router.param('userId', userCtrl.userByID)


export default router