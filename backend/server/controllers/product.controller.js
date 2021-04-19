/* definition of the controller methods to be executed 
when a route request is received by the server */

import Product from '../models/product.model';
//lodash library when updating an exixting user with change value
import extend from 'lodash/extend';
import errorHandler from './../helper/dbErrorHandler';
import formidable from 'formidable';
import fs from 'fs';
import defaultImage from '../../../frontend/client/assets/images/showcase4.jpg';




// ----------- Creating method for a product
/* this function verify that the current user is the shop 
owner before creating a new product in the database */
const create = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    // parsing a file upload
    form.parse(req, async(err, fields, files) => {
        if (err) {
            res.status(400).json({
                message: "Could not upload product image"
            })
        }
        let product = new Product(fields)
        product.owner = req.shop
        if(files.photo) {
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type 
        }
        try {
            let result = await product.save()
            res.status(200).json(result)
        } catch (err){
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}


// ----------- Listing all product of specific shop
/* this method will query Product collection, and return the product matching the given shop */

const listByShop = async (req, res) => {
    try {
        let products = await Product.find({shop: req.shop._id}).populate('shop', '_id name').select('-photo')
        res.json(products)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// ----------- Find all products of specific shop
/* this method sort the list of products in the database, and return the first 5 product from the list */

const latestItem = async (req, res) => {
    try {
        let items = await Product.find({}).sort('-created').limit(5).populate('shop', '_id name').exec()
        res.json(items)
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


// -----------retrieve related products from the Database
/* this method will return all related products by id*/
const listRelated =  async (req, res) => {
    try {
        let items = await Product.find({"_id": {"$ne": req.product}, "category": req.product.category}).limit(5).populate('shop', '_id name').exec()
        res.json(items)
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}



// -----------retrieve products from the Database
/* this method will return all products by id*/
const productByID = async (req, res, next, id) => {
    try {
        let item = await (await Product.findById(id)).populate('shop', '_id name').exec()
        if (!item)
          return res.status('400').json({
              error: "No item found in the database"
          })
        req.item = item
        next()
    } catch(err) {
        return res.status('400').json({
            error: "The system could not retrieve item"
        })
    }
}


// -----------retrieve a single product from the Database
/* this method queries the Product collection with ID and return a single products*/
const read = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}




export default {
    create,
    read,
    listByShop,
    latestItem,
    listRelated,
    productByID,

}