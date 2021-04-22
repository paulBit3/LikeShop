/* product search categories component  */
import React, { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider'
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem'
import {list} from "../client/api-fetching/product/api-product";
import { Button } from '@material-ui/core';
import Products from './Products'



/* Style declaration to define css styles(CSS-in-JS) for the component.
    makeStyles is a custom React hook API */
const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
        background: theme.palette.background.paper,
        textAlign: 'left',
        paddingTop: '8px'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 130,
        verticalAlign: 'bottom',
        marginBottom: '20px'
    },
    searchField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300,
        marginBottom: '20px'
    },
    menu: {
        width: 200,
    },
    searchButton: {
        minWidth: '20px',
        height: '30px',
        padding: '0 8px',
        marginBottom: '20px'
    }
}))


export default function Search(props) {
    const classes = useStyles();
    const [values, setValues] = useState({
        category: '',
        search: '',
        results: [],
        serached: false
    })

    //this method takes the new value in the input and sets it as the state
    const handleInputChange = name => event => {
        setValues({
            ...values, [name]: event.target.value,
        })
    }

    //this method makes a call to the search API using the list fetch method
    const search = () => {
        if (values.search) {
            list({
                search: values.search || undefined, category: values.category
            }).then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setValues({...values, results: data, searched: true})
                }
            })
        }
    }

    //this method is to detect when the Enter key is pressed
    const enterKey = (event) => {
        if (event.keyCode == 13) {
            event.preventDefault()
            search()
        }
    }


    return (
        <div className={classes.root}>
            <TextField 
               id="select-category" 
               label="Shop by category" 
               className={classes.textField}
               value={values.category}
               onChange={handleInputChange('category')}
               SelectProps={{
                   MenuProps: {
                       className: classes.menu,
                   }
               }}
               margin="normal">
                   <MenuItem value="All Categories"></MenuItem>
                   { props.categories.map(option => (
                       <MenuItem key={option} value={option}>{option}</MenuItem>
                   ))}
            </TextField>
            <Autocomplete
                id="search"
                size="small"
                renderInput={(params) => (
                <TextField 
                   {...params} 
                   variant="standard" 
                   label="Search products" 
                   placeholder="Search for any products"
                   type="search"
                   onKeyDown={enterKey}
                   onChange={handleInputChange('search')}
                   className={classes.searchField}
                   margin="normal"
                   InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon style={{ cursor: "pointer", padding: "17px"}} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                )}
            />
            <Button 
              variant="contained" 
              color={'primary'} 
              className={classes.searchButton}
              onClick={search}>
                  <SearchIcon />
            </Button>
            <Products products={values.results} searched={values.searched}/>
        </div>
    )
}

Search.propTypes = {
    categories: PropTypes.array.isRequired
}

