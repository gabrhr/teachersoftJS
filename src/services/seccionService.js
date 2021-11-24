import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';
import { formatHorario, formatHorarioCursos } from '../components/auxFunctions';

const getSecciones = async () => {
  try{
    //debugger;
    const request= await axios.get(`${url}/seccion/`, tokenService.GetTokenPrueba()) //Todas las secciones
    //console.log(request)
    //console.log(tokenService.GetTokenPrueba())
    return request.data;
  }catch(exception){
    console.error(exception);
  }
}

const getSeccionxDepartamento = async (id_departamento) => {
  try{
    const request = await axios.get(`${url}/seccion/porDepartamento=${id_departamento}`, tokenService.GetTokenPrueba(), id_departamento);  //Es un entero que se pasa
    console.log(request.data);
    return request.data;
  }catch(exception){
    console.error(exception);
  }
}

const getSeccion = async (id) => {
  try{
    const request = await axios.get(`${url}/seccion/${id}`, tokenService.GetTokenPrueba(), id);
    //console.log(request);
    //console.log(request.data);
    return request.data;  //Es un dato.

  }catch(exception){
    console.error(exception);
  }
}

const registerSeccion = async newObject => {
  try{
    const request = await axios.post(`${url}/seccion/`, newObject, tokenService.GetTokenPrueba());
    console.log(request.data);
    return request.data; //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const updateSeccion = async (newObject,id) => {
  try{
    //console.log(newObject);
    const request = await axios.put(`${url}/seccion/`, newObject, tokenService.GetTokenPrueba());
    return request.data; //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const deleteSeccion = async (id) => {
  try{
    const request = await axios.delete(`${url}/seccion/${id}`, tokenService.GetTokenPrueba(),id);
    return request.data; //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

//, tokenService.getToken()

export default {getSecciones, getSeccionxDepartamento, getSeccion, registerSeccion, updateSeccion, deleteSeccion}
