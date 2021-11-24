import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';

export const getPersonas = async () => {
  try{
    const request = await axios.get(`${url}/persona/`, tokenService.GetTokenPrueba());
    return request.data;
  }catch(exception){
    console.error(exception);
  }
}

const getPersonasxTipo = async (tipo_persona) => {
  try{
    const request = await axios.get(`${url}/persona/tipo=${tipo_persona}`, tokenService.GetTokenPrueba(), tipo_persona);  //Es un entero que se pasa
    return request.data;
  }catch(exception){
    console.error(exception);
  }
}

const getPersonasxSeccionTipo = async (id_seccion, tipo_persona) => {
  try{
    const request = await axios.get(`${url}/persona/tipo=${tipo_persona}/seccion=${id_seccion}`, tipo_persona, id_seccion, tokenService.GetTokenPrueba());
    return request.data;
  }catch(exception){
    console.error(exception);
  }
}

const getPersona = async (id) => {
  try{
    const request = await axios.get(`${url}/persona/${id}`, id, tokenService.GetTokenPrueba());
    return request.data;
  }catch(exception){
    console.error(exception);
  }
}

const registerPersona = async newObject => {
  try{
    const request = await axios.post(`${url}/persona/`, newObject, tokenService.GetTokenPrueba());
    return request.data;
  }catch(exception){
    console.error(exception);
    return false;
  }
}

const updatePersona = async (newObject) => {
  try{
    console.log(newObject)
    const request = await axios.put(`${url}/persona/`, newObject, tokenService.GetTokenPrueba());
    return request.data //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const deletePersona = async (id) => {
  try{
    const request = await axios.delete(`${url}/persona/${id}`, tokenService.GetTokenPrueba(), id);
    return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
    return false;
  }
}

//FUNCIONALIDAD PREFERENCIA DOCENTE

export const getPreferencias = async () => {
  try{
    const request = await axios.get(`${url}/preferencia/`, tokenService.GetTokenPrueba());
    return request.data;
  }catch(exception){
    console.error(exception);
  }
}

const getPreferencia = async (id) => {
  try{
    const request = await axios.get(`${url}/preferencia/${id}`, id, tokenService.GetTokenPrueba());
    return request.data;
  }catch(exception){
    console.error(exception);
  }
}

const getPreferenciasxDocente = async (id_docente) => {
  try{
    const request = await axios.get(`${url}/preferencia/iddocente=${id_docente}`, tokenService.GetTokenPrueba(), id_docente);  //Es un entero que se pasa
    return request.data;
  }catch(exception){
    console.error(exception);
  }
}

const getPreferenciasxSeccion = async (id_seccion) => {
  try{
    const request = await axios.get(`${url}/preferencia/idseccion=${id_seccion}`, tokenService.GetTokenPrueba(), id_seccion);  //Es un entero que se pasa
    return request.data;
  }catch(exception){
    console.error(exception);
  }
}

const getPreferenciasxDepartamento = async (id_departamento) => {
  try{
    const request = await axios.get(`${url}/preferencia/iddepartamento=${id_departamento}`, tokenService.GetTokenPrueba(), id_departamento);  //Es un entero que se pasa
    return request.data;
  }catch(exception){
    console.error(exception);
  }
}

const registerPreferencia = async newObject => {
  try{
    const request = await axios.post(`${url}/preferencia/`, newObject, tokenService.GetTokenPrueba());
    return request.data;
  }catch(exception){
    console.error(exception);
    return false;
  }
}

const updatePreferencia = async (newObject, id) => {
  try{
    console.log(newObject)
    const request = await axios.put(`${url}/preferencia/`, newObject, tokenService.GetTokenPrueba());
    return request.data //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const deletePreferencia = async (id) => {
  try{
    const request = await axios.delete(`${url}/preferencia/${id}`, tokenService.GetTokenPrueba(), id);
    return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
    return false;
  }
}

export default {getPersonas, getPersonasxTipo, getPersonasxSeccionTipo, getPersona, registerPersona, updatePersona, deletePersona,
  getPreferencias, getPreferencia, getPreferenciasxDocente, getPreferenciasxSeccion, getPreferenciasxDepartamento, 
  registerPreferencia, updatePreferencia, deletePreferencia}
