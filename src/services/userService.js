import axios from 'axios'
import url from '../config'
import tokenService from './tokens.js';

const getUsuarios = async () => {
    console.log(`${url}/usuario/`)
    try{
        const request = await axios.get(`${url}/usuario/`);
        return request.data;
    } catch(except){
        console.error(except);
    }
}
const getUsuario = async (id) => {
    
    try{
        const request = await axios.get(`${url}/usuario/${id}`, id, tokenService.GetTokenPrueba());
        return request.data;
    } catch (except){
        console.error(except);
    }
}
const registerUsuario = async newObject => {
    try {
        const request = await axios.post(`${url}/usuario/`, newObject);
        return request.data;
    } catch(except) {
        console.error(except)
    }
}
const borrarUsuario = async (id) => {
    try{
        const request = await axios.delete(`${url}/usuario/${id}`,id);
        return request.data;
    } catch(exception) {
        console.error(exception);
    }
}
const updateUsuario = async (newObject, {id}) => {
    
    try{
        const request = await axios.put(`${url}/usuario/${id}`,newObject,id);
        return request.data;
    } catch(exception){
        console.error(exception)
    }
}

export default { getUsuarios, getUsuario, registerUsuario, borrarUsuario, updateUsuario };