import axios from 'axios';
import url from '../config.js';
import { formatHorario, formatHorarioCursos } from '../components/auxFunctions';

const getSecciones = async () => {
  try{
    const request = await axios.get(`${url}/seccion/`); //Todas las secciones
    return request.then(response => response.data)
  }catch(exception){
    console.error(exception);
  }
}

const getSeccionxDepartamento = async ({id_departamento}) => {
  try{
    const request = await axios.get(`${url}/seccion/porDepartamento=${id_departamento}`, id_departamento);  //Es un entero que se pasa
    return request.then(response => response.data)
  }catch(exception){
    console.error(exception);
  }
}

const getSeccion = async ({id}) => {
  try{
    const request = await axios.get(`${url}/seccion/${id}`, id);
    return request.then(response => response.data)  //Es un dato.
  }catch(exception){
    console.error(exception);
  }
}

const registerSeccion = async newObject => {
  try{
    const request = await axios.post(`${url}/seccion/`, newObject);
    return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const updateSeccion = async (newObject, {id}) => {
  try{
    const request = await axios.put(`${url}/seccion/${id}`, newObject, id);
    return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const deleteSeccion = async ({id}) => {
  try{
    const request = await axios.delete(`${url}/seccion/${id}`, id);
    return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

export const getHorario = async ({id}) => {

    return   [
      formatHorario('0', 'INF231','Curso A',  '3 horas', '801', 'Clase', 'Vie 18:00 - 21:00'),
      formatHorario('1', 'INF111', 'Curso A', '3 horas', '801', 'Clase', 'Vie 18:00 - 21:00'),
      formatHorario('2', 'INF341', 'Curso A', '3 horas', '801', 'Clase', 'Vie 18:00 - 21:00'),
    ]
  
}

const registerHorario = async newObject => {
  try{
    const request = await axios.post(`${url}/horario/`, newObject);
    return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const updateHorario = async (newObject, {id}) => {
  try{
    const request = await axios.put(`${url}/horario/${id}`, newObject, id);
    return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const deleteHorario = async ({id}) => {
  try{
    const request = await axios.delete(`${url}/horario/${id}`, id);
    return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}


export default {getSecciones, getSeccionxDepartamento, getSeccion, registerSeccion, updateSeccion, deleteSeccion, getHorario, registerHorario, updateHorario, deleteHorario}