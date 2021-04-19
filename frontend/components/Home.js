/* this compoment will containt our home page view. */
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import backImg from './../client/assets/images/showcase4.jpg';






/* Style declaration to define css styles(CSS-in-JS) for the component.
    makeStyles is a custom React hook API */

const useStyles = makeStyles(theme => ({
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
    }
}))


// our functional component defintion
export default function Home() {
    const classes = useStyles()
    return (
        <div className={}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h1" className={classes.title}>
                            Welcome to LikeShop ecommerce plaform. Shop and stay social.
                        </Typography>
                        <Button className="shopping-button" href="#products">Shopping</Button> <br/>
                        <Button className="create-shop-button"><AddCircleIcon />Add Shop</Button>
                    </Grid>
                    <Grid className="brand" item sm={6}>
                        <img src={backImg} alt="logo" />
                    </Grid>
                </Grid>
                <Card className={classes.card}>
                    
                    <Typography variant="body1" component="p" className={classes.credit} color="textSecondary"></Typography>
                    <CardContent>
                        <Typography variant="body1" component="p">
                            
                        </Typography>
                    </CardContent>
                
                </Card>
            </Container>
        </div>
     
    )
}