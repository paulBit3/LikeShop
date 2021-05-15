/* Order API .
**/
/* these methods provide functionalities to fetch API endpoints */



//this take the checlout details, card token, user credentials as parameters
const create = async (params, credentials, order, token) => {
    try {
      let response = await fetch('/api/orders/'+params.userId, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          },
          body: JSON.stringify({order: order, token:token})
        })
        return response.json()
      }catch(err) {
        console.log(err)
      }
}


/*---this method uses fetch to make a GET request and return orders 
  in a shop , using the list by shop API*/
const listByShop = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/orders/shop/'+params.shopId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return response.json()
  }catch(err){
    console.log(err)
  }
}


// ----------- Update the product from the database
const update = async (params, credentials, product) => {
  try {
    let response = await fetch('/api/order/status/' + params.shopId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(product)
    })
    return response.json()
  } catch(err){
    console.log(err)
  }
}



// ----------- Canceling a specific order or product related to a shop from the database
const cancelProduct = async (params, credentials, product) => {
  try {
    let response = await fetch('/api/order/'+params.shopId+'/cancel/'+params.productId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(product)
    })
    return response.json()
  }catch(err){
    console.log(err)
  }
}


//processing a charge against items in the cart
const processCharge = async (params, credentials, product) => {
  try {
    let response = await fetch('/api/order/'+params.orderId+'/charge/'+params.userId+'/'+params.shopId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(product)
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }
}


//get a order status
const getStatusValues = async (signal) => {
  try {
    let response = await fetch('/api/order/status_values', {
      method: 'GET',
      signal: signal
    })
    return response.json()
  }catch(err) { 
    console.log(err)
  }
}


//list orders related to a user
const listByUser = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/orders/user/'+params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return response.json()
  }catch(err) {
    console.log(err)
  }
}


//read a order placed in cart
const read = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/order/' + params.orderId, {
      method: 'GET',
      signal: signal
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  create,
  listByShop,
  update,
  cancelProduct,
  processCharge,
  getStatusValues,
  listByUser,
  read
}

