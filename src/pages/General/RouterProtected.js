import React, { useContext } from "react";
import { Route, Redirect} from "react-router-dom";
//import instance from "../../instance";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../constants/UserContext";

//const isAuthenticated = window.localStorage.getItem("isAuthenticated");

export default function ProtectedRoute(props) {
  const {idRoles, component: Component, ...rest } = props
  const history=useHistory();
  const { rol} = useContext(UserContext)
  let permiso=0
  if(JSON.parse(localStorage.getItem("rol"))){
    history.push('/'); 
  }

  if(idRoles.includes(rol)){
    permiso=1
    console.log(permiso)
  }

  return (
    <Route
      {...rest}
      render={props => {
        switch(permiso){
          case(0):                             
              return <Redirect to={{pathname: "/"}}/> 
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
