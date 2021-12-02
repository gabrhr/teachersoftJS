import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';

// 1: TC (tiempo completo - 40 horas) ???
// 2: TPC (tiempo parcial convencional - 20 a 30 horas) ???
// 3: TPA (tiempo parcial por asignaturas) ???

// Axios para envio de data de cada tipo de profesor por seccion
const getDataProfesoresTCPorSeccion = async (id_ciclo,id_seccion) => {
    try{
      const request= await axios.get(`${url}/horario/promhoras/idciclo=${id_ciclo}/idseccion=${id_seccion}/tipodocente=1`, tokenService.GetTokenPrueba())
      return request.data;  
    }catch(exception){
      console.error(exception);
    }
}

const getDataProfesoresTPCPorSeccion = async (id_ciclo,id_seccion) => {
    try{
      const request= await axios.get(`${url}/horario/promhoras/idciclo=${id_ciclo}/idseccion=${id_seccion}/tipodocente=2`, tokenService.GetTokenPrueba())
      return request.data;  
    }catch(exception){
      console.error(exception);
    }
}

const getDataProfesoresTPAPorSeccion = async (id_ciclo,id_seccion) => {
    try{
      const request= await axios.get(`${url}/horario/promhoras/idciclo=${id_ciclo}/idseccion=${id_seccion}/tipodocente=3`, tokenService.GetTokenPrueba())
      return request.data;  
    }catch(exception){
      console.error(exception);
    }
}

// Axios para envio de data de cada tipo de profesor por departamento
const getDataProfesoresTCPorDepartamento = async (id_ciclo,id_departamento) => {
    try{
      const request= await axios.get(`${url}/horario/promhoras/idciclo=${id_ciclo}/iddepartamento=${id_departamento}/tipodocente=1`, tokenService.GetTokenPrueba())
      return request.data;  
    }catch(exception){
      console.error(exception);
    }
}

const getDataProfesoresTPCPorDepartamento = async (id_ciclo,id_departamento) => {
    try{
      const request= await axios.get(`${url}/horario/promhoras/idciclo=${id_ciclo}/iddepartamento=${id_departamento}/tipodocente=2`, tokenService.GetTokenPrueba())
      return request.data;  
    }catch(exception){
      console.error(exception);
    }
}

const getDataProfesoresTPAPorDepartamento = async (id_ciclo,id_departamento) => {
    try{
      const request= await axios.get(`${url}/horario/promhoras/idciclo=${id_ciclo}/iddepartamento=${id_departamento}/tipodocente=3`, tokenService.GetTokenPrueba())
      return request.data;  
    }catch(exception){
      console.error(exception);
    }
}

const getDataProfesoresDeuda = async () => {
  try{
    const request= await axios.get(`${url}/horario/deuda`, tokenService.GetTokenPrueba())
    return request.data;  
  }catch(exception){
    console.error(exception);
  }
}

const getDataProfesoresSobrecarga = async () => {
  try{
    const request= await axios.get(`${url}/horario/sobrecarga`, tokenService.GetTokenPrueba())
    return request.data;  
  }catch(exception){
    console.error(exception);
  }
}

export default {getDataProfesoresTCPorSeccion, getDataProfesoresTPCPorSeccion, getDataProfesoresTPAPorSeccion, getDataProfesoresTCPorDepartamento, getDataProfesoresTPCPorDepartamento, getDataProfesoresTPAPorDepartamento, getDataProfesoresDeuda, getDataProfesoresSobrecarga}
