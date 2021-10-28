import axios from "axios";
import { insertEmployee } from "./employeeService";
import tokenService from './tokens.js';

const POST_PERSONA_URL = 'http://localhost:8080/persona/';
const POST_USER_URL = 'http://localhost:8080/usuario/';
const GET_USER_URL = 'http://localhost:8080/usuario/';
const GET_DEPARTAMENTO_URL = 'http://localhost:8080/departamento/';
const GET_SECCION_URL = 'http://localhost:8080/seccion/porDepartamento=';

/* Validaciones
 * 
 * Todas retornan mensaje de error.  Empty string means valid.
 */

export function validateEmail(email) {
    return (/^$|^[A-Za-z_]+@[A-Za-z_]+\.[A-Za-z_\.]+$/).test(email)
        ? ""
        : "Correo electronico invalido"
}

/* nombre de persona (Peru) */
export function validateName(name) {
    return (/^$|^[A-Za-záéíóúñ -]+$/).test(name)
        ? ""
        : "Nombre invalido"
}

/* Returns error message,  */
export function requiredField(s) {
    return s.length !== 0 ? "" : "Campo requerido"
}

const KEYS = {
    personaID: 'personaID',        // highest assigned ID (to auto increment)
                                   // (0 when empty)
    personas: 'personas'           // array
}

/* persona CRUD operations */
export function insertPersona(data) {
    let personas = getAllPersonas();
    data['id'] = generatePersonaID()
    personas.push(data)
    localStorage.setItem(KEYS.personas, JSON.stringify(personas))
}

export function updatePersona(data) {
    let personas = getAllPersonas();
    let recordIndex = personas.findIndex(x => x.id == data.id)
    personas[recordIndex] = {...data}
    localStorage.setItem(KEYS.personas, JSON.stringify(personas))
}

export function deletePersona(id) {
    let personas = getAllPersonas();
    personas = personas.filter(x => x.id != id)
    localStorage.setItem(KEYS.personas, JSON.stringify(personas))
}

export function generatePersonaID() {
    if (localStorage.getItem(KEYS.personaID) == null)
        localStorage.setItem(KEYS.personaID, '0')
    var id = parseInt(localStorage.getItem(KEYS.personaID))
    localStorage.setItem(KEYS.personaID, (++id).toString())
    return id;
}

export function getAllPersonas() {
    /* if empty insert empty array */
    if (localStorage.getItem(KEYS.personas) == null)
        localStorage.setItem(KEYS.personas, JSON.stringify([]))
    let personas =  JSON.parse(localStorage.getItem(KEYS.personas));
    /* Add names to ID only attributes.  Add calculated fields. */
    /* Doing it here is more efficient (maybe) */
    let roles = getAllRoles();
    let secciones = getAllSecciones();
    let dptos = getAllDepartamentos();
    return personas.map( p => ({
        ...p,
        rolName: roles.find(r => r.id === p.rol).title,
        seccionName: secciones.find(s => s.id === p.seccion).title,
        departamentoName: dptos.find(d => d.id === p.departamento).title,
        fullName: p.apellidoPaterno + ' ' + p.apellidoMaterno 
                  + ', ' + p.nombres
    }))
}

/* seccion CRUD operations */
export function getAllSecciones() {
    return ([
        { id: 1, title: 'Informatica' },
        { id: 2, title: 'Telecomunicaciones' },
        { id: 3, title: 'Industrial' },
        { id: 4, title: 'Civil' },
        { id: 5, title: 'Mecanica' },
        { id: 6, title: 'Fisica' }
    ])
}

/* departamento CRUD operations */
export function getAllDepartamentos() {
    return ([
        { id: 1, title: 'FCI' }
    ])
}

/* rol CRUD operations */
export function getAllRoles() {
    return ([
        { id: 1, title: 'Administrador' },
        { id: 2, title: 'Asistente de Seccion' },
        { id: 3, title: 'Coordinador de Seccion' },
        { id: 4, title: 'Asistente de Departamento' },
        { id: 5, title: 'Coordinador de Departamento' },
    ])
}

class DTLocalServices {

    validateEmail(email) {
        return (/^$|^[A-Za-z_]+@[A-Za-z_]+\.[A-Za-z_\.]+$/).test(email)
            ? ""
            : "Correo electronico invalido"
    }

    validateName(name) {
        return (/^$|^[A-Za-záéíóúñ -]+$/).test(name)
            ? ""
            : "Nombre invalido"
    }

    requiredField(s) {
        return s.length !== 0 ? "" : "Campo requerido"
    }

    postUser(data){
        
        return axios.post(POST_USER_URL,data);
    }

    postPersona(data){
        
        return axios.post(POST_PERSONA_URL,data);
    }

    getUsers(){
        return axios.get(GET_USER_URL);
    }

    getDepartamentos(){
        return axios.get(GET_DEPARTAMENTO_URL);
    }

    /*getSecciones(id){
        return axios.get(GET_SECCION_URL + id);
    }*/

    getAllRoles() {
        return ([
            { id: 0, nombre: 'Administrador' },
            { id: 1, nombre: 'Docente' },
            { id: 2, nombre: 'Asistente de Seccion' },
            { id: 3, nombre: 'Coordinador de Seccion' },
            { id: 4, nombre: 'Asistente de Departamento' },
            { id: 5, nombre: 'Coordinador de Departamento' },
            { id: 6, nombre: 'Secretario de Departamento' },
            { id: 7, nombre: 'Externo' }
        ])
    }

    getAllSecciones() {
        return ([
            { id: 1, nombre: 'Informatica' },
            { id: 2, nombre: 'Telecomunicaciones' },
            { id: 3, nombre: 'Industrial' },
            { id: 4, nombre: 'Civil' },
            { id: 5, nombre: 'Mecanica' },
            { id: 6, nombre: 'Fisica' }
        ])
    }
}
export default new DTLocalServices();