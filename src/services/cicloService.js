import axios from 'axios';
import url from '../config.js';

const getCiclos = async () => {
  try{
    const request = await axios.get(`${url}/ciclo/`);
    return request.then(response => response.data)
  }catch(exception){
    console.error(exception);
  }
}

const getCiclo = async ({id}) => {
  try{
    const request = await axios.get(`${url}/ciclo/${id}`, id);
    //const request = await axios.get(`${url}/ciclo/${id}`);
    return request.then(response => response.data)  //Es un dato.
  }catch(exception){
    console.error(exception);
  }
}

const registerCiclo = async newObject => {
  try{
    const request = await axios.post(`${url}/ciclo/`, newObject);
    return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const updateCiclo = async (newObject, {id}) => {
  try{
    const request = await axios.put(`${url}/ciclo/${id}`, newObject, id);
    return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const deleteCiclo = async ({id}) => {
  try{
    const request = await axios.delete(`${url}/ciclo/${id}`, id);
    return request.then(response => response.data) //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

export default {getCiclos, getCiclo, registerCiclo, updateCiclo, deleteCiclo}