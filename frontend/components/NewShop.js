import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { PhotoCamera } from "@material-ui/icons";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton"
import TextField from '@material-ui/core/TextField'
import Typography from "@material-ui/core/Typography"
import auth from './../client/helpers/auth-helpers';
import {create} from "./../client/api-fetching/shop/api-shop"
import {Link, Redirect} from "react-router-dom"


/* Style declaration to define css styles(CSS-in-JS) for the component.
    makeStyles is a custom React hook API */
const useStyles = makeStyles(theme => ({
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


export default function NewShop() {
    const classes = useStyles()
     //this can be replace by [values, setValues]
    const [state, setState] = useState({
        name: '',
        description: '',
        photo: '',
        redirect: false,
        error: ''
    })

    //get jwt from sessionstorage with isauthenicated method
    const jwt = auth.isAuthenticated()

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
        create({
            userId: jwt.user._id
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

    //redirect the user to the view, when successful shop creation
    if (state.redirect) {
        return (<Redirect to ={'/seller/shops'} />)
    }

    return (
        <CardContent>
            <Grid container justify="center" alignItems="center">
                <Typography type="headline" component="h2" className={classes.title}>
                    Create your Shop
                </Typography> <br/>
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
                <TextField 
                    id="name" 
                    label="Shop name" 
                    className={classes.textField} 
                    value={state.name}
                    onChange={handleUploadClick('name')}
                    margin="normal"
                /><br/>
                <TextField
                    id="multiline-flexible"
                    label="Description"
                    multiline
                    rows="2"
                    value={state.description}
                    onChange={handleUploadClick('description')}
                    className={classes.textField}
                    margin="normal"
                /> <br/> 
                {
                    state.error && (<Typography component="p" color="error">
                    <Icon color="error" className={classes.error}>error</Icon>
                    {state.error}</Typography>)
                }
            </Grid>
            <CardActions>
                <Button 
                    color="primary" 
                    variant="contained" 
                    onClick={onSubmit} 
                    className={classes.submit}
                >Submit
                </Button>
                <Link to='/seller/shops' className={classes.submit}><Button variant="contained">Cancel</Button></Link>
            </CardActions>
        </CardContent>
    )

}