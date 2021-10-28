import axios from 'axios';
import url from '../config.js';

const getHorarioxCiclo = async ({ciclo}) =>{
    try{
        const request = await axios.get(`${url}/`);
        return request.then(response => response.data)
      }catch(exception){
        console.error(exception);
      }
}

export default {getHorarioxCiclo}