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

export const getTemaTramites = () => {

    return listTemas;

}

export const getTemaTramite = (id) => {

    let temas = listTemas;
    let tema = null;

    for (let i = 0; i < temas.length; i++){
        if (temas[i].id == id){
            tema = temas[i];
            break;
        }
    }
    return tema;
}

const getTemaTramitexSeccion =  (id_seccion) => {

    let auxTemas = [];
    let auxTema;
    for (let i = 0; i < listTemas.length; i++){
        if (id_seccion == listTemas[i].seccion.id){
            auxTema = listTemas[i]
            auxTemas.push(auxTema);
        }
    }   
    return auxTemas;
}

export const registerTemaTramite =  newObject => {
    
    try{
        newObject.id = listTemas.length;
        listTemas.push(newObject)
        return true;
    }
    catch(exception){
        console.error(exception);
        return false;
    }


    
}

export const updateTemaTramite = (newObject, id) => {
 
    let auxTema = null;
    for (let i = 0; i < listTemas.length; i++){
        if (id == listTemas[i].id){
            auxTema = listTemas[i];
            auxTema.nombre = newObject.nombre;
            auxTema.seccion.id = newObject.seccion.id;
            auxTema.seccion.nombre = newObject.seccion.nombre;
            listTemas[i] = auxTema;
            return true;
        }
    }   
    return false;
}


export const deleteTemaTramite =  (id) => {
    
    let auxTema = null;
    for (let i = 0; i < listTemas.length; i++){
        if (id == listTemas[i].id){
            listTemas.splice(i,1);
            return true;
        }
    }   
    return false;

}

export default {getTemaTramites, getTemaTramite, getTemaTramitexSeccion, registerTemaTramite, updateTemaTramite, deleteTemaTramite}