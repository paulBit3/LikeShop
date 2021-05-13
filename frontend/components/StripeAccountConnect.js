import React , { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import queryString from 'query-string';

import auth from './../client/helpers/auth-helpers';
import {stripeUpdate} from "./../client/api-fetching/api-user.js"


const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 450,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5)
    }),
    title: {
        margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
        color: theme.palette.protectedTitle,
        fontSize: '1.1em'
    },
    subheading: {
        color: theme.palette.openTitle,
        marginLeft: '24px'
    }
}))



export default function StripeAccountConnect(props) {
    const classes = useStyles()
    const [values, setValues] = useState({
        error: false,
        connected: false,
        connecting: false
    })

    const jwt = auth.isAuthenticated()

    //we will use useEffect hook to parse the query parameters attached t othe URL
    useEffect( () => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const parsed = queryString.parse(props.location.search)
        if (parsed.error) {
            setValues({...values, error: true})
        }
        if (parsed.code) {
            setValues({...values, connecting: true, error: false})

            //make API post call to stripe, get credentials and update user data
            stripeUpdate({
                userId: jwt.user._id
            }, {
                t: jwt.token
            }, parsed.code, signal).then((data) => {
                if (data.error) {
                    setValues({...values, error: true, connecting: false, connected: false})
                } else {
                    setValues({...values, connected: true, connecting: false, error: false})
                }
            })
        }

        return function cleanup() {
            abortController.abort()
        }
    }, [])

    return(
        <div>
            <Paper className={classes.root} elevation={4}>
                <Typography type="title" className={classes.title}>
                    Connect your Stripe Account
                </Typography>
                {values.error && (<Typography type="subheading" className={classes.subheading}>
                    Something wrong. Try it later.
                </Typography>)}
                {values.connecting && (<Typography type="subheading" className={classes.subheading}>
                    Connecting ...
                </Typography>)}
                {values.connected && (<Typography type="subheading" className={classes.subheading}>
                Your Stripe account successfully connected!
                </Typography>)}
            </Paper>
        </div>
    )
}
