import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {Elements} from '@stripe/react-stripe-js';
//import {Elements} from 'react-stripe-elements';

import auth from './../client/helpers/auth-helpers';
import cart from './../client/helpers/cart-helpers';
import PlaceOrder from './PlaceOrder';

/* This component will collect buyer(customer) data that have item added to the cart, and then placing the order.*/



const useStyles = makeStyles(theme => ({
    card: {
      margin: '24px 0px',
      padding: '16px 40px 90px 40px',
      backgroundColor: '#80808017'
    },
    title: {
      margin: '24px 16px 8px 0px',
      color: theme.palette.openTitle
    },
    subheading: {
      color: 'rgba(88, 114, 128, 0.87)',
      marginTop: "20px",
    },
    addressField: {
      marginTop: "4px",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "45%"
    },
    streetField: {
      marginTop: "4px",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "93%"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "90%"
    }
}))



export default function Checkout() {
    const classes = useStyles()
    const user = auth.isAuthenticated().user

    //initializing checkout detaisl
    const [values, setValues] = useState({
        checkoutDetails: {
            products: cart.getCart(),
            customer_name: user.name,
            customer_email: user.email,
            delivery_address: { street: '', city:'', state:'', zipcode:'', country:''}
        },
        error: ''
    })
    
    //getting cards logo
    const cardsLogo = [
        "amex",
        "discover",
        "mastercard",
        "visa",
    ];

    
    const handleInputChange = name => event => {
        let checkoutDetails = values.checkoutDetails
        checkoutDetails[name] = event.target.value || undefined
        setValues({...values, checkoutDetails: checkoutDetails})
    }

    const handleAddressChange = name => event => {
        let checkoutDetails = values.checkoutDetails
        checkoutDetails.delivery_address[name] = event.target.value || undefined
        setValues({...values, checkoutDetails: checkoutDetails})
    }

    return <>
        <Grid container item xs={12}>
            <Grid item xs={12} sm={3}>
                <Typography variant="h6">Payment Details</Typography>
            </Grid>
            <Grid container item xs={12} sm={9} justify="space-between">
                {cardsLogo.map(e => <img key={e} src={`./cards/${e}.png`} alt={e} width="50px" align="bottom" style={{ padding: "0 5px" }} />)}
            </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                id="name"
                label="Name"
                name="name"
                variant="outlined"
                value={values.checkoutDetails.customer_name}
                onChange={handleInputChange('customer_name')}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                id="email"
                label="Email"
                name="email"
                variant="outlined"
                value={values.checkoutDetails.customer_email}
                onChange={handleInputChange('customer_email')}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
        <Typography type="subheading" component="h3" className={classes.subheading}>
            Delivery Address
        </Typography>
        <Grid item xs={12} sm={6}>
            <TextField
                id="street"
                label="Street"
                name="street"
                variant="outlined"
                value={values.checkoutDetails.delivery_address.street}
                onChange={handleAddressChange('street')}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
        <Grid item xs={6} sm={3}>
            <TextField
                id="city"
                label="City"
                name="city"
                variant="outlined"
                value={values.checkoutDetails.delivery_address.city}
                onChange={handleAddressChange('city')}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
        <Grid item xs={6} sm={3}>
            <TextField
                id="state"
                label="State"
                name="state"
                variant="outlined"
                value={values.checkoutDetails.delivery_address.state}
                onChange={handleAddressChange('state')}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
        <Grid item xs={6} sm={3}>
            <TextField
                id="zipcode"
                label="Zip Code"
                name="street"
                variant="outlined"
                value={values.checkoutDetails.delivery_address.zipcode}
                onChange={handleAddressChange('zipcode')}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
        <Grid item xs={6} sm={3}>
            <TextField
                id="country"
                label="Country"
                name="country"
                variant="outlined"
                value={values.checkoutDetails.delivery_address.country}
                onChange={handleAddressChange('country')}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
        <br/>{
            values.error && (<Typography component="p" color="error">
                <Icon color="error" className={classes.error}>error</Icon>
                {values.error}
            </Typography>)
        }
        {/* Placing order */}
        <Elements>
            <PlaceOrder checkoutDetails={values.checkoutDetails} />
        </Elements>
    </>
}
