import React, { useContext } from "react";
import { Route, Redirect} from "react-router-dom";
//import instance from "../../instance";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../constants/UserContext";

//const isAuthenticated = window.localStorage.getItem("isAuthenticated");

export default function ProtectedRoute(props) {
  const {idRoles, component: Component, ...rest } = props
  const history=useHistory();
  let rol = JSON.parse(localStorage.getItem("rol"))
  let permiso=0
  console.log(rol)
/*   if(rol){
    history.push('/'); 
  }
 */
  if(idRoles.includes(rol)){
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
};