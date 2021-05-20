import React, { useState, useEffect } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import Divider from '@material-ui/core/Divider';

import {read} from './../client/order/api-order';
import {Link} from 'react-router-dom';

/** this component display an order details that have been received for a given shop**/




 const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5)
    }),
    title: {
        margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px` ,
        color: theme.palette.protectedTitle,
        fontSize: '1.2em'
    },
    subheading: {
        marginTop: theme.spacing(1),
        color: '#434b4e',
        fontSize: '1.1em'
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
    cart: {
        textAlign: 'left',
        width: '100%',
        display: 'inline-flex'
    },
    details: {
        display: 'inline-block',
        width: "100%",
        padding: "4px"
    },
    content: {
        flex: '1 0 auto',
        padding: '16px 8px 0px'
    },
    cover: {
        width: 160,
        height: 125,
        margin: '8px'
    },
    info: {
        color: 'rgba(83, 170, 146, 0.82)',
        fontSize: '0.95rem',
        display: 'inline'
    },
    thanks:{
        color: 'rgb(136, 183, 107)',
        fontSize: '0.9rem',
        fontStyle: 'italic'
    },
    innerCardItems: {
        textAlign: 'left',
        margin: '24px 10px 24px 24px',
        padding: '24px 20px 40px 20px',
        backgroundColor: '#80808017'
    },
    innerCard: {
        textAlign: 'left',
        margin: '24px 24px 24px 10px',
        padding: '30px 45px 40px 45px',
        backgroundColor: '#80808017'
    },
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        color: theme.palette.protectedTitle,
        fontSize: '1.2em'
    },
    subheading: {
        marginTop: theme.spacing(1),
        color: theme.palette.openTitle
    },
    productTitle: {
        fontSize: '1.15em',
        marginBottom: '5px'
    },
    itemTotal: {
        float: 'right',
        marginRight: '40px',
        fontSize: '1.5em',
        color: 'rgb(72, 175, 148)'
    },
    itemShop: {
        display: 'block',
        fontSize: '1em',
        color: '#78948f'
    },
    checkout: {
        float: 'right',
        margin: '24px'
    },
    total: {
        fontSize: '1.2em',
        color: 'rgb(53, 97, 85)',
        marginRight: '16px',
        fontWeight: '600',
        verticalAlign: 'bottom'
    },
    image: {
        height: '100%'
    },
    tile: {
        textAlign: 'center'
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
    },
    
}))


export default function Order({match}) {
    const classes = useStyles()
    const [order, setOrder] = useState({
        products:[],
        delivery_address:{}
    })


    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        read({
            orderId: match.params.orderId
        }).then((data) => {
            if (data.error) {
                console.log(data)
            } else {
                setOrder(data)
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    }, [])


    //calculate the total price(qty, unitprice) of items cartItems array
    const getTotal = () => {
        return order.products.reduce((a, b) => {
            const quantity = b.status == "Cancelled" ? 0: b.quantity
            return a + (b.quantity*b.product.price)
        }, 0)
    }


    return <>
        <Grid container item xs={12}>
        <Typography type="headline" component="h3">View order details</Typography>
            <Grid item xs={12} sm={3}>
                <Typography type="subheading" component="h3" className={classes.subheading}>
                    Order date {(new Date(order.created)).toDateString()} <br/>
                    Order # <strong>{order._id}</strong> <br/>
                    Order Total: ${getTotal()}
                </Typography> <br/>
            </Grid>
        </Grid>
        <div className={classes.container}>
            <Grid container spacing={4}>
                <Grid item xs={7} sm={7}>
                    
                    <GridList cellHeight={180} className={classes.gridList} cols={3}>
                        {order.products.map((item, i) => { 
                            return <span>
                                <GridListTile key={i} className={classes.title}>
                                    <Link to={"/product/"+item.product._id}>
                                        <img 
                                            className={classes.image} 
                                            src={'/api/product/image'+item.product._id} 
                                            alt={item.product.name} 
                                        />
                                    </Link>
                                </GridListTile>
                                <div className={classes.details}>
                                    <Grid item xs={12} sm={6}>
                                         <Link to={"/product/"+item.product._id}>
                                             <Typography type="title" component="h3" className={classes.productTitle} color="primary">
                                                {item.product.name}
                                            </Typography>
                                        </Link>
                                        <Typography type="subheading" component="h3" className={classes.itemShop} color="primary">
                                            $ {item.product.price} x {item.quantity}
                                        </Typography>
                                        <span className={classes.itemTotal}>${item.product.price * item.quantity}</span>
                                        <span className={classes.itemShop}>Store: {item.shop.name}</span>
                                        <Typography 
                                            type="subheading" 
                                            component="h3" 
                                            color={item.status == "Cancelled" ? "error":"secondary"}
                                        >Status:<strong>{item.status}</strong>
                                        </Typography>
                                    </Grid>
                                </div></span> }
                        )}
                        <Grid item xs={6} sm={3}>
                            <div classNam={classes.checkout}>
                                <span className={classes.total}>
                                   <strong>Oder Total ${getTotal()}</strong> 
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={5} sm={5}>
                            <Typography type="subheading" component="h3" className={classes.productTitle} color="primary">
                                <strong>Deliver to</strong>
                            </Typography>
                            <Typography type="subheading" component="h4" className={classes.info} color="primary">
                                <strong>{order.customer_name}</strong>
                            </Typography>
                            <br/>
                            <Divider/>
                            <Typography type="subheading" component="h3" className={classes.productTitle} color="primary">
                                <strong>Shipping address</strong>
                            </Typography>
                            <Grid item xs={6} sm={3}>
                                <Typography type="subheading" component="h4" className={classes.itemShop} color="primary">
                                    {order.delivery_address.street}
                                </Typography>
                                <Typography type="subheading" component="h4" className={classes.itemShop} color="primary">
                                    {order.delivery_address.city} {order.delivery_address.state} {order.delivery_address.zipcode}
                                </Typography>
                                <Typography type="subheading" component="h4" className={classes.itemShop} color="primary">
                                    {order.delivery_address.country}
                                </Typography>
                            </Grid>

                        </Grid>
                    </GridList>
                        
                    
                </Grid>
            </Grid>
        </div>
        
    </>
}

