import axios from 'axios'
import url from '../config'
import tokenService from './tokens.js';

const getDocumentos = async () => {
    try{
        const request = await axios.get(`${url}/documento/`, tokenService.GetTokenPrueba());
        return request.data;
    } catch(except){
        console.error(except);
    }
}
const getDocumentosAutor = async (id_autor) => {
    try{
        const request = await axios.get(`${url}/documento/idautor=${id_autor}`, tokenService.GetTokenPrueba(), id_autor);
        return request.data;
    } catch(except){
        console.error(except);
    }
}
const getDocumentosPagina = async (pagina) => {
    try{
        const request = await axios.get(`${url}/documento/page=${pagina}`, tokenService.GetTokenPrueba(), pagina);
        return request.data;
    } catch(except){
        console.error(except);
    }
}
const contarTodos = async () => {
    try{
        const request = await axios.get(`${url}/documento/size`, tokenService.GetTokenPrueba());
        return request.data;
    } catch(except){
        console.error(except);
    }
}
const getDocumento = async (id) => {
    try{
        //const request = await axios.get(`${url}/departamento/${id}`, id, tokenService.getToken());
        const request = await axios.get(`${url}/documento/${id}`, tokenService.GetTokenPrueba(),id);
        return request.data;
    } catch (except){
        console.error(except);
    }
}
const registerDocumento = async newObject => {
    try {
        //const request = await axios.post(`${url}/departamento/`,tokenService.getToken(), newObject);
        const request = await axios.post(`${url}/documento/`, newObject, tokenService.GetTokenPrueba());
        return request.data;
    } catch(except) {
        console.error(except)
    }
}

const updateDocumento = async (newObject,id) => {
    try{
        console.log(newObject)
        //const request = await axios.put(`${url}/departamento/${id}`, tokenService.getToken(),id);
        const request = await axios.put(`${url}/documento/`,newObject, tokenService.GetTokenPrueba());
        return request.data;
    } catch(exception){
        console.error(exception)
    }
}
const deleteDocumento = async (id) => {
    try{
        //const request = await axios.delete(`${url}/departamento/${id}`,tokenService.getToken(),id);
        const request = await axios.delete(`${url}/documento/${id}`, tokenService.GetTokenPrueba(), id);
        return request.data;
    } catch(exception) {
        console.error(exception);
    }
}

export default { getDocumentos, getDocumentosAutor, getDocumentosPagina, contarTodos, getDocumento, registerDocumento, updateDocumento, deleteDocumento };