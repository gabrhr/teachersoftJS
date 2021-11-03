import React, { useState, useEffect, useContext } from "react";
import UserService from '../services/userService'

import {useParams, useHistory} from "react-router";
const PostLogin = () => {
    
    const {token}=useParams()
    localStorage.setItem("id",token)
    const history = useHistory();
    const [current, setCurrent] = useState(undefined);
    const [loading, setLoading] = useState(undefined);

    useEffect(() => {
        console.log(token)
        //funcion
        //console.log(Token);
        waitLoadUser();
    }, []);
    const waitLoadUser = () => {
      
      const getUsuario = (token) => {
        const user = UserService.getUsuario(token);
        console.log(user);
        console.log(user.id);
      }
        setLoading(undefined);
        setTimeout(() => {
            //axios llame getUsuario("localhost:8080/usuario/id",)
          /* loadUser().then((response) => {
            //guardar user en localStoraed
            setCurrent(instance.getItem("sasaGurudumu"));
            //console.log(current);
          }); */

          setLoading(true);
          setTimeout(() => {
              setLoading(false);
          }, 1000);
        }, 1000);
    
    };

    return (
      <div>
          Hola mundo
      </div>
    );
  };
  
  export default PostLogin;
