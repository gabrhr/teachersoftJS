/* Author: Angel (aka. El Gato, QWERTY)
 *
 * Servicio de subida y bajada de archivos para Solicitudes de Mesa de Partes.
 */
import axios from 'axios'
import url from '../config'
import tokenService from './tokens.js';

const getArchivos = async () => {
    try{
        const request = await axios.get(`${url}/archivo/`, tokenService.GetTokenPrueba());
        return request.data;
    } catch(except){
        console.error(except);
    }
}
const getArchivosSolicitud = async (id_solicitud) => {
    try{
        const request = await axios.get(`${url}/archivo/idsolicitud=${id_solicitud}`, tokenService.GetTokenPrueba());
        return request.data;
    } catch(except){
        console.error(except);
    }
}
const getArchivo = async (id) => {
    try{
        //const request = await axios.get(`${url}/departamento/${id}`, id, tokenService.getToken());
        const request = await axios.get(`${url}/archivo/${id}`, tokenService.GetTokenPrueba(),id);
        return request.data;
    } catch (except){
        console.error(except);
    }
}
const registerArchivo = async newObject => {
    try {
        //const request = await axios.post(`${url}/departamento/`,tokenService.getToken(), newObject);
        const request = await axios.post(`${url}/archivo/`, newObject, tokenService.GetTokenPrueba());
        return request.data;
    } catch(except) {
        console.error(except)
    }
}

const updateArchivo = async (newObject,id) => {
    try{
        console.log(newObject)
        //const request = await axios.put(`${url}/departamento/${id}`, tokenService.getToken(),id);
        const request = await axios.put(`${url}/archivo/`,newObject, tokenService.GetTokenPrueba());
        return request.data;
    } catch(exception){
        console.error(exception)
    }
}
const deleteArchivo = async (id) => {
    try{
        //const request = await axios.delete(`${url}/departamento/${id}`,tokenService.getToken(),id);
        const request = await axios.delete(`${url}/archivo/${id}`, tokenService.GetTokenPrueba());
        return request.data;
    } catch(exception) {
        console.error(exception);
    }
}

export default { getArchivos, getArchivosSolicitud, getArchivo, registerArchivo, deleteArchivo, updateArchivo };