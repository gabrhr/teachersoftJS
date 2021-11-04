import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';
import { formatHorario, formatHorarioCursos } from '../components/auxFunctions';

export const getHorarios = async () => {
  try{
    //debugger;
    const request= await axios.get(`${url}/horario/`) //Todas las secciones
    return request.data;  
  }catch(exception){
    console.error(exception);
  }
}

export const getHorario = async ({id}) => {
  try{
    const request = await axios.get(`${url}/horario/${id}`,id);
    return request.data;  //Es un dato.
  }catch(exception){
    console.error(exception);
  }
}

const registerHorario = async newObject => {
  try{           
    const request = await axios.post(`${url}/horario/`, newObject);
    console.log(request.data);
    return request.data; //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const updateHorario = async (newObject, {id}) => {
  try{
    //console.log(newObject);
    const request = await axios.put(`${url}/horario/${id}`, newObject, id);
    return request.data; //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const deleteHorario = async ({id}) => {
  try{
    const request = await axios.delete(`${url}/horario/${id}`, id);
    return request.data; //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}


export default {getHorarios, getHorario, registerHorario, updateHorario, deleteHorario}
