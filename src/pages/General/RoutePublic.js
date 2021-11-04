import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useGoogleAuth } from '../Login/googleAuth';

const PublicRouter = ({component: Component, ...rest}) => {

    const { isSignedIn } = useGoogleAuth();
    console.log(isSignedIn)
    return (
        <div>
            <Route {...rest} render={props => (
                !isSignedIn ?
                <Component {...props} /> : 
                <Redirect exact to="/admin" />
            )} />    
        </div>
    );
};

export default PublicRouter;