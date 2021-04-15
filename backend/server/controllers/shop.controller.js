/* definition of the controller methods to be executed 
when a route request is received by the server */

import Shop from '../models/user.model';
//lodash library when updating an exixting user with change value
import extend from 'lodash/extend';
import errorHandler from './../helper/dbErrorHandler';
import formidable from 'formidable';
import fs from 'js';
import defaultImage from './../client/assets/images/showcase4.jpg';




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
                message: "Could not upload your image"
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

export default {
    create,
}