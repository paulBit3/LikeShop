/* products component for shop owners */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import CardMedia from '@material-ui/core/CardMedia'
import Box from '@material-ui/core/Box';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar';
import InfoIcon from '@material-ui/icons/Info';
import {Link} from "react-router-dom";
import { read, listRelated } from "../client/api-fetching/product/api-product";
import Suggestions from './Suggestions';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 30,
    },
    flex:{
        display: 'flex'
    },
    leftIcon: {
        marginRight: "8px"
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle,
        fontSize: '1.2em'
    },
    link:{
        color: '#d87f2b',
        fontSize: '0.9em'
    },
    subheading: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    media: {
        height: 200,
        display: 'inline-block',
        width: '50%',
        marginLeft: '24px'
    },
    cover: {
        width: 110,
        height: 100,
        margin: '8px'
    },
    details: {
        padding: '10px'
    },
    price: {
        display: 'inline',
        lineHeight: '3',
        paddingLeft: '8px',
        fontSize: '48px',
        fontWeight: '100',
        color: theme.palette.text.secondary
    },
    addCart: {
        width: '35px',
        height: '35px',
        padding: '10px 12px',
        borderRadius: '0.25em',
        backgroundColor: '#5f7c8b'
    },
    action: {
        margin: '8px 24px',
        display: 'inline-block'
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 'auto'
    },

}))




export default function Product({match}) {
    const classes = useStyles()
    const [product, setProduct] = useState({shop:{}})
    const [suggestions, setSuggestions] = useState([])
    const[error, setError] = useState('')


    //retrieve the specific item and set it to state with a useEffect hook using read fetch method
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read({
            productId: match.params.productId
        }, signal).then((data) => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    },  [match.params.productId])


    //getting the list of related items and set it to state with a useEffect hook using listRelated fetch method
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listRelated({
            productId: match.params.productId
        }, signal).then((data) => {
            if (data.error) {
                setError(data.error)
            } else {
                setSuggestions(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    },  [match.params.productId])

    
    // retrieving the image url
    const imageUrl = product._id
    ? `/api/product/image/${product._id}?${new Date().getTime()}`
    : `/api/product/defaultphoto`

    // retrieving shop logo url
    const logoUrl = shop._id
      ? `/api/shops/logo/${shop._id}?${new Date().getTime()}`
      : `/api/shops/defaultphoto`



    return (
        <div className={classes.root}>
            <Container component="main" maxWidth="xs" id="product">
                <Grid item xs={12}>
                    <Link to={'/shops/'+product.shop._id} className={classes.link}>
                        <Avatar src={logoUrl} className={classes.bigAvatar}/> {product.shop.name}
                    </Link>
                </Grid> <br/>
                <Grid container spacing={10}>
                    <Grid item xs={12} sm={6}>
                        <Typography type="headline" variant="h3" component="h3" color="primary" className={classes.productTitle}>
                            {product.name}
                        </Typography> <br/>
                        <span>{product.quantity> 0? 'In Stock':'Out of Stock'} </span>
                        {/* implementing Add to Cart here */}
                        <div className={classes.flex}>
                            <Grid item xs={6} sm={3}>
                                <CardMedia 
                                  className={classes.media}
                                  image={imageUrl}
                                  title={product.name}
                                />
                                <Typography component="p" variant="subtitle1" color="primary" className={classes.subheading}>
                                    {product.description} <br/>
                                    <span className={classes.price}>$ {product.price}</span>
                                </Typography>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
};
