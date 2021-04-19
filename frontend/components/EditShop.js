import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Container from '@material-ui/core/Container';
import { PhotoCamera } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import UpdateIcon from '@material-ui/icons/Update';
import CancelSharpIcon from '@material-ui/icons/CancelSharp';
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import auth from './../client/helpers/auth-helpers';
import {read, update} from "./../client/api-fetching/shop/api-shop";
import {Link, Redirect} from "react-router-dom";
import MyProducts from './MyProducts';

/* Style declaration to define css styles(CSS-in-JS) for the component.
    makeStyles is a custom React hook API */
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 30,
    },
    iconHover: {
        margin: theme.spacing.unit * 2,
        "&:hover": {
          color: red[800]
        }
    },
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2),
    },
    error: {
        verticalAlign: 'middle'
      },
      title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle,
        fontSize: '1em'
      },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    },
    input: {
        display: 'none'
    },
    filename:{
        marginLeft:'10px'
    },
    button: {
        color: blue[900],
        margin: 10
    },
    secondaryButton: {
        color: "gray",
        margin: 10
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 'auto'
    },
}))

//our copyright function
function Copyright(){
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright ©'}
            <Link color="inherit" to="/">Oficy Inc.
            </Link>{''}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function EditShop({match}) {
    const classes = useStyles()
     //this can be replace by [values, setValues]
    const [state, setState] = useState({
        name: '',
        description: '',
        photo: '',
        redirect: false,
        error: '',
        id: ''
    })

    //get jwt from sessionstorage with isauthenicated method
    const jwt = auth.isAuthenticated()


    //fetching the given shop details and proe-populate the form fields
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        read({
            shopId: match.params.shopId
        }, signal).then((data) => {
            if (data.error) {
                setState({...state, error: data.error})
            } else {
                setState({...state, id: data._id, name: data.name, description: data.description, owner: data.owner.name})
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    }, [])

    /* defining our handler functions to be called */

    //this function takes the new value in the input and sets it as the state
   /*  */
   const handleUploadClick = name => event => {
       const value = name === 'photo'
       ? event.target.files[0]
       :event.target.value
       setState({ ...state, [name]: value })

    }

    //this function takes the input value from the state and send this form data to the server
    const onSubmit = () => {
        let shopData = new FormData()
        state.name && shopData.append('name', state.name)
        state.description && shopData.append('description', state.description)
        state.photo && shopData.append('photo', state.photo)
        update({
            shopId: match.params.shopId
        }, {
            t: jwt.token
        }, shopData).then((data) => {
            if (data.error) {
                setState({...state, error: data.error})
            } else {
                setState({...state, error: '', redirect: true})
            }
        })
    }


    // retrieving the logo url
    const logUrl = shop._id
          ? `/api/shops/logo/${shop._id}?${new Date().getTime()}`
          : `/api/shops/defaultphoto`

    //redirect the user to the view, when successful shop creation
    if (state.redirect) {
        return (<Redirect to ={'/seller/shops'} />)
    }

    
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.root}>
                <Grid container justify="center" alignItems="center" spacing={8}>
                    <Grid item xs={6} sm={6}>
                        <CardContent> 
                            <Typography type="headline" component="h2" className={classes.title}>
                                Edit your Shop
                            </Typography> <br/>
                            <Avatar src={logUrl} className={classes.bigAvatar}/>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={handleUploadClick('photo')}
                            />
                            <label htmlFor="contained-button-file">
                                <Fab component="span" className={classes.button}>
                                    <PhotoCamera fontSize="large" />
                                </Fab>
                            </label> <span className={classes.filename}>{state.photo ? state.photo.name : ''}</span><br/>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField 
                                        id="name" 
                                        label="Shop name" 
                                        className={classes.textField} 
                                        value={state.name}
                                        onChange={handleUploadClick('name')}
                                        margin="normal"
                                    />
                                </Grid><br/>
                                <Grid item xs={12}>
                                    <TextField
                                        id="multiline-flexible"
                                        label="Description"
                                        multiline
                                        rows="2"
                                        value={state.description}
                                        onChange={handleUploadClick('description')}
                                        className={classes.textField}
                                        margin="normal"
                                    />
                                </Grid> <br/> 
                                {
                                    state.error && (<Typography component="p" color="error">
                                    <Icon color="error" className={classes.error}>error</Icon>
                                    {state.error}</Typography>)
                                }
                            </Grid>
                        </CardContent>
                    </Grid>
                </Grid>
                <CardActions>
                    <Button 
                        color="primary" 
                        variant="contained" 
                        onClick={onSubmit} 
                        className={classes.submit}
                    >
                        <UpdateIcon />
                    </Button>
                    <Link 
                    to='/seller/shops' 
                    className={classes.submit}
                    >
                        <Button 
                            variant="contained"
                        >
                            <CancelSharpIcon />Cancel
                        </Button>
                    </Link>
                </CardActions>
                {/* implementing my products here */}
                <Grid item xs={6} sm={6}>
                    <MyProducts shopId={match.params.shopId}/>
                </Grid>
                
                <Box mt={5}><Copyright /></Box>
                
            </div>
        </Container>
    )
}