/* this component will handled method to delete a user via profile component */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import auth from './../client/helpers/auth-helpers';
import {remove} from './../client/api-fetching/shop/api-shop';
import { IconButton } from '@material-ui/core';
import { Redirect } from 'react-router-dom';


/* our delete user function. this component will receive props from the parent component.
props will contain the userId that was sent from profile component */
export default function DeleteShop(props) {
    //initialize the state with open set to false
    const [open, setOpen] = useState(false)


    const jwt = auth.isAuthenticated()

    //handler method to open and close the dialog button.
    const clickButton = () => {
        setOpen(true)
    }


    //this function calls the remove fetch method with the user Id
    const removeShop = () => {
        remove({
            shopId: props.shop._id
        }, {t: jwt.token}).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                //if successfully deleted
                // auth.clearJWT(() => console.log('deleted'))
                // setRedirect(true)
                setOpen(false)
                props.onRemove(props.shop)
            }
        })
    }

    //handler method to close the dialog button
    const handlerDialogClose = () => {
        setOpen(false)
    }

    //redirecting the current user to header page
    if (redirect) {
        return <Redirect to='/'/>
    }

    return (<span>
        <IconButton aria-label="Delete" onClick={ clickButton } color="secondary">
            <HighlightOffTwoToneIcon />
        </IconButton>
        <Dialog open={open} onClose={ handlerDialogClose}>
            <DialogTitle>{" Delete "+props.shop.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Confirm to delete your shop {props.shop.name}.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handlerDialogClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={removeShop} color="secondary" autoFocus="autoFocus">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    </span>)
}

//validating props with PropTypes
DeleteShop.propTypes = {
    shop: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
}