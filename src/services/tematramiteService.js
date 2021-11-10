import axios from 'axios';
import url from '../config.js';
import tokenService from './tokens.js';

function fillTemas() {
    let temas = [];
    const tema1 = { id: 1 , nombre: 'Tema 1', seccion: 'Seccion 1'};
    const tema2 = { id: 2 , nombre: 'Tema 2', seccion: 'Seccion 1'};
    const tema3 = { id: 3 , nombre: 'Tema 3', seccion: 'Seccion 1'};
    const tema4 = { id: 4 , nombre: 'Tema 4', seccion: 'Seccion 2'};
    const tema5 = { id: 5 , nombre: 'Tema 5', seccion: 'Seccion 2'};
    const tema6 = { id: 6 , nombre: 'Tema 6', seccion: 'Seccion 2'};
    const tema7 = { id: 7 , nombre: 'Tema 7', seccion: 'Seccion 3'};
    const tema8 = { id: 8 , nombre: 'Tema 8', seccion: 'Seccion 3'};

    temas.push(tema1);
    temas.push(tema2);
    temas.push(tema3);
    temas.push(tema4);
    temas.push(tema5);
    temas.push(tema6);
    temas.push(tema7);
    temas.push(tema8);

    return temas;
}

/*Funciones "hardcodeadas*/

export const getTemaTramites = async () => {

    let temas = fillTemas();
    return temas;

}

export const getTemaTramite = async(id) => {

    let temas = fillTemas();
    let tema = null;

    for (let i = 0; i < temas.length; i++){
        if (temas[i].id == id){
            tema = temas[i];
            break;
        }
    }
    return tema;
}

const getTemaTramitexSeccion = async (id_seccion) => {
    return true;
  }

export const registerTemaTramite = async newObject => {
    
    return true;
}

export const updateTemaTramite = async  (newObject, id) => {
    
    return true;
}


export const deleteTemaTramite = async (id) => {
    
    return true;
}

export default {getTemaTramites, getTemaTramite, getTemaTramitexSeccion, registerTemaTramite, updateTemaTramite, deleteTemaTramite}