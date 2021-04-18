/* these methods provide functionalities to fetch API endpoints */

// import { Component } from "react"
import queryString from 'query-string'

/*---the create method makes a post request and 
    pass it the multipart form data containing 
    details of the product, then fetch to make 
    POST request to create a new product */
    const create = async (params, credentials, product) => {
        try {
            let res = await fetch('/api/products/by/'+ params.shopId, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + credentials.t
                },
                body: product
            })
            return res.json()
        } catch(err) {
            console.log(err)
        }
    }

export {
    create,
}