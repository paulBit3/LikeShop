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


// -----------retrieve all categories products from the Database
/* this method retrieve distinct categories in Product collection and return a array of unique categories*/
const listCategories = async (req, res) => {
    try {
        let items = await Product.distinct('category', {})
        res.json(items)
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


// -----------processing a query parameter
/* this method process a query parameter in a request to find a product 
in a given  category. if any , with names taht partially match with the provided search text*/
const list = async (req, res) => {
    const query = {}
    if (req.query.search)
       query.name = {'$regex': req.query.serach, '$options': "i"}
    if (req.query.category && req.query.category != 'All')
       query.category = req.query.category
    try {
        let items = await Product.find(query).populate('shop', '_id name').select('-photo').exec()
        res.json(items)
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


// -----------decrease products stock quantity
/* this method will decrease the stock qty when an order is placed. This will automatically reflect
the updated QTY of the products in the shops after on order is placed*/
const decreaseQty = async (req, res, next) => {
    let bulkOps = req.body.order.products.map((item) => {
        return {
            "updateOne": {
                "filter": { "_id": item.product._id},
                "update": { "$inc": {"quantity": -item.quantity}}
            }
        }
    })
    try {
        await Product.bulkWrite(bulkOps, {})
        next()
    } catch (err) {
        return res.status(400).json({
            error: "An error occurred. update rejected"
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


// ----------- Update the product from the database
/* this method use formidable and fs module to parse form data and update existing product */
const update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(400).json({
                message: "Photo could not be uploaded"
            })
        }
        let item = req.item
        item = extend(item, fields)
        item.updated =  Date.now()
        if (files.photo) {
            item.photo.data = fs.readFileSync(files.photo.path)
            item.photo.contentType = files.photo.type
        }
        try {
            let result = await item.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}



// ----------- Removing a product from the database
/* this method controller check if 
the signed user is the owner of the shop, then remove a product*/
const remove = async (req, res) => {
    try {
        let item = req.item
        let removedItem = await item.remove()
        res.json(removedItem)
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}




export default {
    create,
    read,
    update,
    remove,
    listByShop,
    latestItem,
    listRelated,
    listCategories,
    list,
    productByID,

}