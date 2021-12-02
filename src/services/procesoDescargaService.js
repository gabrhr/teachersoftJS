import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';

export const getProcesosDescarga = async () => {
    try{
      //debugger;
      const request= await axios.get(`${url}/procesodescarga/`, tokenService.GetTokenPrueba())
      return request.data;  
    }catch(exception){
      console.error(exception);
    }
}

export const getProcesoDescargaActivoxDepartamento = async (id_departamento) => {
  try{
    //debugger;
    const request= await axios.get(`${url}/procesodescarga/iddepartamento=${id_departamento}`,tokenService.GetTokenPrueba());
    return request.data;  
  }catch(exception){
    console.error(exception);
  }
}

export const getProcesoDescarga = async (id) => {
    try{
      //debugger;
      const request= await axios.get(`${url}/procesodescarga/${id}`,tokenService.GetTokenPrueba(),id);
      return request.data;  
    }catch(exception){
      console.error(exception);
    }
}

const registerProcesoDescarga = async newObject => {
    try{           
      const request = await axios.post(`${url}/procesodescarga/`,newObject, tokenService.GetTokenPrueba());
      console.log(request.data);
      return request.data; //Es un valor de true o no
    }catch(exception){
      console.error(exception);
    }
}

const updateProcesoDescarga = async (newObject) => {
    try{
      console.log(newObject);
      const request = await axios.put(`${url}/procesodescarga/`, newObject, tokenService.GetTokenPrueba());
      return request.data; //Es un valor de true o no
    }catch(exception){
      console.error(exception);
    }
}

const deleteProcesoDescarga = async (id) => {
    try{
      const request = await axios.delete(`${url}/procesodescarga/${id}`, tokenService.GetTokenPrueba(),id);
      return request.data; //Es un valor de true o no
    }catch(exception){
      console.error(exception);
    }
  }

  export default {getProcesosDescarga, getProcesoDescarga, registerProcesoDescarga, updateProcesoDescarga, 
    deleteProcesoDescarga, getProcesoDescargaActivoxDepartamento}
