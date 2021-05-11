/*
this helper mwthod will be invoked by the addToCart method. 
This method takes product item as parameter and store update cart details in localstorage */



const cart = {
    //cart length method. it reads the cart array in localstorage
    itemTotal(){
        if (typeof window !== "undefined") {
            if (localStorage.getItem('cart')) {
                return JSON.parse(localStorage.getItem('cart')).length
            }
        }
        return 0
    },

    //add item method
    addItem(item, cb) {
        let cart = []
        if (typeof window !== "undefined") {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.push({
                product: item,
                quantity: 1,
                shop: item.shop._id
            })
            localStorage.setItem('cart',  JSON.stringify(cart))
            cb()
        }
    },

    //updating the cart
    updateCart(i, quantity){
        let cart = []
        if (typeof window !== "undefined") {
            if (localStorage.getItem('cart')) {
                cart = JSIN.parse(localStorage.getItem('cart'))
            }
            cart[i].quantity = quantity
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    },
    
    //retrieve the cart details stored in localStorage
    getCart() {
        if (typeof window !== "undefined") {
            if (localStorage.getItem('cart')) {
                return JSON.parse(localStorage.getItem('cart'))
            }
        }
        return []
    },

    //this method takes index of product to be remove
    //splices it out and updates localStorage before 
    //returning the updated cart array
    removeItem(i) {
        let cart = []
        if (typeof window !== "undefined") {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.splice(i, 1)
            localStorage.setItem('cart', JSON.stringify(cart))
        }
        return cart
    },

    //empty the cart
    emptyCart(cb) {
        if (typeof window !== "undefined") {
            localStorage.removeItem('cart')
            cb()
        }
    }
}
export default cart;

