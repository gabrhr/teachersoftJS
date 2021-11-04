/* Author: Mitsuo
 *
 * Ruta que requirer autenticacion y rol,  sino redirecciona a login 
 */
import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './UserContext';

/* BUG:  no redirecciona si rol diferente al requerido  */
/* From https://v5.reactrouter.com/web/example/auth-workflow */
export default function PrivateRoute(props) {
    const { component: Component, requireRoles, ...other } = props
    const { user, setUser, rol,setRol,setToken } = React.useContext(UserContext);

    // let auth = useAuth();        // reemplazado por `usuario`
    return (
        <Route
            {...other}
            render={({ location }) =>
                localStorage.getItem('user') == null &&
                requireRoles.includes(user.persona.tipo_persona) 
                ? <Component />
                : (
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
