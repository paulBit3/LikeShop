/* these methods provide functionalities to fetch API endpoints */

// import { Component } from "react"


/*---the create method makes a post request and 
    pass it the multipart form data containing 
    details of the new shop, then fetch to make 
    POST call at the create API route '/api/shops' */
const create = async (params, credentials, shop) => {
    try {
        let res = await fetch('/api/shops/by/'+ params.userId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: shop
        })
        return res.json()
    } catch(err) {
        console.log(err)
    }
}

/*---the lsit method uses fetch to make a GET request to the shop list API*/
const list = async (signal) => {
    try {
        let res = await fetch('/api/shops', {
            method: 'GET',
            signal: signal
        })
        return res.json()
    } catch(err) {
        console.log(err)
    }
}