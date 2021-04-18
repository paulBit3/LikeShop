/* definition of the controller methods to be executed 
when a route request is received by the server */

import Product from '../models/user.model';
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

export default {
    create,
}