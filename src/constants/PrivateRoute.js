/* Author: Mitsuo
 *
 * Ruta que requirer autenticacion y rol,  sino redirecciona a login 
 */
import React from 'react'
import { Route, Redirect } from 'react-router-dom';

/* BUG:  no redirecciona si rol diferente al requerido  */
/* From https://v5.reactrouter.com/web/example/auth-workflow */
export default function PrivateRoute(props) {
    const { page, requireRoles, usuario, ...other } = props

    // let auth = useAuth();        // reemplazado por `usuario`
    return (
        <Route
            {...other}
            render={({ location }) =>
                usuario.isAuthenticated &&
                    requireRoles.includes(usuario.roleID) ? (
                    props.children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
