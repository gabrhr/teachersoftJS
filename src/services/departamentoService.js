import axios from 'axios'
import url from '../config'

const getDepartamentos = async () => {
    try{
        const request = await axios.get(`${url}/departamento/`);
        return request
    } catch(except){
        console.error(except);
    }
}
const getDepartamento = async ({id}) => {
    try{
        const request = await axios.get(`${url}/departamento/${id}`, id);
        if(!request) 
        return request.then(response => response.data)
    } catch (except){
        console.error(except);
    }
}
const registerDepartamento = async newObject => {
    try {
        const request = await axios.post(`${url}/departamento/`, newObject);
        return request.then(response  => response.data);
    } catch(except) {
        console.error(except)
    }
}
const borrarDepartamento = async (id) => {
    try{
        const request = await axios.borrar(`${url}/departamento/${id}`,id);
        return request.then(response => response.data) 
    } catch(exception) {
        console.error(exception);
    }
}
const updateDepartamento = async (newObject,{id}) => {
    try{
        const request = await axios.put(`${url}/departamento/${id}`, id);
        return request.then(response => response.data)
    } catch(exception){
        console.error(exception)
    }
}

export default { getDepartamentos, getDepartamento, registerDepartamento, borrarDepartamento, updateDepartamento };