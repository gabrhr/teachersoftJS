/* OUT OF USE */

import React from "react";
import { Route, Redirect} from "react-router-dom";
//import instance from "../../instance";
import { useHistory } from "react-router-dom";
import { useGoogleAuth } from "../Login/googleAuth";

//const isAuthenticated = window.localStorage.getItem("isAuthenticated");

export default function ProtectedRoute(props) {
  const {idRoles, component: Component, ...rest } = props
  const { isSignedIn } = useGoogleAuth();
  /* let rol = localStoraged.getItem("roles"); */
  let rol = [
      {idRol: 1},
    ]
  const history=useHistory();
  let flag=0;
  if(rol===""){
    history.push('/'); 
  }
  rol.forEach(rol=>{
    idRoles.map(idRol=>{
      if(rol.idRol === idRol){
        flag=1;    
      }
    }) 
  })
  if(flag===0){
      history.push('/');
  }
  return (
    <div>
    <Route {...rest} render={props => (
      isSignedIn ?
      <Component {...props} />: <Redirect to="/"/>
  )} />
  </div>
  );
};
