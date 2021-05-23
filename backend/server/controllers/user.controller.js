/* definition of the controller methods to be executed 
when a route request is received by the server */

import User from '../models/user.model';

//lodash library when updating an exixting user with change value
import extend from 'lodash/extend';

import errorHandler from './../helper/dbErrorHandler';
import request from 'request';
import config from '../../../config/config';
import stripe from 'stripe';


/* Our API endpoint user controller function. */


const userStripe = stripe(config.stripe_pub_secret_key);





// ----------- Creating a new user
/* our function to create a new user. when the Express app gets a 
POST request at '/api/users', it calls the create function */
const create = async (req, res) => {
    const user = new User(req.body)
    try {
        /* save the user. using await to return a Promise*/
        await user.save()
        return res.status(200).json({
            message: "User successfully created!"
        })
        
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
        
    }
}

// ----------- Listing all users
//the list controller function to find all the users from our database
const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created')
        //return users as JSON objects
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


// ----------- Loading a user by id to read, updte or delete
/* our userbyID controller function to fetch and load the user into the Express request
This function uses the value in userId to query the database by _id */
const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user)
          return res.status('400').json({
              error: "User not found"
          })
          //if user found
        req.profile = user
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
}

// ----------- Reading a single data
/* On a GET request at /api/users/:userId, Express app will execute the userByID function 
to load user by the userId value followed by the read controller function */
const read = (req, res) => {
    // removing sensitive information
    req.profile.hashed_password = undefined 
    req.profile.salt = undefined
    return res.json(req.profile)
}


 // ----------- Updating a single user data
/*  On a PUT request at /api/users/:userId loads user with 
the :userId before executing update controller function */
const update = async (req, res) => {
    try {
        //retrieves user details
        let user = req.profile 
        user = extend(user, req.body) 
        // current date to reflect the last updated timestamp
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


// ----------- Deleting a single user data
/* this remove function retrieves the user from req.profile and use 
the remove() query to delete the user from the database. */
const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}



// ----------- Checking if the current user is a seller before creating a new shop
const isSeller = (req, res, next) => {
    const isSeller = req.profile && req.profile.seller
    if (!isSeller) {
        return res.status('403').json({
            error: "You must be a seller, before creating a shop!"
        })
    }
    next()
}


//------------ Creating a Strip conttoller method. This controller method will make POST request to the Stripe API
// It take the platform's secret key and the retrieve auth code to complete the authorization-------
const stripe_auth = (req, res, next) => {
    request({
        url: 'https://connect.stripe.com/oauth/token',
        method: 'POST',
        json: true,
        body: {clien_secret:config.stripe_pub_secret_key, code:req.body.stripe, grant_type:'authorization_code'}
    }, (error, response, body) => {
        //update the user
        if (body.error) {
            return res.status('400').json({
                error: body.error_description
            })
        }
        req.body.strip_seller = body
        next()
    })
}


//------------ This controller method will check whether the current user exist in the DB
//so it will create or update customer information such as credit card, etc...-------
const customer_Object = (req, res, next) => {
    if (req.profile.stripe_customer) {
        //updating existing customer infos
        userStripe.customers.update(req.profile.stripe_customer, {
            source: req.body.token
        }, (err, customer) => {
            if (err) {
                return res.status(400).send({
                    error: "Something went wrong, could not perform update"
                })
            }
            req.body.order.payment_id = customer.id
            next()
        })
    } else {
        //if not customer object exist
        userStripe.customers.create({
            email: req.profile.email,
            source: req.body.token
        }).then((customer) => {
            User.updateOne(
                {'_id':req.profile._id}, 
                {'$set': {'customer_object': customer.id}},
                (err, order) => {
                    if (err) {
                        return res.status(400).send({
                            error: errorHandler.getErrorMessage(err)
                        })
                    }
                    //adding the customer id to the order beeing palced
                    req.body.order.payment_id = customer.id
                    next()
                })
        })
    }
}


//------------ To charge a credit or a debit card, let's create a Charge object.
//this can retrieve and refund individual charges as well as list all charges, etc...-------
const charge_Object = (req, res, next) => {
    if (!req.profile.strip_seller) {
        //if seller not connected, return a 400 error
        return res.status('400').json({
            error: "Please connect your Stripe account"
        })
    }
    //generate a stripe token
    stripe_auth.tokens.create({
        customer: req.order.payment_id,
        }, {
            stripeACCOUNT: req.profile.strip_seller.stripe_user_id,
        }).then((token) => {
            userStripe.charges.create({
                amount: req.body.amount * 100, //convert the amount in cents
                currency: 'usd',
                source: token.id,
            }, {
                stripeACCOUNT: req.profile.strip_seller.stripe_user_id,
            }).then((charge) => {
                next()
            })
        })
}




export default { 
    create, 
    userByID, 
    read, 
    list, 
    remove, 
    update,
    isSeller,
    stripe_auth,
    customer_Object,
    charge_Object,
}