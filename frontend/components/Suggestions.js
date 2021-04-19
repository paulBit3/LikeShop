import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import AddShoppingCartSharpIcon from '@material-ui/icons/AddShoppingCartSharp';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import Box from '@material-ui/core/Box';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import InfoIcon from '@material-ui/icons/Info';
import {Link} from "react-router-dom";
import { Typography } from '@material-ui/core';





const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        padding: theme.spacing(1),
        paddingBottom: 24,
        backgroundColor: '#fff'
    }),
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    products: {
        paddingTop: '80px',
        paddingBottom: '30px',
    },
    item_list: {
        maxHeight: '300px',
        marginBottom: '30px',
        position: relative,
    },
    viewButton:{
        verticalAlign:'middle'
    },
    leftIcon: {
        marginRight: "8px"
    },
    title: {
        margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        fontSize: '1.2em'
    },
    subheading: {
        color: 'rgba(88, 114, 128, 0.67)'
    },
    cover: {
        width: '55%',
        height: 100,
        margin: '8px'
    },
    details: {
        display: 'inline-block',
        width: '100%'
    },
    content: {
        flex: '1 0 auto',
        padding: '16px 8px 0px'
    },
    controls: {
        marginTop: '8px',
    },
    icon: {
        verticalAlign: 'sub'
    },
    iconButton: {
        width: '28px',
        height: '28px'
    },
    productTitle: {
        fontSize: '1.15em',
        marginBottom: '5px'
    },
    actions: {
        float: 'right',
        marginRight: '6px'
    },
    price: {
        display: 'inline',
        lineHeight: '3',
        paddingLeft: '8px',
        fontSize: '48px',
        fontWeight: '100',
        color: theme.palette.text.secondary
    }

}))

export default function Suggestions(props) {
    const classes = useStyles()
    return (
        <div className={classes.paper}>
            <Typography type="title" className={classes.title}>{props.title}</Typography>
            <Grid container spacing={4}>
                {props.products.map((item, i) => {
                    return (
                        <Grid key={i} item xs={12} sm={6}>
                            <img src={'/api/product/image'+item._id} alt={item.name} />
                            <div className={classes.details}>
                                    <Grid item xs={6} sm={3}>
                                        <Link to={'/product/'+item._id}>
                                            <Typography type="headline" variant="h3" component="h3" color="primary" className={classes.productTitle}>
                                                {item.name}
                                            </Typography>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Link to={'/shops/'+item.shop_id}>
                                            <Typography type="subheading" component="h4" className={classes.subheading}>
                                                <AddShoppingCartSharpIcon style={{verticalAlign: 'sub'}} /> {item.shop.name} | Price: ${product.price}
                                            </Typography>
                                        </Link>
                                    </Grid>
                                </div>
                                <div className={classes.controls}>
                                    <Grid item xs={6} sm={3}>
                                        <Typography type="subheading" component="h3" color="primary" className={classes.productTitle}>
                                                {item.name}
                                        </Typography>
                                        <span className={classes.actions}>
                                            <Link to={'/product/'+item._id}>
                                                <VisibilitySharpIcon style={classes.iconButton} />
                                            </Link>
                                            {/* implementing Add to Cart here */}
                                        </span>
                                    </Grid>
                                </div>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    )
}


Suggestions.propTypes = {
    products: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
}