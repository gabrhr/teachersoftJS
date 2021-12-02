import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';
import { formatHorario, formatHorarioCursos } from '../components/auxFunctions';

export const getHorarios = async () => {
  try{
    //debugger;
    const request= await axios.get(`${url}/horario/`, tokenService.GetTokenPrueba()) //Todas las secciones
    return request.data;  
  }catch(exception){
    console.error(exception);
  }
}

export const getHorario = async (id) => {
  try{
    const request = await axios.get(`${url}/horario/${id}`,tokenService.GetTokenPrueba(),id);
    return request.data;  //Es un dato.
  }catch(exception){
    console.error(exception);
  }
}

export const buscarPorCiclo = async (id_ciclo) => {
  try {
    const request = await axios.get(`${url}/horario/idciclo=${id_ciclo}`, tokenService.GetTokenPrueba(), id_ciclo);
    return request.data;  //Es un dato.
  } catch (exception) {
    console.error(exception);
  }
}

export const listarPorCursoCiclo = async (id_curso,id_ciclo) => {
  try {
    const request = await axios.get(`${url}/horario/idcurso=${id_curso}/idciclo=${id_ciclo}`, tokenService.GetTokenPrueba(), id_curso, id_ciclo);
    return request.data;  //Es un dato.
  } catch (exception) {
    console.error(exception);
  }
}

export const listarPorDocenteCiclo = async (id_docente,id_ciclo) => {
  try {
    const request = await axios.get(`${url}/horario/iddocente=${id_docente}/idciclo=${id_ciclo}`, tokenService.GetTokenPrueba(), id_docente, id_ciclo);
    return request.data;  //Es un dato.
  } catch (exception) {
    console.error(exception);
  }
}

const registerHorario = async newObject => {
  try{           
    const request = await axios.post(`${url}/horario/`,newObject, tokenService.GetTokenPrueba());
    console.log(request.data);
    return request.data; //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const updateHorario = async (newObject) => {
  try{
    console.log(newObject);
    const request = await axios.put(`${url}/horario/`, newObject, tokenService.GetTokenPrueba());
    return request.data; //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const deleteHorario = async (id) => {
  try{
    const request = await axios.delete(`${url}/horario/${id}`, tokenService.GetTokenPrueba(),id);
    return request.data; //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}







//FUNCIONES ADICIONALES PARA RECUPERAR LAS SESIONES





const convertStringtoSesion = (sesion) => {
  const dataSes = []; 
  let substring = "";
  //let firstCharac = "";
  sesion.split("").forEach(character => {
    if(character === " "){
      /* RECUPERAMOS EL DIA */
      if(substring.toString()[0] >= "A" && substring.toString()[0] <= "z"){
        //console.log("Es dia: ", substring.toString().toLowerCase());
        switch(substring.toString().toLowerCase()){
          case "lunes":
            dataSes[0] = 0;
            break
          case "martes":
            dataSes[0] = 1;
            break
          case "miércoles" || "miercoles":
            dataSes[0] = 2;
            break
          case "jueves":
            dataSes[0] = 3;
            break
          case "viernes":
            dataSes[0] = 4;
            break
          case "sábado" || "sabado":
            dataSes[0] = 5;
            break
          default:
            console.error("No se puede leer el día")
            break
        }
      }
      /*RECUPERAMOS LA HORA DE INICIO*/
      else if(substring.toString()[0] >= "0" && substring.toString()[0] <= "9"){
        //console.log("Es numero: ", substring.toString().toLowerCase());
        dataSes[1] = parseInt(substring.substring(0,2));
        dataSes[2] = parseInt(substring.substring(3,5)) ? 1 : 0;
      }
      substring = "";
      return;
    }
    substring = substring + character;
  })
  /*RECUPERAMOS EL ULTIMO SUBSTRING - PARA HORA-FIN */
  substring = substring.toString().toLowerCase();
  //console.log("Es numero: ", substring.toString().toLowerCase());
  dataSes[3] = parseInt(substring.substring(0,2));
  dataSes[4] = parseInt(substring.substring(3,5)) ? 1 : 0;

  return dataSes;
}

const convertSesiontoString = async (dia_semana, hora_ini, media_horaini, hora_fin, media_horafin) => {
  let str = "";
  switch(dia_semana){
    case 0:
      str = str + "Lunes "
      break
    case 1:
      str = str + "Martes "
      break
    case 2:
      str = str + "Miércoles "
      break
    case 3:
      str = str + "Jueves "
      break
    case 4:
      str = str + "Viernes "
      break
    case 5:
      str = str + "Sábado "
      break
    default:
      break
  }
  //console.log(str);
  str = str.concat(hora_ini.toString() , ":" , media_horaini ? "30 - " : "00 - " , 
  hora_fin.toString() , ":" , media_horafin ? "30" : "00");
  //console.log(str);
  return str;
}

export default {listarPorDocenteCiclo, buscarPorCiclo, convertSesiontoString, convertStringtoSesion, getHorarios, getHorario, listarPorCursoCiclo, registerHorario, updateHorario, deleteHorario}
