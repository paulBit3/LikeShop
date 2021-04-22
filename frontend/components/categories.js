/* product categories component  */

import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {Link, Redirect} from "react-router-dom";
import {list} from "./../client/api-fetching/product/api-product";
import Products from './Products';


/* Style declaration to define css styles(CSS-in-JS) for the component.
    makeStyles is a custom React hook API */
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper,
        textAlign: 'left',
        padding: '0 8px'
    },
    container: {
        minWidth: '100%',
        paddingBottom: '14px'
    },
    gridList: {
        width: '100%',
        minHeight: 200,
        padding: '16px 0 10px'
    },
    title: {
        padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        width: '100%'
    },
    tile: {
        textAlign: 'center'
    },
    image: {
        height: '100%'
    },
    tileBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        textAlign: 'left'
    },
    tileTitle: {
        fontSize:'1.1em',
        marginBottom:'5px',
        color:'rgb(189, 222, 219)',
        display:'block'
    }
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


export default function Categories(props) {
    const classses = useStyles()
    const [products, setProducts] = useState([])
    const [selected, setSelected] = useState(props.categories[0])

            
  

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abordController.signal

        list({
            category: props.categories[0]
        }).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    }, [])

    const listByCategory = category => event => {
        setSelected(category)
        list({
            category: category
        }).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
    }




    return (
        <div></div>
    )
}
