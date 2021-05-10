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
}
export default cart;

