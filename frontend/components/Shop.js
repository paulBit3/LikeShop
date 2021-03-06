import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {read} from "./../client/api-fetching/shop/api-shop";
import Products from './Products';
import {listByShop} from "./../client/api-fetching/product/api-product";
import { Box, Typography, IconButton, Container, Card, CardContent, Grid } from '@material-ui/core';




/* Style declaration to define css styles(CSS-in-JS) for the component.
    makeStyles is a custom React hook API */
const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        flexGrow: 2,
        margin: 30,
    }),
    title: {
        margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.protectedTitle,
        textAlign: 'center',
        fontSize: '1.2em'
    },
    card: {
        textAlign: 'center',
        paddingBottom: theme.spacing(2)
    },
    subheading: {
        marginTop: theme.spacing(1),
        color: theme.palette.openTitle
    },
    bigAvatar: {
        width: 100,
        height: 100,
        margin: 'auto'
    },
    productTitle: {
        padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        width: '100%',
        fontSize: '1.2em'
    }
}))


//our copyright function
function Copyright(){
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright ©'}
            <Link color="inherit" href="/">Oficy Inc.
            </Link>{''}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function Shops(){
    const classes = useStyles()
    const [shop, setShop] = useState('')
    const [products, setProducts] = useState([])
    const [error, setError] = useState('')
  
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
       
        //calling the list by shop API to retrieve relevant products
        listByShop({
            shopId: match.params.shopId
        }, signal).then((data) => {
            if (data.error) {
                setError(data.error)
            } else {
                setProducts(data)
            }
        })

        //calling the read API to retrieve the shop details
        read({
            shopId: match.params.shopId
            }, signal).then((data) => {
            if (data.error) {
                setError(data.error)
            } else {
                setShop(data)
            }
        })

        return function cleanup(){
            abortController.abort()
        }
    
    }, [match.params.shopId])




    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
       
        //calling the list by shop API to retrieve relevant products
        listByShop({
            shopId: match.params.shopId
        }, signal).then((data) => {
            if (data.error) {
                setError(data.error)
            } else {
                setProducts(data)
            }
        })
        

        return function cleanup(){
            abortController.abort()
        }
    
    }, [match.params.shopId])

    // retrieving the logo url
    const logUrl = shop._id
          ? `/api/shops/logo/${shop._id}?${new Date().getTime()}`
          : `/api/shops/defaultphoto`

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.root}>
                <Grid container spacing={8}>
                    <Grid item xs={4} sm={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography type="headline" className={classes.title}>
                                    {shop.name}
                                </Typography>
                                <br/>
                                <Avatar src={logUrl} className={classes.bigAvatar}/> 
                                <br/>
                                <Typography type="subheading" component="h2" className={classes.subheading}>
                                    {shop.description}
                                </Typography> 
                                <br/>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* implementing product here */}
                    <Grid item xs={8} sm={8}>
                        <Card>
                            <Typography type="title" component="h2" className={classes.productTitle}>Products</Typography>
                            <Products products={products} searched={false}/>
                        </Card>
                    </Grid>
                </Grid>

            </div>
            {/* calling copyright function here */}
            <Box mt={5}><Copyright /></Box>
        </Container>
    )

}
