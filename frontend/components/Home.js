/* this compoment will containt our home page view. */
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { CssBaseline } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// import backImg from './../client/assets/images/showcase4.jpg';
import {Link} from 'react-router-dom';



/* Style declaration to define css styles(CSS-in-JS) for the component.
    makeStyles is a custom React hook API */

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 30,
    },
    card: {
        maxWidth: 750,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 500
    },
    shopping_button: {
        color: '#00000',
        backgroundColor: 'd#87f2b',
    },
    new_shop_button: {
        color: '#00000',
        backgroundColor: '#3e92cc',
    },
    brand: {
        flexGrow: 1,
        alignItems: 'center',
        '& img': {
            width: '100%',
        },
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




// our functional component defintion
export default function Home() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h1" className={classes.title}>
                            Welcome to LikeShop ecommerce plaform. Shop and stay social.
                        </Typography>
                        <Button className={classes.shopping_button} href="#products">Shopping</Button> <br/>
                        <Button className={classes.new_shop_button}><AddCircleIcon />Add Shop</Button>
                    </Grid>
                   {/*  <Grid className="brand" item sm={4}>
                        <img src={backImg} alt="logo" />
                    </Grid> */}
                </Grid>
                <Card className={classes.card}>
                    
                    <Typography variant="body1" component="p" className={classes.credit} color="textSecondary"></Typography>
                    <CardContent>
                        <Typography variant="body1" component="p">
                            
                        </Typography>
                    </CardContent>
                
                </Card>
            </Container>
            {/* calling copyright function here */}
            <Box mt={5}><Copyright /></Box>
        </div>
     
    )
}