/* definition of the controller methods to be executed 
when a route request is received by the server */

import Shop from '../models/user.model';
//lodash library when updating an exixting user with change value
import extend from 'lodash/extend';
import errorHandler from './../helper/dbErrorHandler';
import formidable from 'formidable';
import fs from 'fs';
import defaultImage from '../../../frontend/client/assets/images/showcase4.jpg';




// ----------- Creating method for a shop
/* this function is invoked after a seller is verified, and uses the formidable node module *
   to parse the multipart, if image is uploaded by a user for the shop logo */
const create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    // parsing a file upload
    form.parse(req, async(err, fields, files) => {
        if (err) {
            res.status(400).json({
                message: "Could not upload shop image"
            })
        }
        let shop = new Shop(fields)
        shop.owner = req.profile
        if(files.photo) {
            shop.photo.data = fs.readFileSync(files.photo.path)
            shop.photo.contentType = files.photo.type 
        }
        try {
            let result = await shop.save()
            res.status(200).json(result)
        } catch (err){
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}


// ----------- Listing all shops
//the list controller method will return all shops from our database
const list = async (req, res) => {
    try {
        let shops = await Shop.find()
        //return users as JSON objects
        res.json(shops)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


// ----------- Listing all shops of specific owner
/* the list controller method will 1st ensure user is signed, and 
   is also the authorized owner, and will return all shops of specific owner*/

const listByOwner = async (req, res) => {
    try {
        let shops = await Shop.find({owner: req.profile._id}).populate('owner', '_id name')
        res.json(shops)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// ----------- Retrieve the shop from the database
/* this method will return all shops by ID*/
const shopByID = async (req, res, next, id) => {
    try {
        let shop = await Shop.findById(id).populate('owner', '_id name').exec()
        if (!shop)
          return res.status('400').json({
              error: "No Shop found in the database "
          })
          req.shop = shop
          next()
    } catch (err) {
        return res.status('400').json({
            error: "The System could not retrive shop"
        })
    }
}


//define a default shop photo
const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd() +defaultImage)
}


// ----------- Read the shop from the database
/* this method controller return a shop object in respnse to the client*/
const read = (req, res) => {
    req.shop.photo = undefined
    //we removed photo field before sending response to 
    //client because photo is retrieved in a separate route
    return res.json(req.shop)
}


// ----------- Update the shop from the database
/* this method use formidable and fs module to parse form data and update existing shop */
const update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(400).json({
                message: "Photo could not be uploaded"
            })
        }
        let shop = req.shop
        shop = extend(shop, fields)
        shop.updated =  Date.now()
        if (files.photo) {
            shop.photo.data = fs.readFileSync(files.photo.path)
            shop.photo.contentType = files.photo.type
        }
        try {
            let result = await shop.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}



// ----------- Edit the shop in the database
/* this method controller check if the signed user is the owner of the shop, before Edit it*/
const isOwner = (req, res, next) => {
    const isOwner = req.shop && req.auth && req.shop.owner._id == req.auth._id
    if (!isOwner) {
        return res.status('403').json({
            error: "You are not authorized"
        })
    }
    next()
}


// ----------- Removing a shop in the database
/* this method controller check if the signed user is the owner of the shop, then remove it*/
const remove = async (req, res) => {
    try {
        let shop = req.shop
        let removedShop = shop.remove()
        res.json(removedShop)
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}





export default {
    create,
    list,
    listByOwner,
    shopByID,
    defaultPhoto,
    read,
    update,
    isOwner,
    remove,
}