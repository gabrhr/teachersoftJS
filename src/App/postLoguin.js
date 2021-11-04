import React, { useState, useEffect, useContext } from "react";
import UserService from '../services/userService'
import { Grid,CircularProgress } from '@mui/material';


import {useParams, useHistory} from "react-router";
const PostLogin = () => {
    
    const {userId,userToken}=useParams()
    localStorage.setItem("userId",userId)
    localStorage.setItem("userToken",JSON.stringify(userToken))
    const history = useHistory();
    const [current, setCurrent] = useState(undefined);
    const [loading, setLoading] = useState(undefined);
    let token= sessionStorage.getItem("access_token")
    useEffect(() => {
        console.log(userId)
        waitLoadUser();
    }, []);

    /* useEffect(() => {
      if (loading == false) {
        if (!current) return history.push("/noRoles");;
  
        switch (current.idRol) {
          case 1:
                history.push("/admin");
                break;
              case 2:
                history.push({
                  pathname: "/as",
                });
                break;
              default:
                return history.push("/noRoles");
        }
      }
    }, [loading]);
 */
    const waitLoadUser = () => {
      setLoading(undefined);
      setTimeout(() => {
        const user = UserService.getUsuario(userId);
        setCurrent(user)
        /* localStorage.setItem("userObj",JSON) */
        console.log(user);
        console.log(user.id);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
      }, 1000);
    };

    return (
      <div>
          {localStorage.getItem("userId")}
          {localStorage.getItem("userToken")}
          <Grid xs={6} textAlign="center" ml={25} mr={2}>
              <div> Espere un momento ...  </div>
              <CircularProgress />
          </Grid>
      </div>
    );
  };
  
  export default PostLogin;
