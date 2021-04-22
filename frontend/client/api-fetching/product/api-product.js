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


/*---this method uses fetch to make a GET request and return individual product details */
const read = async (params, signal) => {
    try {
        let res = await fetch('/api/products' +params.productId, {
            method: 'GET',
            signal: signal
        })
        return res.json()
    } catch(err) {
        console.log(err)
    }
}




/*---this method uses fetch to make a GET request and return product from a specific shops  */
const listByShop = async (params, signal) => {
    try {
        let res = await fetch('/api/products/by/'+params.shopId, {
            method: 'GET',
            signal: 'signal',
        })
        return res.json()
    } catch(err) {
        console.log(err)
    }
}



/*---this method uses fetch to make a GET request and return latest product */
const latestItem = async (signal) => {
    try {
        let res = await fetch('/api/products/lastest', {
            method: 'GET',
            signal: signal
        })
        return res.json()
    } catch(err) {
        console.log(err)
    }
}


/*---this method uses fetch call to populate the Suggestion component */
const listRelated = async (params,signal) => {
    try {
        let res = await fetch('api/products/related/'+params.productId, {
            method: 'GET',
            signal: signal
        })
        return res.json()
    } catch(err) {
        console.log(err)
    }
}




/* this method use the fetch method to retrieve distinct categories in Product collection */
const listCategories = async (signal) => {
    try {
        let res = await fetch('/api/products/categories', {
            method: 'GET',
            signal: signal
        })
        return res.json()
    } catch(err) {
        console.log(err)
    }
}


// -----------processing a query parameter
/* this API use teh fetch method to construct the query parameter 
   to search a product in a given  category.*/
const list = async (params, signal) => {
    const query = queryString.stringify(params)
    try {
        let res = await fetch('/api/products?'+query, {
            method: 'GET',
        })
        return res.json()
    } catch(err) {
        console.log(err)
    }
}


// ----------- Update the product from the database
/* This API uses a fetch method to send multipart form data with a PUT request
to the edit product API in the backend received at /api/products/by/:shopId */
const update = async (params, credentials, item) => {
    try {
        let res = await fetch('/api/product/' + params.shopId+'/'+params.productId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: item

        })
        return res.json()
    } catch(err) {
        console.log(err)
    }
}


// ----------- deleting product from the database
/* This method uses the fetch method for delete which 
makes the  DELETE request at /api/product/:shopId/:productId*/
const remove = async (params, credentials) => {
    try {
      let res = await fetch('/api/product/' + params.shopId +'/'+params.productId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return res.json()
    } catch(err) {
      console.log(err)
    }
  }



export {
    create,
    read,
    update,
    remove,
    listByShop,
    latestItem,
    listRelated,
    listCategories,
    list,
}