import React, { useState, useEffect } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';

import auth from './../client/helpers/auth-helpers';
import {listByShop} from './../client/order/api-order';
import OrderEdit from './OrderEdit';

/** this component display the list of 
 * orders that have been received for a given shop**/




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
    customerDetails: {
        paddingLeft: '36px',
        paddingTop: '16px',
        backgroundColor:'#f8f8f8'
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
}))


export default function ShopOrders({match}) {
    const classes = useStyles()
    const [orders, setOrders] = useState([])
    const [open, setOpen] = useState([])


    // ----------- List orders. We will make a request to the backend API to list orders by shop
    /* Retrieve orders to the state in a useEffect hook from the database*/
    const jwt = auth.isAuthenticated()
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        listByShop({
            shopId: match.params.shopId
        }, {t: jwt.token}, signal).then((data) => {
            if (data.error) {
                console.log(data)
            } else {
                setOrders(data)
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    }, [])


    const handleClick = i => event => {
        setOpen(i)
    }



    //this method is passed as props to product edit component to update order status
    const updateOrders = (i, updateOrder) => {
        let updateOrders = orders
        updateOrders[i] = updateOrder
        setOrders([...updateOrders])
    }




    return <>
        <Grid container item xs={12}>
            <Grid item xs={12} sm={3}>
                <Typography variant="h6">Order in {match.params.shop}</Typography>
            </Grid>
        </Grid>
        <div className={classes.container}>
            {orders.map((order, i) => {
                return <span key={i}>
                    <GridList cellHeight={180} className={classes.gridList} cols={3}>
                        <ListItem button onClick={handleClick(i)}>
                            <ListItemText primary={'Order # '+order._id} secondary={(new Date(order.created)).toDateString()}/>
                            {open == i ? <ExpandLess /> : <ExpandMore />}
                        </ListItem><Divider/>
                        <Collapse component="li" in={open == i} timeout="auto" unmountOnExit>
                            {/* product order goes here*/}
                            <OrderEdit 
                                shopId={match.params.shopId}
                                order={order}
                                orderIndex={i}
                                updateOrders={updateOrders}
                            />
                            <div className={classes.customerDetails}>
                                <Typography type="subheading" component="h3" className={classes.subheading}>
                                    Deliver to:
                                </Typography>
                                <Typography 
                                    type="subheading" 
                                    component="h3" 
                                    color="primary"
                                ><strong>{order.customer_name}</strong> ({order.customer_email})
                                </Typography>
                                <Typography 
                                    type="subheading" 
                                    component="h3" 
                                    color="primary"
                                >{order.delivery_address.street}
                                </Typography>
                                <Typography
                                    type="subheading" 
                                    component="h3" 
                                    color="primary"
                                >{order.delivery_address.city}, {order.delivery_address.state} {order.delivery_address.zipcode}
                                </Typography>
                                <Typography 
                                    type="subheading" 
                                    component="h3" 
                                    color="primary"
                                >{order.delivery_address.country}
                                </Typography><br/>
                            </div>
                        </Collapse>
                    </GridList>
                </span>
            })}
        </div>
        
    </>
}

