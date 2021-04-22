import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import auth from './../client/helpers/auth-helpers';
import {listByOwner} from "./../client/api-fetching/shop/api-shop.js";
import {Redirect, Link} from 'react-router-dom';
import DeleteShop from './DeleteShop';



/* Style declaration to define css styles(CSS-in-JS) for the component.
    makeStyles is a custom React hook API */
const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(3)
    }),
    title: {
        margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.protectedTitle,
        textAlign: 'center',
        fontSize: '1.2em'
    },
    avatar:{
        width: 100,
        height: 100
    },
    addButton:{
        float:'right'
    },
    leftIcon: {
        marginRight: "8px"
    },
    shopTitle: {
        fontSize: '1.2em',
        marginBottom: '5px'
    },
    margin: {
        margin: theme.spacing(1),
    },
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


export default function MyShops(){
    const classes = useStyles()
    const [shops, setShops] = useState([])
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated()
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        listByOwner({
            userId: jwt.user._id
            }, {t: jwt.token}, signal).then((data) => {
            if (data.error) {
                setRedirectToSignin(true)
            } else {
                setShops(data)
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    
    }, [])

    /* the remove method update the state with the list of shops*/
    const removeShop = (shop) => {
        const updatedShops = [...shops]
        const index = updatedShops.indexOf(shop)
        updatedShops.splice(index, 1)
        setShops(updatedShops)
    }


    /* redirect user to signin view*/
    if (redirectToSignin) {
        return <Redirect to='/signin' />
    }


    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.root}>
                <Typography type="title" className={classes.title}>
                    Your Brand Shop.
                    <span className={classes.addButton}>
                        <Link to="/seller/shop/new">
                            {/* <Button color="primary" variant="contained">
                                <Icon className={classes.leftIcon}>add_box</Icon> New Shop
                            </Button> */}
                            <Fab 
                              size="medium" 
                              color="secondary" 
                              aria-label="add" 
                              className={classes.margin}
                            >
                                <AddCircleIcon />
                            </Fab>
                        </Link>
                    </span>
                </Typography>
                <List dense>
                    {shops.map((shop, i) => {
                        return <span key={i}>
                          
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar className={classes.avatar} src={'/api/shops/logo/'+ shop._id +"?" + new Date().getTime()}/>
                                    </ListItemAvatar>
                                    <ListItemText primary={shop.name} secondary={shop.description} />
                                    { auth.isAuthenticated().user && auth.isAuthenticated().user._id == shop.owner._id &&
                                        (<ListItemSecondaryAction>
                                            <Link to ={"/seller/orders/" + shop.name+ '/' +shop._id}>
                                                <Button aria-label="Orders" color="primary">
                                                    View Orders
                                                </Button>
                                            </Link>
                                            <Link to ={"/seller/shop/edit/" + shop._id}>
                                                <IconButton aria-label="Edit" color="primary">
                                                    <Edit />
                                                </IconButton>
                                            </Link>
                                            <DeleteShop shop={shop} onRemove={removeShop} />
                                        </ListItemSecondaryAction>)
                                    }
 
                                </ListItem>
                            <Divider/>
                           </span> })}
                         
                </List>
            </div>
            {/* calling copyright function here */}
            <Box mt={5}><Copyright /></Box>
        </Container>
    )

}
