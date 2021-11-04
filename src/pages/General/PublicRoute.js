/* OUT OF USE */

import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useGoogleAuth } from '../Login/googleAuth';

const PublicRoute = ({component: Component, ...rest}) => {

    const { isSignedIn } = useGoogleAuth();
    console.log(isSignedIn)
    return (
        <div>
            <Route {...rest} render={props => (
               isSignedIn ?
               (<Redirect exact to="/admin" />): //logueado 
                <Component {...props} /> //no logueado 
            )} />    
        </div>
    );
};

export default PublicRoute;