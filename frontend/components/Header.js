/* Our menu component will function as  a navigation bar at the frontend app */
import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AddCartIcon from '@material-ui/icons/AddShoppingCart'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import { Link, withRouter } from 'react-router-dom';
import { Block } from '@material-ui/icons';

import auth from './../client/helpers/auth-helpers';
import cart from './../client/helpers/cart-helpers';


//import { createMemoryHistory } from 'history';


//higher-order component
// import { withRouter } from 'react-router';



//const history = createMemoryHistory();



/* Style declaration to define css styles(CSS-in-JS) for the component.
    makeStyles is a custom React hook API */

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: '#7fc7d9',
        backgroundImage: 'linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)',
        height: 50,
    },
    menu: {
        backgroundColor: '#ec8c69!important',
        '&:hover': {
            backgroundColor: '#ff3366',
            color: '#707070!important',
          },
        height: 30,
        lineHeight: 10,
        padding: '0.525rem 0',
          '&:after':{
            transform: 'scale(0)',
            transition: 'transform 0.2s ease',
          },
          '&:hover:after': {
              transform: 'scale(1)',
            },
        
        transition: 'all 0.5s ease',

        // marginRight: theme.spacing(2),
        // marginBottom: theme.spacing(2),
    },
    buttonText: {
        color: theme.palette.primary.contrastText,
    },

    // overrides: {
    //     MuiMenuItem: {
    //       selected: {    
    //         // Works (without the need for !important)
    //         background: 'linear-gradient(45deg, red 30%, orange 90%)',
    //       },
    //       menu: {
    //         backgroundColor: '#ed6ea0',
    //         },
    //     },
    // },
}))


/* highlight the link that matches the 
current location path by changing the color */
const isActive = (history, path) => {
    // let history = useHistory()
    if (history.location.pathname == path)
      return { color: '#ffff'}
    else
      return { color: '#ffff' }
}

const isPartActive = (history, path) => {
    if (history.location.pathname.includes(path))
      return {color: '#dbedff'}
    else
      return {color: '#ffff'}
}


/* We'll use the HOC withRouter from React Router 
to get access to the history object properties */
const Header = withRouter(({history}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState()
    const classes = useStyles()

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    };

    const handleClose = () => {
        setMenuOpen(false);
    };

        return (
            <AppBar className={classes.appBar} position='fixed'>
                <Toolbar>
                    <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        LikeShop
                    </Typography>

                    {/* if user not authenticated, display signup or login menu */}
                    <div style={{'position':'absolute', 'right': '5px'}}><span style={{'float': 'right'}}>
                        <Link to="/">
                            <IconButton aria-label="Home" style={isActive(history, "/")}>
                                <HomeIcon />
                            </IconButton>
                        </Link>
                        {/* <Link to="/users"><Button style={isActive(history, "/users")}>Users</Button>
                        </Link> */}
                        {
                            !auth.isAuthenticated() && (<span>
                                <Button
                                   aria-controls="simple-menu"
                                   aria-haspopup="true"
                                   onClick={handleMenu}
                                   onMouseOver={handleMenu}
                                   className={classes.buttonText}
                                >< AccountCircleIcon 
                                  style={{color:'#fff'}}
                                />Account
                                < ExpandMoreIcon />
                                </Button>
                                <Menu
                                  id= "simple-menu"
                                  anchorEl= {anchorEl}
                                  getContentAnchorEl={null}
                                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                                  open= {menuOpen}
                                  autoWidth= {false}
                                  onClose= {handleClose}
                                  MenuListProps={{ onMouseLeave: handleClose }}
                                  
                                ><MenuItem onClick={handleClose} className={classes.menu}>
                                    <Link to="/signup">
                                        <Button color="inherit" style={isActive(history, "/signup")}>Sign Up</Button>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose} className={classes.menu}>
                                    <Link to="/signin">
                                        <Button color="inherit" style={isActive(history, "/signin")}>Sign In</Button>
                                    </Link>
                                </MenuItem>
                                </Menu>
                            </span>)
                            
                        }
                        {/* if user is authenticated, display profile page */}
                        {
                            auth.isAuthenticated() && (<span>
                                <Button
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    onMouseOver={handleMenu}
                                    className={classes.buttonText}
                                > < AccountCircleIcon 
                                   style={{color:'#fff'}}
                                /> Account
                                < ExpandMoreIcon />
                                </Button>
                                <Menu
                                  id= "simple-menu"
                                  anchorEl= {anchorEl}
                                  getContentAnchorEl={null}
                                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                                  open= {menuOpen}
                                  autoWidth= {false}
                                  onClose= {handleClose}
                                  MenuListProps={{ onMouseLeave: handleClose }}
                                  
                                ><MenuItem onClick={handleClose} className={classes.menu}>
                                    <Link to={"/user/" + auth.isAuthenticated().user._id}>
                                       <Button 
                                       color="inherit" 
                                       style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>Profile</Button>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose} className={classes.menu}>
                                    <Link to="/preference">
                                        <Button color="inherit" style={isActive(history, "/preference")}>Preferences</Button>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose} className={classes.menu}>
                                    <Link to="/order">
                                        <Button color="inherit" style={isActive(history, "/order")}>Orders</Button>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose} className={classes.menu}>
                                    <Link to="/billing">
                                        <Button color="inherit" style={isActive(history, "/billing")}>Billing</Button>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose} className={classes.menu}>
                                    <Link to="/shipping">
                                        <Button color="inherit" style={isActive(history, "/shipping")}>Shipping</Button>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose} className={classes.menu}>
                                    <Link to="/list">
                                        <Button color="inherit" style={isActive(history, "/list")}>My Lists</Button>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose} className={classes.menu}>
                                    {auth.isAuthenticated().user.seller && (<Link to="/seller/shops">
                                        <Button color="inherit" style={isPartActive(history, "/seller/")}>My Shops</Button>
                                    </Link>)
                                    }
                                </MenuItem>
                                <MenuItem onClick={handleClose} className={classes.menu}>
                                    <Button color="inherit" onClick={() => {
                                    auth.clearJWT(() => history.push('/'))
                                    }}>Sign Out</Button>
                                </MenuItem>
                                </Menu>
                            </span>)
                        }
                        <Link to="/cart">
                            <Button color="inherit" style={isActive(history, "/cart")}>
                                Cart

                                {/* adding cart with exception */}
                                <Badge color="secondary" invisible={false} badgeContent={cart.itemTotal()} style={{'marginLeft': '7px'}}>
                                    <AddShoppingCartIcon />
                                </Badge>
                            </Button>
                        </Link>
                    </span></div>
                </Toolbar>
            </AppBar>
        ) 
        
})
export default Header;