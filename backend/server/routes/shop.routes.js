// creating the shop API
import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import shopCtrl from '../controllers/shop.controller'

const router = express.Router()


//the api endpoint to create a new shops in the database
router.route('/api/shops/by/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.isSeller, shopCtrl.create)
  .get()

//path containing the :userId parameter to retrieve the assocaite user
router.param('userId', userCtrl.userByID)


export default router