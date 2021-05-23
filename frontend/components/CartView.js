import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {StripeProvider} from '@stripe/react-stripe-js';
import config from './../../config/config';

import CartItems from './CartItems';
import Checkout from './Checkout';




/* This component will contain the cart items and checkout details */


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 30,
    }
}))



export default function Cart () {
    const classes = useStyles()
    const [checkout, setCheckout] = useState(false)

    //method to update checkout value
    const showCheckout = val => {
        setCheckout(val);
    };



    return (
        <div className={classes.root}>
            <Grid container spacing={8}>
                <Grid item xs={6} sm={6}>
                    <CartItems checkout={checkout}
                               setCheckout={showCheckout}/>
                </Grid>
                {checkout && 
                    <Grid item xs={6} sm={6}>
                        {/**implementing Stripe payment here */}
                        <StripeProvider apiKey={config.stripe_pub_secret_key}>
                            <Checkout />
                        </StripeProvider>
                    </Grid>
                }
            </Grid>
        </div>
    )
}