import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';

function fillTemas() {
    let temas = [];
    const tema1 = { id: 1 , nombre: 'Tema 1', seccion: { id: 1, nombre: 'Seccion 1' } };
    const tema2 = { id: 2 , nombre: 'Tema 2', seccion: { id: 1, nombre: 'Seccion 1' } };
    const tema3 = { id: 3 , nombre: 'Tema 3', seccion: { id: 1, nombre: 'Seccion 2' } };
    const tema4 = { id: 4 , nombre: 'Tema 4', seccion: { id: 2, nombre: 'Seccion 2' } };
    const tema5 = { id: 5 , nombre: 'Tema 5', seccion: { id: 3, nombre: 'Seccion 3' } };
 
    temas.push(tema1);
    temas.push(tema2);
    temas.push(tema3);
    temas.push(tema4);
    temas.push(tema5);
 

    return temas;
}

let listTemas = fillTemas();

/*Funciones "hardcodeadas*/

const getTemaTramites = async () => {
    try{
        const request = await axios.get(
            `${url}/tema/`,
            tokenService.GetTokenPrueba());
        //console.log(request)
        return request.data;
    }catch(err){
        console.error(err);
    }
    //console.log(listTemas);
}

//const getTemaTramites = ()

 const getTemaTramite = async (id) => {
    try{
        const request = await axios.get(
            `${url}/tema/${id}`,
            tokenService.GetTokenPrueba(),
            id);
        //console.log(request.data);
        return request.data;
    }catch (err) {
        console.log(err);
    }

}

const getTemaTramitexSeccion = async (id_seccion) => {

    try{
        const request = await axios.get(
            `${url}/tema/idseccion=${id_seccion}`,
            tokenService.GetTokenPrueba(),
            id_seccion);
        //console.log(request.data);
        return request.data;
    }catch (err) {
        console.log(err);
    }
}

const registerTemaTramite =  async (newObject) => {
    
    try{
        const request = axios.post(`${url}/tema/`,
            newObject,
            tokenService.GetTokenPrueba());
        //console.log(request.data);
        return request.data;
    }
    catch(exception){
        console.error(exception);
    }
}

const updateTemaTramite = async (newObject, id) => {
    try{
        const request = await axios.put(
            `${url}/tema/`,
            newObject,
            tokenService.GetTokenPrueba());
        return request.data;
    }catch(err){
        console.error(err);
    }
}


const deleteTemaTramite =  async (id) => {
    try {
        const request = await axios.delete(
            `${url}/tema/${id}`,
            tokenService.GetTokenPrueba(),
            id);
        return request.data;
    }catch(err) {
        console.error(err);
    }


}

export default {getTemaTramites, getTemaTramite, getTemaTramitexSeccion, registerTemaTramite, updateTemaTramite, deleteTemaTramite}