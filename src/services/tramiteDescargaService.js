import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';

export const getTramitesDescarga = async () => {
    try{
      //debugger;
      const request= await axios.get(`${url}/tramitedescarga/`, tokenService.GetTokenPrueba())
      return request.data;  
    }catch(exception){
      console.error(exception);
    }
}

export const getTramitesDescargaHistoricoxDocente = async (id) => {
  try{
    //debugger;
    const request= await axios.get(`${url}/tramitedescarga/iddocente=${id}`, tokenService.GetTokenPrueba())
    return request.data;  
  }catch(exception){
    console.error(exception);
  }
}

export const getTramitesDescargaHistoricoxDocentexCiclo = async (id_docente, id_ciclo) => {
  try{
    //debugger;
    const request= await axios.get(`${url}/tramitedescarga/iddocente=${id_docente}/idciclo=${id_ciclo}`, tokenService.GetTokenPrueba())
    return request.data;  
  }catch(exception){
    console.error(exception);
  }
}

export const getTramitesDescargaPendientesxProcesoxSeccion = async (id_proceso, id_seccion) => {
  try{
    //debugger;
    const request= await axios.get(`${url}/tramitedescarga/idproceso=${id_proceso}/idseccion=${id_seccion}`, tokenService.GetTokenPrueba())
    return request.data;  
  }catch(exception){
    console.error(exception);
  }
}

export const getTramiteDescarga = async (id) => {
    try{
      //debugger;
      const request= await axios.get(`${url}/tramitedescarga/${id}`,tokenService.GetTokenPrueba(),id);
      return request.data;  
    }catch(exception){
      console.error(exception);
    }
}

const registerTramiteDescarga = async newObject => {
    try{           
      const request = await axios.post(`${url}/tramitedescarga/`,newObject, tokenService.GetTokenPrueba());
      console.log(request.data);
      return request.data; //Es un valor de true o no
    }catch(exception){
      console.error(exception);
    }
}

const updateTramiteDescarga = async (newObject) => {
    try{
      console.log(newObject);
      const request = await axios.put(`${url}/tramitedescarga/`, newObject, tokenService.GetTokenPrueba());
      return request.data; //Es un valor de true o no
    }catch(exception){
      console.error(exception);
    }
}

const deleteTramiteDescarga = async (id) => {
    try{
      const request = await axios.delete(`${url}/tramitedescarga/${id}`, tokenService.GetTokenPrueba(),id);
      return request.data; //Es un valor de true o no
    }catch(exception){
      console.error(exception);
    }
  }

  export default {getTramitesDescarga, getTramiteDescarga, registerTramiteDescarga, updateTramiteDescarga, 
    deleteTramiteDescarga, getTramitesDescargaHistoricoxDocente, getTramitesDescargaHistoricoxDocentexCiclo,
    getTramitesDescargaPendientesxProcesoxSeccion}
