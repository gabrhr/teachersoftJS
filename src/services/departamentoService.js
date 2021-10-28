import axios from 'axios'
import url from '../config'
import tokenService from './tokens.js';

const getDepartamentos = async () => {
    try{
        const request = await axios.get(`${url}/departamento/`);
        if(request.data.nombre){

        }
        return request.data;
    } catch(except){
        console.error(except);
    }
}
const getDepartamento = async ({id}) => {
    try{
        const request = await axios.get(`${url}/departamento/${id}`, id, tokenService.getToken());
        if(!request)
          return request.data;
    } catch (except){
        console.error(except);
    }
}
const registerDepartamento = async newObject => {
    try {
        const request = await axios.post(`${url}/departamento/`,tokenService.getToken(), newObject);
        return request.data;
    } catch(except) {
        console.error(except)
    }
}
const borrarDepartamento = async (id) => {
    try{
        const request = await axios.borrar(`${url}/departamento/${id}`,tokenService.getToken(),id);
        return request.data;
    } catch(exception) {
        console.error(exception);
    }
}
const updateDepartamento = async (newObject,{id}) => {
    try{
        const request = await axios.put(`${url}/departamento/${id}`, tokenService.getToken(),id);
        return request.data;
    } catch(exception){
        console.error(exception)
    }
}

export default { getDepartamentos, getDepartamento, registerDepartamento, borrarDepartamento, updateDepartamento };
