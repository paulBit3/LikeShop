import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
//import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import DisabledCartIcon from '@material-ui/icons/RemoveShoppingCart'
import { Box, Typography, IconButton, Container, Card, CardContent, Grid } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import cart from './../client/helpers/cart-helpers';


/* Style declaration to define css styles(CSS-in-JS) for the component.
    makeStyles is a custom React hook API */
const useStyles = makeStyles(theme => ({
    IconButton: {
        width: '28px',
        height: '28px',
    },
     disableIconButton: {
        color: '#7f7563',
        width: '28px',
        height: '28px'
    },
}))




// this method will take a product object and CSS style as a props
export default function AddToCart(props) {
    const classes = useStyles();
    const [redirect, setRedirect] = useState(false);

    //this method invokes the additem helper method
    const addToCart = () => {
        cart.addItem(props.item, () => {
            setRedirect({redirect:true})
        })
    }

    if (redirect) {
        return (<Return to={'/cart'}/>)
    }

    return (
        <div>
            <span>
                {props.item.quantity >= 0?
                 <IconButton color="secondary" dense="dense" onClick={addToCart}>
                    <AddShoppingCartIcon className={props.cartStyle || classes.IconButton}/>
                 </IconButton> :
                  <IconButton disable={true} color="secondary" dense="dense">
                    <DisabledCartIcon className={props.cartStyle || classes.disableIconButton}/>
                  </IconButton>
                }
            </span>
        </div>
    )
}

AddToCart.propTypes = {
    item: PropTypes.object.isRequired,
    cartStyle: PropTypes.string
}