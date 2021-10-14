import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';

const register = async ({username, password}) => {
  try{
    await axios.post(`${url}/usuario/`, {username, password})
    console.log("Todo bien");
  }catch(exception){
    console.error(exception);
  }
}

const update = async () => {
  try{
    const user = window.localStorage.getItem('loggedUser'); 
    await axios.put(`${url}/usuario/`, user.user.id);
  }catch(exception){
    console.error(exception);
  }
}

const login = async (userObject) => {
  try{
    const  response  = await axios.post(`${url}/usuario/login`, userObject)
    //console.log(response.data);
    if(!response.data.token)
      return console.log("Authentication failed")
    console.log(response);
    tokenService.setToken(response.data); //Creamos el token
    console.log("Todo bien");
    return response.data
  }catch(exception){
    console.error(exception);
  }
}
/*
const userAuth = async () =>{
  try{  //llamado a funcion authentication por token
    const response = await axios.get(`${url}/login`, {
      headers:{
        "Authorization": tokenService.getToken(),
      }
    })
    return(response ? true : 
      (console.log("no esta autorizado para usar este servicio"), false))
  }catch(exception){
    console.error(exception);
  }
}
*/
export default {login, register, update};