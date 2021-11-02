import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';
import { formatHorario, formatHorarioCursos } from '../components/auxFunctions';

export const getHorarios = async () => {
  try{
    //debugger;
    const request= await axios.get(`${url}/horario/`) //Todas las secciones
    return request.data;  
  }catch(exception){
    console.error(exception);
  }
}

export const getHorario = async ({id}) => {
  try{
    const request = await axios.get(`${url}/horario/${id}`,id);
    return request.data;  //Es un dato.
  }catch(exception){
    console.error(exception);
  }
}

const registerHorario = async newObject => {
  try{           
    const request = await axios.post(`${url}/horario/`, newObject);
    console.log(request.data);
    return request.data; //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const updateHorario = async (newObject, {id}) => {
  try{
    //console.log(newObject);
    const request = await axios.put(`${url}/horario/${id}`, newObject, id);
    return request.data; //Es un valor de true o no
  }catch(exception){
    console.error(exception);
  }
}

const deleteHorario = async ({id}) => {
  try{
    const request = await axios.delete(`${url}/horario/${id}`, id);
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
        console.log("Es dia: ", substring.toString().toLowerCase());
        switch(substring.toString().toLowerCase()){
          case "lunes":
            dataSes[0] = 0;
            break
          case "martes":
            dataSes[0] = 1;
            break
          case "miercoles" || "miércoles":
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
        console.log("Es numero: ", substring.toString().toLowerCase());
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
  console.log("Es numero: ", substring.toString().toLowerCase());
  dataSes[3] = parseInt(substring.substring(0,2));
  dataSes[4] = parseInt(substring.substring(3,5)) ? 1 : 0;



  console.log(dataSes);
  return dataSes;
}

export default {convertStringtoSesion, getHorarios, getHorario, registerHorario, updateHorario, deleteHorario}
