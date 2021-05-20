import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import { MenuItem, Grid, TextField, List, ListItem, ListItemText, Typography, Divider } from "@material-ui/core";

import auth from './../client/helpers/auth-helpers';
import {getStatusValues, update, cancelProduct, processCharge} from './../client/order/api-order';
import ItemOrderEdit from './ItemOrderEdit';

/** this component takes an order object as a prop, iterate through order's products array
 * to display only the items that has been purchased from the current shop**/



 const useStyles = makeStyles(theme => ({
    nested: {
      paddingLeft: theme.spacing(4),
      paddingBottom: 0
    },
    listImg: {
      width: '70px',
      verticalAlign: 'top',
      marginRight: '10px'
    },
    listDetails: {
      display: "inline-block"
    },
    listQty: {
      margin: 0,
      fontSize: '0.9em',
      color: '#5f7c8b'
    },
    textField: {
      width: '160px',
      marginRight: '16px'
    },
    statusMessage: {
      position: 'absolute',
      zIndex: '12',
      right: '5px',
      padding: '5px'
    }
}))

export default function ItemOrderEdit(props){
    const classes = useStyles()
    const [values, setValues] = useState({
        open: 0,
        status: [],
        error: ''
    })

    const jwt = auth.isAuthenticated()

    //retrieve the list of order status values from the server using useffect hook
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        getStatusValues(signal).then((data) => {
            if (data.error) {
                setValues({...values, error: "Something went wrong! Could not get status of this order"})
            } else {
                setValues({...values, statusValues: data, error: ''})
            }
        })

        return function cleanup(){
            //abort the fetch call when the component unmounts
            abortController.abort()
        }
    }, [])


    //Updating a status of an order product. this method will update the orders in the state
    const handleStatusChange = itemIndex => e => {
        let order = props.order
        order.products[itemIndex].status = e.target.value
        let item = order.products[itemIndex]

        //cancelled order
        if(e.target.value == "Cancelled") {
            //calling the cancel product API
            cancelProduct({
                shopId: props.shop,
                productId: item.product._id
            }, {
                t: jwt.token
            }, {
                cartItemId: item._id,
                status: e.target.value,
                qty: item.quantity
            })
            .then((data) => {
                if (data.error) {
                    setValues({...values, error: "Something wrong! Try again."})
                } else {
                    props.updateOrders(props.itemIndex, order)
                    setValues({...values, error: ""})
                }
            })
            //order processing
        } else if (e.target.value == "Processing") {
            //calling the process charge API
            processCharge({
                userId: jwt.user._id,
                shopId: props.shopId,
                orderId: order._id
            }, {
                t: jwt.token
            }, {
                cartItemId: item._id,
                status: e.target.value,
                amount: (item.quantity * item.product.price)
            })
            .then((data) => {
                if (data.error) {
                    setValues({...values, error: "Something wrong! Try again."})
                } else {
                    props.updateOrders(props.itemIndex, order)
                    setValues({...values, error: ""})
                }
            })
            //updating the order
        } else {
            update({
                shopId: props.shopId
            }, {
                t: jwt.token
            }, {
                cartItemId: item._id,
                status: e.target.value
            })
            .then((data) => {
                if (data.error) {
                    setValues({...values, error: "Something wrong! Try again."})
                } else {
                    props.updateOrders(props.itemIndex, order)
                    setValues({...values, error: ""})
                }
            })
        }
    }

    return <>
        <Grid container item xs={12}>
            <Grid item xs={12} sm={3}>
                <Typography component="span" color="error" className={classes.statusMessage}>
                    {values.error}
                </Typography>
            </Grid>
        </Grid>
        <div className={classes.container}>
            <Grid item xs={12}>
                <List disablePadding style={{backgroundColor:'#f8f8f8'}}>
                    {props.orders.products.map((item, i) => {
                        return <span key={i}>
                            { item.shop == props.shopId &&
                              <ListItem button className={classes.nested}>
                                <ListItemText
                                  primary={ <div>
                                            <img className={classes.listImg} src={'/api/product/image/'+item.product._id}/>
                                            <div className={classes.listDetails}>
                                            {item.product.name}
                                            <p className={classes.listQty}>{"Qty: "+item.quantity}</p>
                                            </div>
                                          </div>
                                        }
                                />
                                <TextField
                                    id="select-status"
                                    select
                                    label="Order Status"
                                    className={classes.textField}
                                    value={item.status}
                                    onChange={handleStatusChange(i)}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    margin="dense"
                                >
                                    {values.statusValues.map(option => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                              </ListItem>
                            }
                            <Divider style={{margin: 'auto', width: "80%"}}/>
                        </span>
                    })}
                </List>
            </Grid>
        </div>
    </>
}

ItemOrderEdit.propTypes = {
    shopId: PropTypes.string.isRequired,
    order: PropTypes.object.isRequired,
    orderIndex: PropTypes.number.isRequired,
    updateOrders: PropTypes.func.isRequired
}


