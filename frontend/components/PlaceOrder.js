import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

/* Element components provide a flexible way to securely collect payment information */
//import {CardCvcElement, CardNumberElement, CardExpiryElement } from '@stripe/react-stripe-js';
import {CardElement, injectStripe} from '@stripe/react-stripe-js';

import {Redirect} from 'react-router-dom';

import auth from './../client/helpers/auth-helpers';
import cart from './../client/helpers/cart-helpers';
import {create} from './../client/order/api-order';

/** this component contain credit card details and button for user to place order
 * we will use the injectStripe higher-order component(HOC) from stripe to wrap this component**/





 const useStyles = makeStyles(theme => ({
    subheading: {
      color: 'rgba(88, 114, 128, 0.87)',
      marginTop: "20px",
    },
    checkout: {
      float: 'right',
      margin: '20px 30px'
    },
    error: {
      display: 'inline',
      padding: "0px 10px"
    },
    errorIcon: {
      verticalAlign: 'middle'
    },
    StripeElement: {
      display: 'block',
      margin: '24px 0 10px 10px',
      maxWidth: '408px',
      padding: '10px 14px',
      boxShadow: 'rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px',
      borderRadius: '4px',
      background: 'white'
    }
}))

const PlaceOrder = (props) => {
    const classes = useStyles()
    const [values, setValues] = useState({
        order: {},
        error: '',
        redirect: false,
        orderId: ''
    })

    //this method will tokenize the card detail using stripe.createToekn
    const placeOrder = () => {
        props.stripe.createToken().then(payload => {
            if (payload.error) {
                setValues({...values, error: payload.error.message})
            } else {
                const jwt = auth.isAuthenticated()
                create({userId: jwt.user._id}, {
                    t: jwt.token
                }, props.checkoutDetails, payload.token.id).then((data) => {
                    if (data.error) {
                        setValues({...values, error: data.error})
                    } else {
                        cart.emptyCart(() => {
                            setValues({...values, 'orderId': data._id, 'redirect': true})
                        })
                    }
                })
            }
        })
    }

    if (values.redirect) {
        return (<Redirect  to={'/order/' + values.orderId}/>)
    }


    return (<span>
        <Typography type="subheading" component="h3" className={classes.subheading}>
            Card Details
        </Typography>
        {/* using the Stripe CardElement */}
        <CardElement
            options={{
                style: {
                base: {
                    fontSize: '16px',
                    fontFamily: 'Source Code Pro, Menlo, monospace',
                    color: '#424770',
                    '::placeholder': {
                    color: '#aab7c4',
                    },
                },
                invalid: {
                    color: '#9e2146',
                },
                },
            }}
        />
        <div className={classes.checkout}>
            { values.error &&
            (<Typography component="span" color="error" className={classes.error}>
                <Icon color="error" className={classes.error}>error</Icon>
                {values.error}
            </Typography>)
            }
            <Button color="secondary" variant="contained" onClick={placeOrder}>Place your order</Button>
        </div>
    </span>)
}

PlaceOrder.propTypes = {
    checkoutDetails: PropTypes.object.isRequired
}

//wrapping it with the injectStripe higher-order component(HOC)
export default injectStripe(PlaceOrder)

