import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Person from '@material-ui/icons/Person';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import DeleteUser from './DeleteUser';
import auth from './../client/helpers/auth-helpers';
import {list} from "./../client/api-fetching/shop/api-shop";
import {Link} from 'react-router-dom';



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
      subheading: {
        color: theme.palette.text.secondary
      },
      shopTitle: {
        fontSize: '1.2em',
        marginBottom: '5px'
      },
      details: {
        padding: '24px'
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
    const [shops, setShops] = useState([])
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        list(signal).then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            setShops(data)
          }
        })
        return function cleanup(){
          abortController.abort()
        }
    
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <Typography type="title" className={classes.title}>
                All Brand Shops.
            </Typography>
            <List dense>
                {shops.map((shop, i) => {
                    return <Link to ={"/shops/"+ shop._id} key={i}>
                        <Divider/>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar} src={'/api/shops/logo/'+ shop._id +"?" + new Date().getTime()}/>
                                        <Person/>
                                </ListItemAvatar>
                                <div className={classes.details}>
                                    <Typography type="headline" component="h2" color="primary" className={classes.shopTitle}>
                                        {shop.name}
                                    </Typography>
                                    <Typography type="subheading" compponent="h4" className={classes.subheading}>
                                        {shop.description}
                                    </Typography>
                                </div>
                            </ListItem>
                         <Divider/>
                        </Link>})}
            </List>
        </Container>
    )

}
