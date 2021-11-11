import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';

const getCursosxCodigoNombre = async (codigo_nombre) => {
  //console.log("EL codigo pasado es: ",codigo_nombre);
  const token = tokenService.GetTokenPrueba();
  //console.log(token);
  try{
    const request = await axios.get(`${url}/curso/codigonombre=${codigo_nombre}`, token  , codigo_nombre, { allowCredentials: false });  //Normalmente es un string
    return request.data;  //Es un dato
  }catch(exception){
    console.error(exception);
  }
}

const getCursosxSeccionCodigoNombre = async (id_seccion, codigo_nombre) => {
  //console.log(id_seccion, "  ", codigo_nombre);
  try{
    if(id_seccion){
      const request = await axios.get(`${url}/curso/seccion=${id_seccion}/codigonombre=${codigo_nombre}`, tokenService.GetTokenPrueba(), id_seccion, codigo_nombre);
      //console.log(request.data)
      return request.data;  //Es un dato
    }
  }catch(exception){
    console.error(exception);
  }
}

const getCursos = async () => {
  try{
    const request = await axios.get(`${url}/curso/`, tokenService.GetTokenPrueba());
    return request.data;  //Es un dato
  }catch(exception){
    console.error(exception);
  }
}

const getCurso = async ({id}) => {
  try{
    const request = await axios.get(`${url}/curso/${id}`, tokenService.GetTokenPrueba(), id);
    return request.data;  //Es un dato
  }catch(exception){
    console.error(exception);
  }
}

const registerCurso = async newObject => {
  try{
    console.log("El request de register: ",newObject);
    const request = await axios.post(`${url}/curso/`, newObject, tokenService.GetTokenPrueba());
    return request.data;  //Es un dato
    //return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
    return "Error";
  }
}

const updateCurso = async (newObject) => {
  try{
    console.log("El request de update: ",newObject);
    const request = await axios.put(`${url}/curso/`, newObject, tokenService.GetTokenPrueba());
    return request.data; 
  }catch(exception){
    console.error(exception);
    return "Error";
  }
}

const deleteCurso = async (id) => {
  try{
    await axios.delete(`${url}/curso/${id}`, tokenService.GetTokenPrueba(), id);
    return true;
    //return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
    return "Error";
  }
}

//FUNCIONALIDADES DE CURSO CICLO - SERVICE

const getCursoCicloxCicloxCodigoNombre = async (id_ciclo,codigo_nombre) => {
  //console.log("EL codigo pasado es: ",codigo_nombre);
  const token = tokenService.GetTokenPrueba();
  //console.log(token);
  try{
    const request = await axios.get(`${url}/cursociclo/idciclo=${id_ciclo}/codigo_nombre=${codigo_nombre}`, token  , id_ciclo, codigo_nombre, { allowCredentials: false });  //Normalmente es un string
    return request.data;  //Es un dato
  }catch(exception){
    console.error(exception);
  }
}

const getCursosCiclos = async () => {
  try{
    const request = await axios.get(`${url}/cursociclo/`, tokenService.GetTokenPrueba());
    return request.data;  //Es un dato
  }catch(exception){
    console.error(exception);
  }
}

const getCursoCiclo = async (id) => {
  try{
    const request = await axios.get(`${url}/cursociclo/${id}`, tokenService.GetTokenPrueba(), id);
    return request.data;  //Es un dato
  }catch(exception){
    console.error(exception);
  }
}

const registerCursoCiclo = async newObject => {
  try{
    console.log("El request de register: ",newObject);
    const request = await axios.post(`${url}/cursociclo/`, newObject, tokenService.GetTokenPrueba());
    return request.data;  //Es un dato
    //return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
    return "Error";
  }
}

const updateCursoCiclo = async (newObject) => {
  try{
    console.log("El request de update: ",newObject);
    const request = await axios.put(`${url}/cursociclo/`, newObject, tokenService.GetTokenPrueba());
    return request.data; 
  }catch(exception){
    console.error(exception);
    return "Error";
  }
}

const deleteCursoCiclo = async (id) => {
  try{
    await axios.delete(`${url}/cursociclo/${id}`, tokenService.GetTokenPrueba(), id);
    return true;
    //return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
    return "Error";
  }
}

export default {getCursos, getCursosxCodigoNombre, getCursosxSeccionCodigoNombre, getCurso, registerCurso, updateCurso, deleteCurso, 
  getCursoCicloxCicloxCodigoNombre, getCursosCiclos, getCursoCiclo, registerCursoCiclo, updateCursoCiclo, deleteCursoCiclo}