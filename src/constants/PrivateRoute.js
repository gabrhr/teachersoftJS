/* Author: Mitsuo
 *
 * Ruta que requirer autenticacion y rol,  sino redirecciona a login 
 */
import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useHistory } from "react-router-dom";

/* BUG:  no redirecciona si rol diferente al requerido  */
/* From https://v5.reactrouter.com/web/example/auth-workflow */
export default function PrivateRoute(props) {
    const {requireRoles,component: Component, ...rest } = props
    
    const history=useHistory();
    let rol = JSON.parse(localStorage.getItem("rol"))
    let permiso=0
    console.log(rol)  
    /*   if(rol){
        history.push('/'); 
    }
    */
    if(requireRoles.includes(rol)){
        permiso=1
        console.log(permiso)
    }
    if(rol==null){
        permiso=2
    }
    console.log(permiso)

    return (
        <Route
          {...rest}
          render={props => {
            switch(permiso){
              case(0):                                          
                    switch (rol) {
                      case 0:
                          return history.push("/admin");
                      case 1:
                          return history.push({
                          pathname: "/as",
                          });
                      default:
                          return history.push("/noRoles");
                    }   
              case(1):                             
                  return <Component {...props} />;   
              default:
                  return (
                    <Redirect to={{pathname: "/"}}/>
                  );
            }
        }}  />
    );
}