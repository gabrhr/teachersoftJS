import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';

export const getTramitesSeccionDescarga = async () => {
    try{
      //debugger;
      const request= await axios.get(`${url}/tramitesecciondescarga/`, tokenService.GetTokenPrueba())
      return request.data;  
    }catch(exception){
      console.error(exception);
    }
}

export const getTramitesSeccionDescargaxSeccion = async (id_seccion) => {
  try{
    //debugger;
    const request= await axios.get(`${url}/tramitesecciondescarga/idseccion=${id_seccion}`, tokenService.GetTokenPrueba())
    return request.data;  
  }catch(exception){
    console.error(exception);
  }
}

export const getTramiteSeccionDescarga = async (id) => {
    try{
      //debugger;
      const request= await axios.get(`${url}/tramitesecciondescarga/${id}`,tokenService.GetTokenPrueba(),id);
      return request.data;  
    }catch(exception){
      console.error(exception);
    }
}

export const getTramiteSeccionDescargaxProceso = async (id) => {
  try{
    //debugger;
    const request= await axios.get(`${url}/tramitesecciondescarga/idproceso=${id}`,tokenService.GetTokenPrueba(),id);
    return request.data;  
  }catch(exception){
    console.error(exception);
  }
}

const registerTramitesSeccionDescarga = async newObject => {
    try{           
      const request = await axios.post(`${url}/tramitesecciondescarga/`,newObject, tokenService.GetTokenPrueba());
      console.log(request.data);
      return request.data; //Es un valor de true o no
    }catch(exception){
      console.error(exception);
    }
}

const updateTramitesSeccionDescarga = async (newObject) => {
    try{
      console.log(newObject);
      const request = await axios.put(`${url}/tramitesecciondescarga/`, newObject, tokenService.GetTokenPrueba());
      return request.data; //Es un valor de true o no
    }catch(exception){
      console.error(exception);
    }
}

const deleteTramitesSeccionDescarga = async (id) => {
    try{
      const request = await axios.delete(`${url}/tramitesecciondescarga/${id}`, tokenService.GetTokenPrueba(),id);
      return request.data; //Es un valor de true o no
    }catch(exception){
      console.error(exception);
    }
  }

export default {getTramitesSeccionDescarga, getTramiteSeccionDescarga, registerTramitesSeccionDescarga,
    updateTramitesSeccionDescarga, deleteTramitesSeccionDescarga, getTramitesSeccionDescargaxSeccion,
    getTramiteSeccionDescargaxProceso}