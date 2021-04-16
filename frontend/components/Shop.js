import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Edit from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import auth from './../client/helpers/auth-helpers';
import {read} from "./../client/api-fetching/shop/api-shop";
import { Box, Typography, IconButton, Card, CardContent, Grid } from '@material-ui/core';




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
    const [error, setError] = useState('')
  
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
       
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
                </Grid>

            </div>
            {/* calling copyright function here */}
            <Box mt={5}><Copyright /></Box>
        </Container>
    )

}
