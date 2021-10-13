import React from "react";
import { Route } from "react-router-dom";
//import instance from "../../instance";
import { useHistory } from "react-router-dom";

//const isAuthenticated = window.localStorage.getItem("isAuthenticated");

const ProtectedRoute = ({idRoles,component: Component, ...rest }) => {
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
    <Route
      {...rest}
      render={(props) => {
          return <Component {...props} />;
        
      }}
    />
  );
};

export default ProtectedRoute;