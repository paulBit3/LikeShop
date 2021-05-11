/* our CoreRouter component will keep all of the 
   custom views and help render our custom react component */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Users from './Users';
import Signup from './Signup';
import Signin from './Signin';
import Profile from './Profile';
import EditProfile from './EditProfile';
import NewShop from './NewShop';
import Shops from './Shops';
import MyShops from './MyShops';
import Shop from './Shop';
import EditShop from './EditShop';
import NewProduct from './NewProduct';
import EditProduct from './EditProduct';
import Product from './Product';
import CartView from './CartView';
import PrivateRoute from './PrivateRoute';
import Header from './Header';





/* hint: the Switch component in react route,  renders a route exclusively. 
   A request at '/' also matches a route at 'about' */




const CoreRouter = () => {
    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home} />

                {/* to add the User component to the App */}
                <Route path="/users" component={Users} />

                {/* to add the Signup component to the App */}
                <Route path="/signup" component={Signup} />

                {/* to add the Signin component to the App */}
                <Route path="/signin" component={Signin} />

                {/* to add the Edit Profile component to the App. edit path is matched 1st */}
                <PrivateRoute path="/user/edit/:userId" component={EditProfile} />

                {/* to add the Profile component to the App */}
                <Route path="/user/:userId" component={Profile} />

                {/* to display shopping cart  to visitor */}
                <Route path="/cart/" component={CartView} />
                
                {/* to display single product to visitor */}
                <Route path="/product/:productId" component={Product} />
                
                {/* to redirect the user to a view displaying all shops */}
                <Route path="/shops/all" component={Shops} />

                {/* to redirect the user to a specific shop with shop details */}
                <Route path="/shops/:shopId" component={Shop} />

                {/* to add a new shop view displaying all shops */}
                <PrivateRoute path="/seller/shop/new" component={NewShop} />

                {/* to displaying the owner shops */}
                <PrivateRoute path="/seller/shops" component={MyShops} />

                {/* to Edit the owner shops */}
                <PrivateRoute path="/seller/shop/edit/:shopId" component={EditShop} />
                
                {/* to add a new product to owner shops */}
                <PrivateRoute path="/seller/:shopId/products/new" component={NewProduct} />

                {/* to edit a product to owner shops */}
                <PrivateRoute path="/seller/:shopId/productId/edit" component={EditProduct} />
            </Switch>
        </div>
    )
}

export default CoreRouter;