import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';

function fillTipos() {
    let tipos = [];
    const tipo1 = { id: 1 , nombre: 'tipo 1', id_tema : 1};
    const tipo2 = { id: 2 , nombre: 'tipo 2', id_tema : 1};
    const tipo3 = { id: 3 , nombre: 'tipo 3', id_tema : 1};
    const tipo4 = { id: 4 , nombre: 'tipo 4', id_tema : 2};
    const tipo5 = { id: 5 , nombre: 'tipo 5', id_tema : 2};
    const tipo6 = { id: 6 , nombre: 'tipo 6', id_tema : 3};
    const tipo7 = { id: 7 , nombre: 'tipo 7', id_tema : 3};
    const tipo8 = { id: 8 , nombre: 'tipo 8', id_tema : 4};
    
    tipos.push(tipo1);
    tipos.push(tipo2);
    tipos.push(tipo3);
    tipos.push(tipo4);
    tipos.push(tipo5);
    tipos.push(tipo6);
    tipos.push(tipo7);
    tipos.push(tipo8);

    return tipos;
}

let listTipos = fillTipos();


/*Funciones "hardcodeadas*/

const getTipoTramites = async () => {
    try{
        const request = await axios.get(`${url}/tipo/`, tokenService.GetTokenPrueba());
        //console.log(request);
        return request.data;
    }catch(err){
        console.error(err);
    }
}

const getTipoTramite = async (idTipoTramite) => {

    try{
        const request = await axios.get(
            `${url}/tipo/${idTipoTramite}`,
            tokenService.GetTokenPrueba(),
            idTipoTramite);
        return request.data;
    }catch(err){
        console.error(err);
    } 
}

const getTipoTramitexTemaTramite =  async (id_tramite) => {
    try{
        const request = await axios.get(
            `${url}/tipo/idtema=${id_tramite}`,
            tokenService.GetTokenPrueba(),
            id_tramite);
        return request.data;
    }catch(err){
        console.log(err);
    }
}

 
const registerTipoTramite =  async (newObject) => {
    try{
        const request = await axios.put(
            `${url}/tipo/`,
            newObject,
            tokenService.GetTokenPrueba());
        return request.data;
    }
    catch(exception){
        console.error(exception);
        //return false;
    }
}

export const updateTipoTramite = async (newObject, id) => {
    try{
        const request = await axios.put(
            `${url}/tipo/`,
            newObject,
            tokenService.GetTokenPrueba());
        return request.data;
    }catch(err){
        console.error(err);
    }

}

export const deleteTipoTramite = async (idTipo) => {
    try {
        const request = await axios.delete(
            `${url}/tipo/${idTipo}`,
            tokenService.GetTokenPrueba(),
            idTipo);
        return request.data;
    }catch(err) {
        console.error(err);
    }

}

export default {getTipoTramites, getTipoTramite, getTipoTramitexTemaTramite, registerTipoTramite, updateTipoTramite, deleteTipoTramite}