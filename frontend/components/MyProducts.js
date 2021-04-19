/* products component for shop owners */
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import InfoIcon from '@material-ui/icons/Info';
import {Link} from "react-router-dom";
import { listByShop } from "../client/api-fetching/product/api-product";



const useStyles = makeStyles(theme => ({
    products: {
        paddingTop: '80px',
        paddingBottom: '30px',
    },
    addButton:{
        float:'right'
    },
    leftIcon: {
        marginRight: "8px"
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle,
        fontSize: '1.2em'
    },
    subheading: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    cover: {
        width: 110,
        height: 100,
        margin: '8px'
    },
    details: {
        padding: '10px'
    },

}))


export default function MyProducts(props) {
    const classes = useStyles()
    const [products, setProducts] = useState([])
    
    //loading relevant items in a state with an useEffect hook using listByShop fetch method
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listByShop({
            shopId: props.shopId
        }, signal).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    },  [])

    //removing the items
    const removeItem = (product) => {
        const updatedProducts = [...products]
        const idx = updatedProducts.indexOf(product)
        updatedProducts.splice(idx, 1)
        setProducts(updatedProducts)
    }

    return (
        <div>
            <Container component="main" maxWidth="xs" id="product">
                <Grid item xs={12} sm={6}>
                    <Typography type="title" className={classes.title}>
                         Products
                         <Link to={"/seller/"+props.shopId+"/products/new"}>
                             <Button color="primary" variant="contained">
                                <AddCircleIcon /> Add Product
                             </Button>
                         </Link>
                    </Typography>
                </Grid>
                <Grid container spacing={4}>
                    {products.map((product, i) => {
                        return (
                            <Grid key={i} item xs={12} sm={6} md={4}>
                                <img src={'/api/product/image'+product._id+"?" + new Date().getTime()} alt={product.name} />
                                <div className={classes.details}>
                                    <Grid item xs={6} sm={3}>
                                        <Typography type="headline" component="h2" color="primary" className={classes.productTitle}>
                                            {product.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography type="subheading" component="h4" className={classes.subheading}>
                                            Qty: {product.quantity} | Price: ${product.price}
                                        </Typography>
                                    </Grid>
                                </div>
                                <ListItemSecondaryAction>
                                    <Link to={"/seller/"+product.shop._id+"/"+product._id+"/edit"}>
                                        <IconButton aria-label="edit-produit" color="color">
                                            <EditSharpIcon />
                                        </IconButton>
                                    </Link>
                                </ListItemSecondaryAction>
                            </Grid>
                            
                        );
                        <Divider />
                    })}
                </Grid>
            </Container>
        </div>
    )
};