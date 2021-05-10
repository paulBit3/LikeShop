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
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            background: theme.palette.background.paper,
            textAlign: 'left',
            padding: '0 8px'
        },
        container: {
            minWidth: '100%',
            paddingBottom: '14px'
        },
        gridList: {
            width: '100%',
            minHeight: 200,
            padding: '16px 0 10px'
        },
        title: {
            padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
            color: theme.palette.openTitle,
            width: '100%'
        },
        tile: {
            textAlign: 'center'
        },
        image: {
            height: '100%'
        },
        tileBar: {
            backgroundColor: 'rgba(0, 0, 0, 0.72)',
            textAlign: 'left'
        },
        tileTitle: {
            fontSize:'1.1em',
            marginBottom:'5px',
            color:'rgb(189, 222, 219)',
            display:'block'
        }
}))




// this method will take a product object and CSS style as a props
export default function AddToCart(props) {
    const classes = useStyles();
    const [redirect, setRedirect] = useState(false);

    const addToCart = () => {}
}