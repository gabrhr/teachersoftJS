import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';

function fillTipos() {
    let tipos = [];
    const tipo1 = { id: 1 , nombre: 'tipo 1'};
    const tipo2 = { id: 2 , nombre: 'tipo 2'};
    const tipo3 = { id: 3 , nombre: 'tipo 3'};
    const tipo4 = { id: 4 , nombre: 'tipo 4'};
    const tipo5 = { id: 5 , nombre: 'tipo 5'};
    const tipo6 = { id: 6 , nombre: 'tipo 6'};
    const tipo7 = { id: 7 , nombre: 'tipo 7'};
    const tipo8 = { id: 8 , nombre: 'tipo 8'};
    
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

let listTipos = filltipos();


/*Funciones "hardcodeadas*/

export const getTipoTramites = () => {

    return listTipos;

}

export const getTipoTramite = (id) => {

    let tipos = listTipos;
    let tipo = null;

    for (let i = 0; i < tipos.length; i++){
        if (tipos[i].id == id){
            tipo = tipos[i];
            break;
        }
    }
    return tipo;
}

 
export const registerTipoTramite =  newObject => {
    
    try{
        newObject.id = listTipos.length;
        listTipos.push(newObject)
        return true;
    }
    catch(exception){
        console.error(exception);
        return false;
    }


    
}

export const updateTipoTramite = (newObject, id) => {
 
    let auxTipo = null;
    for (let i = 0; i < listTipos.length; i++){
        if (id == listTipos[i].id){
            auxTipo = listTipos[i];
            auxTipo.nombre = newObject.nombre;
            listTipos[i] = auxTipo;
            return true;
        }
    }   
    return false;
}


export const deleteTipoTramite =  (id) => {
    
    let auxTipo = null;
    for (let i = 0; i < listTipos.length; i++){
        if (id == listTipos[i].id){
            listTipos.splice(i,1);
            return true;
        }
    }   
    return false;

}

export default {getTipoTramites, getTipoTramite, registerTipoTramite, updateTipoTramite, deleteTipoTramite}