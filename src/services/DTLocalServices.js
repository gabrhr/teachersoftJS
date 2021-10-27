import { insertEmployee } from "./employeeService";
import { data } from "./data/curso-horario"

/* LIB
 * ======================= */

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

/* LOCAL STORAGE SERVICES
 * ====================== */

/* An IDs start at 1.  ID=0 is a reserved value used for the empty record */

const KEYS = {
    personaID: 'personaID',        // highest ID,  ID=0 means no data
    personas: 'personas'           // array
    cursoID: 'cursoID',
    cursos: 'cursos'
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
    /* Do any data transformations here (e.g., lookup ID's create new attributes
     * based on that) */
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

/* curso CRUD operations */
export function insertCurso(data) {
    let cursos = getAllCursos();
    data['id'] = generateCursoID()
    cursos.push(data)
    localStorage.setItem(KEYS.cursos, JSON.stringify(cursos))
}

export function updateCurso(data) {
    let cursos = getAllCursos();
    let recordIndex = cursos.findIndex(x => x.id == data.id)
    cursos[recordIndex] = {...data}
    localStorage.setItem(KEYS.cursos, JSON.stringify(cursos))
}

export function deleteCurso(id) {
    let cursos = getAllCursos();
    cursos = cursos.filter(x => x.id != id)
    localStorage.setItem(KEYS.cursos, JSON.stringify(cursos))
}

export function generateCursoID() {
    if (localStorage.getItem(KEYS.cursoID) == null)
        localStorage.setItem(KEYS.cursoID, '0')
    var id = parseInt(localStorage.getItem(KEYS.cursoID))
    localStorage.setItem(KEYS.cursoID, (++id).toString())
    return id;
}

export function getAllCursos() {
    /* if empty insert empty array */
    if (localStorage.getItem(KEYS.cursos) == null)
        localStorage.setItem(KEYS.cursos, JSON.stringify([]))
    let cursos =  JSON.parse(localStorage.getItem(KEYS.cursos));
    /* Do any data transformations here (e.g., lookup ID's create new attributes
     * based on that) */
    return cursos
    // return cursos.map( x => ({
    //     ...x,
    // }))
}