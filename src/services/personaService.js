import axios from 'axios';
import url from '../config.js';

export const getPersonas = async () => {
  try{
    const request = await axios.get(`${url}/persona/`);
    return request.then(response => response.data) 
  }catch(exception){
    console.error(exception);
  }
}

const getPersonasxTipo = async ({tipo_persona}) => {
  try{
    const request = await axios.get(`${url}/persona/tipo=${tipo_persona}`, tipo_persona);  //Es un entero que se pasa
    return request.then(response => response.data)
  }catch(exception){
    console.error(exception);
  }
}

const getPersonasxSeccionTipo = async ({id_seccion}, {tipo_persona}) => {
  try{
    const request = await axios.get(`${url}/persona/tipo=${tipo_persona}/seccion=${id_seccion}`, tipo_persona, id_seccion);
    return request.then(response => response.data)
  }catch(exception){
    console.error(exception);
  }
}

const getPersona = async ({id}) => {
  try{
    const request = await axios.get(`${url}/persona/${id}`, id);
    return request.then(response => response.data)  //Es un dato.
  }catch(exception){
    console.error(exception);
  }
}

const registerPersona = async newObject => {
  try{
    const request = await axios.post(`${url}/persona/`, newObject);
    return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
    return false;
  }
}

const updatePersona = async (newObject, {id}) => {
  try{
    const request = await axios.put(`${url}/persona/${id}`, newObject, id);
    return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const deletePersona = async ({id}) => {
  try{
    const request = await axios.delete(`${url}/persona/${id}`, id);
    return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
    return false;
  }
}

// export default {getPersonas, getPersonasxTipo, getPersonasxSeccionTipo, getPersona, registerPersona, updatePersona, deletePersona}