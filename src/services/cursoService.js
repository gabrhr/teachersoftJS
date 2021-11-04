import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';

const getCursosxCodigoNombre = async (codigo_nombre) => {
  //console.log("EL codigo pasado es: ",codigo_nombre);
  console.log(url,"/curso/codigonombre=", codigo_nombre, "\nHeader: tokenService.getToken()");
  try{
    const request = await axios.get(`${url}/curso/codigonombre=${codigo_nombre}`, tokenService.getToken(), codigo_nombre);  //Normalmente es un string
    return request.data;  //Es un dato
  }catch(exception){
    console.error(exception);
  }
}

const getCursosxSeccionCodigoNombre = async (id_seccion, codigo_nombre) => {
  //console.log(id_seccion, "  ", codigo_nombre);
  try{
    if(id_seccion !== 0){
      const request = await axios.get(`${url}/curso/seccion=${id_seccion}/codigonombre=${codigo_nombre}`, tokenService.getToken(), id_seccion, codigo_nombre);
      console.log(request.data)
      return request.data;  //Es un dato
    }
  }catch(exception){
    console.error(exception);
  }
}

const getCursos = async () => {
  try{
    const request = await axios.get(`${url}/curso/`, tokenService.getToken());
    return request.data;  //Es un dato
  }catch(exception){
    console.error(exception);
  }
}

const getCurso = async ({id}) => {
  try{
    const request = await axios.get(`${url}/curso/${id}`, tokenService.getToken(), id);
    return request.data;  //Es un dato
  }catch(exception){
    console.error(exception);
  }
}

const registerCurso = async newObject => {
  try{
    const request = await axios.post(`${url}/curso/`, tokenService.getToken(), newObject);
    return request.data;  //Es un dato
    //return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
    return false;
  }
}

const updateCurso = async (newObject, {id}) => {
  try{
    const request = await axios.put(`${url}/curso/${id}`, tokenService.getToken(), newObject, id);
    return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const deleteCurso = async ({id}) => {
  try{
    await axios.delete(`${url}/curso/${id}`, tokenService.getToken(), id);
    return true;
    //return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
    return false;
  }
}

export default {getCursos, getCursosxCodigoNombre, getCursosxSeccionCodigoNombre, getCurso, registerCurso, updateCurso, deleteCurso}