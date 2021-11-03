import React from "react";
import { Route, Redirect} from "react-router-dom";
//import instance from "../../instance";
import { useHistory } from "react-router-dom";
import { useGoogleAuth } from "../Login/googleAuth";

//const isAuthenticated = window.localStorage.getItem("isAuthenticated");

const ProtectedRoute = ({idRoles,component: Component, ...rest }) => {
  const { isSignedIn } = useGoogleAuth();
  /* let roles = instance.getItem("roles"); */
  let roles = [
      {idRol: 1},
      {idRol: 2},
      {idRol: 3},
      {idRol: 4},
    ]
  const history=useHistory();
  let flag=0;
  if(roles===""){
    history.push('/'); 
  }
  roles.forEach(rol=>{
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

export default ProtectedRoute;