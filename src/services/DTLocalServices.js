/* Author: Mitsuo
 *
 * LocalStorage services for testing:
 * - persona
 * - curso
 *
 * Import like this:
import * as DTLocalServices from '../../services/DTLocalServices';
 */

import { insertEmployee } from "./employeeService";
import { data } from "./data/curso-horario"

/* LIB
 * ======================= */

export function getRolName(rolID) {
    let rolName
    if (rolID == 0) {
        rolName = "Administrador"
    } else if (rolID == 1) {
        rolName = "Docente"
    } else if (rolID == 2) {
        rolName = "Asistente de Sección"
    } else if (rolID == 3) {
        rolName = "Coordinador de Sección"
    } else if (rolID == 4) {
        rolName = "Asistente de Departamento"
    } else if (rolID == 5) {
        rolName = "Jefe de Departamento"
    } else if (rolID == 6) {
        rolName = "Secretaria de Departamento"
    } else if (rolID == 7) {
        rolName = "Usuario Externo"
    } else if (rolID == 8) {
        rolName = "Usuario Nuevo"
    }
    return rolName
}

/* Filter array `items` by `items[i].key` for substring searchText.
 * Ignores case and accents */
export function filter(items, key, searchText) {
    return items.filter(x =>
        removeAccents(x[key])
            .toLowerCase()
            .includes(
                removeAccents(searchText)
                    .toLowerCase()
            )
    )
}

/* remove accents from string (i.g. áéíóúñ -> aeioun) */
export function removeAccents(s) {
    /* first get Unicode "Canonical Decomposition" and then remove
       "accent code point modifiers" */
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

/* Validaciones
 *
 * Todas retornan mensaje de error.  Empty string means valid.
 */

export function validateEmail(email) {
    return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)
        ? ""
        : "Correo electronico invalido"
}

/* nombre de persona (Peru) */
export function validateName(name) {
    return (/^$|^[A-Za-záéíóúñ -]+$/).test(name)
        ? ""
        : "Nombre invalido"
}

/* dni (8 digitos) */
export function validateDni(s) {
    return (/^\d{8}$/).test(s)
        ? ""
        : "El DNI debe tener 8 dígitos"
}

/* telefono (9 digitos) */
export function validateTelefono(s) {
    return (/^\d{9}$/).test(s)
        ? ""
        : "El número de celular debe tener 9 dígitos"
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
    personas: 'personas',           // array
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
    personas[recordIndex] = { ...data }
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
    let personas = JSON.parse(localStorage.getItem(KEYS.personas));
    /* Do any data transformations here (e.g., lookup ID's create new attributes
     * based on that) */
    let roles = getAllRoles();
    let secciones = getAllSecciones();
    let dptos = getAllDepartamentos();
    return personas.map(p => ({
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
        { id: 0, nombre: 'Administrador' },
        { id: 1, nombre: 'Docente' },
        { id: 2, nombre: 'Asistente de Seccion' },
        { id: 3, nombre: 'Coordinador de Seccion' },
        { id: 4, nombre: 'Asistente de Departamento' },
        { id: 5, nombre: 'Jefe de Departamento' },
        { id: 6, nombre: 'Secretario de Departamento' },
        { id: 7, nombre: 'Externo' },
        { id: 8, nombre: 'Nuevo Usuario' },
        { id: 9, nombre: 'Asistente de Investigación' },
    ])
}

/* curso CRUD operations */
const initCursoData = () => [
    {
        id: 2,
        fecha_creacion: "2021-10-06T21:18:56.000+00:00",
        fecha_modificacion: "2021-10-06T21:18:56.000+00:00",
        codigo: "881",
        horas_semanales: 0,
        ciclo: {
            id: 9,
            fecha_creacion: "2021-09-30T00:00:00.000+00:00",
            fecha_modificacion: "2021-09-30T00:00:00.000+00:00",
            anho: 2019,
            periodo: 0,
            fecha_inicio: "2019-03-02",
            fecha_fin: "2019-01-21"
        },
        curso: {
            id: 2,
            fecha_creacion: "2021-09-30T01:50:39.000+00:00",
            fecha_modificacion: "2021-09-30T01:50:39.000+00:00",
            seccion: {
                id: 2,
                fecha_creacion: "2021-09-30T01:15:40.000+00:00",
                fecha_modificacion: "2021-09-30T01:15:40.000+00:00",
                departamento: {
                    id: 1,
                    fecha_creacion: "2021-09-30T01:14:32.000+00:00",
                    fecha_modificacion: "2021-09-30T01:14:32.000+00:00",
                    nombre: "Facultad De Ciencias e Ingeniería",
                    correo: "fci@pucp.edu.pe",
                    foto: null,
                    fecha_fundacion: "2021-09-30T01:14:32.000+00:00"
                },
                nombre: "Telecomunicaciones",
                foto: null,
                fecha_fundacion: "2021-09-30T01:15:40.000+00:00"
            },
            nombre: "Técnicas de programación",
            codigo: "INF144",
            creditos: 5.0
        },
        profesores: [
            {
                id: 1,
                fecha_creacion: "2021-09-30T01:09:19.000+00:00",
                fecha_modificacion: "2021-09-30T01:09:19.000+00:00",
                tipo_persona: 0,
                codigo_pucp: "20172665",
                correo_pucp: "a20172665@pucp.edu.pe",
                nombres: "Christian Andre",
                apellido_paterno: "Carhuancho",
                apellido_materno: null,
                fechaNac: null,
                sexo: 0,
                tipo_documento: 0,
                numero_documento: null,
                telefono: null,
                foto: null,
                seccion: {
                    id: 2,
                    fecha_creacion: "2021-09-30T01:15:40.000+00:00",
                    fecha_modificacion: "2021-09-30T01:15:40.000+00:00",
                    departamento: {
                        id: 1,
                        fecha_creacion: "2021-09-30T01:14:32.000+00:00",
                        fecha_modificacion: "2021-09-30T01:14:32.000+00:00",
                        nombre: "Facultad De Ciencias e Ingeniería",
                        correo: "fci@pucp.edu.pe",
                        foto: null,
                        fecha_fundacion: "2021-09-30T01:14:32.000+00:00"
                    },
                    nombre: "Telecomunicaciones",
                    foto: null,
                    fecha_fundacion: "2021-09-30T01:15:40.000+00:00"
                },
                departamento: {
                    id: 1,
                    fecha_creacion: "2021-09-30T01:14:32.000+00:00",
                    fecha_modificacion: "2021-09-30T01:14:32.000+00:00",
                    nombre: "Facultad De Ciencias e Ingeniería",
                    correo: "fci@pucp.edu.pe",
                    foto: null,
                    fecha_fundacion: "2021-09-30T01:14:32.000+00:00"
                }
            }
        ],
        sesiones: []
    }
]

export function insertCurso(data) {
    let cursos = getAllCursos();
    data['id'] = generateCursoID()
    cursos.push(data)
    localStorage.setItem(KEYS.cursos, JSON.stringify(cursos))
}

export function updateCurso(data) {
    let cursos = getAllCursos();
    let recordIndex = cursos.findIndex(x => x.id == data.id)
    cursos[recordIndex] = { ...data }
    localStorage.setItem(KEYS.cursos, JSON.stringify(cursos))
}

export function deleteCurso(id) {
    let cursos = getAllCursos();
    cursos = cursos.filter(x => x.id != id)
    localStorage.setItem(KEYS.cursos, JSON.stringify(cursos))
}

export function generateCursoID() {
    if (localStorage.getItem(KEYS.cursoID) == null) {
        localStorage.setItem(KEYS.cursoID, '0')
    }
    var id = parseInt(localStorage.getItem(KEYS.cursoID))
    localStorage.setItem(KEYS.cursoID, (++id).toString())
    return id;
}

export function getAllCursos() {
    /* if empty insert empty array */
    if (localStorage.getItem(KEYS.cursos) == null) {
        localStorage.setItem(KEYS.cursos, JSON.stringify([]))
        // TESTING: Initialize test data
        let cursos = initCursoData()
        cursos.forEach(x => {
            insertCurso(x)
        })
    }
    let cursos = JSON.parse(localStorage.getItem(KEYS.cursos));
    /* Do any data transformations here (e.g., lookup ID's create new attributes
     * based on that) */
    return cursos.map(x => ({
        // ...x,
        id: x.id,
        clave: x.curso.codigo,
        nombre: x.curso.nombre,
        facultad: x.curso.seccion.departamento.nombre,
        creditos: x.curso.creditos,
        estado: "Pendiente"     // Atendido o Pendiente
    }))
}
