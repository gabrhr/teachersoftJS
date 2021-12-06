import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';

const getCiclos = async () => {
  try{
    /*
    const request = await axios.get(`${url}/ciclo/`, tokenService.getToken());
    return request ? request.data : []; 
    */ 
    const request = await axios.get(`${url}/ciclo/`, tokenService.GetTokenPrueba());
    // console.log(request.data);
    return request.data;  
  }catch(exception){
    console.error(exception);
  }
}

const getCiclo = async (id) => {
  try{
    const request = await axios.get(`${url}/ciclo/${id}`, tokenService.GetTokenPrueba(), id);
    return request.data; 
  }catch(exception){
    console.error(exception);
  }
}

const cicloActual = async () => {
  try{
    const request = await axios.get(`${url}/ciclo/actual`, tokenService.GetTokenPrueba());
    return request.data; 
  }catch(exception){
    console.error(exception);
  }
}

const registerCiclo = async newObject => {
  try{
    const request = await axios.post(`${url}/ciclo/`, newObject, tokenService.GetTokenPrueba());
    return request.data;   }catch(exception){
      console.error(exception);
      throw new Error.UserException(exception);
  }
}

const updateCiclo = async (newObject, {id}) => {
  try{
    const request = await axios.put(`${url}/ciclo/`, newObject, tokenService.GetTokenPrueba());
    return request.data;   }catch(exception){
      console.error(exception);
      throw new Error.UserException(exception);
  }
}

const deleteCiclo = async (id) => {
  try{
    const request = await axios.delete(`${url}/ciclo/${id}`, tokenService.GetTokenPrueba());
    return request.data;   }catch(exception){
    console.error(exception);
  }
}

export default {cicloActual, getCiclos, getCiclo, registerCiclo, updateCiclo, deleteCiclo}