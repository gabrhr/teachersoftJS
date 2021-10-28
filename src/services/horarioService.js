import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';
import { formatHorario, formatHorarioCursos } from '../components/auxFunctions';

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


export default {getHorario, registerHorario, updateHorario, deleteHorario}
