import axios from 'axios';
import url from '../config.js';

const getCursosxCodigoNombre = async ({codigo_nombre}) => {
  try{
    const request = await axios.get(`${url}/curso/codigonombre=${codigo_nombre}`, codigo_nombre);  //Normalmente es un string
    return request.data;  //Es un dato
  }catch(exception){
    console.error(exception);
  }
}

const getCursosxSeccionCodigoNombre = async ({id_seccion}, {codigo_nombre}) => {
  try{
    if(id_seccion === 0){
      const request = await axios.get(`${url}/curso/seccion=${id_seccion}/codigonombre=${codigo_nombre}`, id_seccion, codigo_nombre);
      return request.data;  //Es un dato
    }
    else{
      const request = await axios.get(`${url}/curso/codigonombre=${codigo_nombre}`, codigo_nombre);
      return request.data;  //Es un dato
    }
  }catch(exception){
    console.error(exception);
  }
}

const getCurso = async ({id}) => {
  try{
    const request = await axios.get(`${url}/curso/${id}`, id);
    return request.data;  //Es un dato
  }catch(exception){
    console.error(exception);
  }
}

const registerCurso = async newObject => {
  try{
    const request = await axios.post(`${url}/curso/`, newObject);
    return request.data;  //Es un dato
    //return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
    return false;
  }
}

const updateCurso = async (newObject, {id}) => {
  try{
    const request = await axios.put(`${url}/curso/${id}`, newObject, id);
    return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const deleteCurso = async ({id}) => {
  try{
    await axios.delete(`${url}/curso/${id}`, id);
    return true;
    //return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
    return false;
  }
}

export default {getCursosxCodigoNombre, getCursosxSeccionCodigoNombre, getCurso, registerCurso, updateCurso, deleteCurso}