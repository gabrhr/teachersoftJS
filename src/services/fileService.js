import axios from 'axios'
import url from '../config'
import tokenService from './tokens.js';

const registerArchivo = async newObject => {
    try {
        //const request = await axios.post(${url}/departamento/,tokenService.getToken(), newObject);
        const response = await axios.post(`${url}/archivo/`, newObject, tokenService.GetTokenPrueba())
        return response;
    } catch(except) {
        console.error(except)
    }
}

export default {registerArchivo};