import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';

const register = async ({username, password}) => {
  try{
    await axios.post(`${url}/usuario/`, {username, password})
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

const login = async credentials => {
  try{
    const { data } = await axios.post(`${url}/usuario/login`, credentials)
    //if()    -- Depende de la data que se devuelve
    tokenService.setToken(data); //Creamos el token

    return data
  }catch(exception){
    console.error(exception);
  }
}

const userAuth = async () =>{
  try{
    const response = await axios.get(`${url}/login`, {
      headers:{
        "x-acces-auth": tokenService.getToken(),
      }
    })
    return(response ? true : 
      (console.log("no esta autorizado para usar este servicio"), false))
  }catch(exception){
    console.error(exception);
  }
}

export default {login, userAuth, register, update};