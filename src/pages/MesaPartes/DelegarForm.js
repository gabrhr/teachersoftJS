import { InsertEmoticonSharp } from '@mui/icons-material';
import { InputAdornment, TableBody, TableCell, TableRow } from '@mui/material';
import { Typography, Box, Grid } from '@mui/material';
import React, { useState } from 'react'
import { Controls } from '../../components/controls/Controls';
import { Form, useForm } from '../../components/useForm';
import useTable from '../../components/useTable'
import SearchIcon from '@mui/icons-material/Search';

/* SERVICES */
import PersonaService from '../../services/personaService'
import * as MesaPartesService from '../../services/mesaPartesService'
import * as UnidadService from '../../services/unidadService';
import DepartamentoService from '../../services/departamentoService'
import SeccionService from '../../services/seccionService'
import * as DTLocalServices from '../../services/DTLocalServices'

/* ICONS */
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SendIcon from '@mui/icons-material/Send';

/* ================================ SERVICES ================================ */

function getRoles() {
    return [
        // {id: 0, title: 'Administrador'},     // ID=0 puede malograr el combo
        { id: 0, title: 'Seleccionar' },
        { id: 1, title: 'Docente' },
        { id: 2, title: 'Asistente Seccion' },
        { id: 3, title: 'Coordinador Seccion' },
        { id: 4, title: 'Asistente Departamento' },
        { id: 5, title: 'Jefe Departamento' },
        { id: 6, title: 'Secretario Departamento' },
        // {id: 7, title: 'Usuario Externo'},
    ]
}

function getUnidades(setUnidad) {
    UnidadService.getUnidades()
        .then(us => {
            console.log("Unidades: ", us)
            setUnidad(us ?? [])
        })
}
function getDepartamentos(setDepartamento) {
    DepartamentoService.getDepartamentos()
        .then(ds => {
            console.log("Dep: ", ds)
            setDepartamento(ds ?? [])
        })
}
function getSecciones(setSeccion) {
    SeccionService.getSecciones()
        .then(secs => {
            setSeccion(secs ?? [])
        })
}

function getPersonas(setRecords, rolID) {
    PersonaService.getPersonasxTipo(rolID)
        .then(data => {
            data = data ?? []
            data.forEach((x, i) => {
                data[i] = MesaPartesService.b2fPersona(x)
            })
            setRecords(data)
        })
}

/* ================================== TABLE ================================= */

const tableHeaders = [
    {
        id: 'fullName',
        label: 'Nombre',
        numeric: false,
        sortable: false
    },
    {
        id: 'actions',
        label: 'Delegar',
        numeric: false,
        sortable: false
    },
]

function PersonaTableRow(props) {
    const { item, submitDelegar } = props
    return (
        <TableRow key={item.id}>
            <TableCell>{item.fullName} - {item.seccionDepartamento}</TableCell>
            <TableCell>
                <Controls.ActionButton
                    color="info"
                    /* this one is defined in RecepcionDetalleSolicitud.js */
                    onClick={() => { submitDelegar(item) }}
                >
                    <SendIcon fontSize="small" />
                </Controls.ActionButton>
                {/* <Controls.ActionButton
                    color="error"
                    onClick={() => {
                        // onDelete(item.id)
                        setConfirmDialog({
                            isOpen: true,
                            title: 'Are you sure to delete this record?',
                            subTitle: 'You can\'t undo this operation',
                            onConfirm: () => { onDelete(item.id) }
                        })
                    }}
                >
                    <CloseIcon fontSize="small" />
                </Controls.ActionButton> */}
            </TableCell>
        </TableRow>
    );
}

function PersonasTable(props) {
    const { records, setRecords,
        selectedDepartmentID,
        submitDelegar
    } = props
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);

    const handleSearch = e => {
        /* e.target.value holds contents of searchbox */
        let target = e.target;
        /* React "state object" (useState()) doens't allow functions, only
          * objects.  Thus the function needs to be inside an object. */
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    /* no search text */
                    return items
                else
                    /* search records by "fullName" */
                    return items.filter(x => x.fullName.toLowerCase()
                        .includes(target.value.toLowerCase()))
            }
        })
    }

    /* DEBUG */
    React.useEffect(() => {
        console.log("Records: ", records)
    }, [records])

    return (
        <>
            <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
                {/* <Toolbar> */}
                <Controls.Input
                    label="Buscar Docentes por Nombre"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                    sx={{ width: .75 }}
                    onChange={handleSearch}
                    type="search"
                />
            </div>
            <BoxTbl>
                <TblContainer>
                    <TblHead />
                    <colgroup>
                        <col style={{ width: '80%' }} />
                        <col style={{ width: '20%' }} />
                    </colgroup>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting()
                                .filter(item => {
                                    return item.departamentoID === selectedDepartmentID
                                })
                                .map(item => {
                                    return (
                                        <PersonaTableRow item={item} 
                                            submitDelegar={submitDelegar}
                                        />
                                    )
                                })
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl>
        </>
    )
}

/* ============================== FORMS ================================== */

function DelegarInternoForm(props) {
    const { submitDelegar, setTipoDelegar } = props

    /* de la tablita de delgados */
    const [records, setRecords] = useState([{ id: 1, fullName: "Mitsuo" }])

    /* data para mostrar en los combobox */
    const [unidad, setUnidad] = React.useState([])
    const [departamento, setDepartamento] = React.useState([])
    const [seccion, setSeccion] = React.useState([])
    const comboData =
    {
        unidad: unidad,
        departamento: departamento,
        seccion: seccion,
    }

    React.useEffect(() => {
        // getPersonas(setRecords)
        getUnidades(setUnidad)
        getDepartamentos(setDepartamento)
        getSecciones(setSeccion)
    }, [])

    /* del delegado para asignar la solicitud */
    const initialFieldValues = {
        rolID: 0,
        unidadID: 0,
        departamentoID: 0,
        seccionID: 0
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues);

    /* load personas by rol */
    React.useEffect(() => {
        if (values.rolID === 0)
            setRecords([])
        else 
            getPersonas(setRecords, values.rolID)
    }, [values.rolID])

    /* data de los comboboxes */
    const [disable, setDisable] = React.useState({
        departamentoID: true,
        seccionID: true,
        temaTramiteID: true,
        tipoTramiteID: true
    })

    /* onSubmit validation */
    function validate() {
        let temp = {...errors}
        let defaultError = "Este campo es requerido"
        temp.rolID = values.rolID !== 0 ? "" : defaultError

        temp.unidadID = values.unidadID !== 0 ? "" : defaultError
        temp.departamentoID = values.departamentoID !== 0 ? "" : defaultError
        // temp.seccionID = values.seccionID !== 0 ? "" : defaultError

        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (validate()) {
            // submit
            /* no hay nada aqui,  se hace submit en el boton de PersonaRow */
        }
    }

    /* Cadenita de combobox
     * Unidad > Departamento > Seccion > TemaTramite > TipoTramite 
     */
    function check(id, nextid) {
        if (values[id] === 0) {
            setDisable({...disable, [nextid]: true});
        }
        else {
            setDisable({...disable, [nextid]: false});
        }
        setValues({...values, [nextid]: 0})
    }
    React.useEffect(() => check('unidadID', 'departamentoID'), [values.unidadID])
    React.useEffect(() => check('departamentoID', 'seccionID'), [values.departamentoID])
    React.useEffect(() => check('seccionID', 'temaTramiteID'), [values.seccionID])

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Controls.Select
                            name="rolID"
                            label="Rol del delegado"
                            value={values.rolID}
                            onChange={handleInputChange}
                            options={getRoles()}
                            error={errors.rolID}
                        />
                        <Controls.Select
                            name="unidadID"
                            label="Unidad"
                            value={values.unidadID}
                            onChange={handleInputChange}
                            options={[{ id: 0, nombre: "Seleccionar" }]
                                .concat(comboData.unidad)
                            }
                            error={errors.unidadID}
                        />
                        <Controls.Select
                            name="departamentoID"
                            label="Departamento"
                            value={values.departamentoID}
                            onChange={handleInputChange}
                            options={[{ id: 0, unidad: { id: 0 }, nombre: "Seleccionar" }]
                                .concat(comboData.departamento)
                                .filter(x => x.unidad.id === values.unidadID ||
                                    x.id === 0
                                )
                            }
                            disabled={disable.departamentoID}
                            error={errors.departamentoID}
                        />
                        {/* <Controls.Select
                            name="seccionID"
                            label="Sección"
                            value={values.seccionID}
                            onChange={handleInputChange}
                            options={[{ id: 0, departamento: { id: 0 }, nombre: "Seleccionar" }]
                                .concat(comboData.seccion)
                                .filter(x => x.departamento.id === values.departamentoID ||
                                    x.id === 0
                                )
                            }
                            disabled={disable.seccionID}
                            error={errors.seccionID}
                        /> */}
                    </Grid>
                    <Grid item xs={4}>
                        <Box display="flex" justifyContent="flex-end">
                            <Controls.Button
                                variant="outlined"
                                text="Delegar por email"
                                size="small"
                                onClick={() => {setTipoDelegar('externo')}}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Form>
            <PersonasTable records={records} setRecords={setRecords} 
                selectedDepartmentID={values.departamentoID}
                submitDelegar={submitDelegar}
            />
        </>
    )
}

function DelegarExternoForm(props) {
    const { submitDelegarExterno, setTipoDelegar } = props

    /* del Delegado externo (destinatario) */
    const initialFieldValues = {
        id: 0,
        nombre: '',
        correo: ''
    }

    function validate() {
        let temp = {...errors}
        let defaultError = "Este campo es requerido"

        temp.rolID = values.rolID !== 0 ? "" : defaultError
        if (values.nombre.length !== 0)
            temp.nombre = DTLocalServices.validateName(values.nombre)
        else
            temp.nombre = defaultError
        temp.correo = DTLocalServices.validateEmail(values.correo)

        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (validate()) {
            const delegadofake = {
                id: null,
                nombre: values.nombre,
                // foto_URL: values.
                correo: values.correo
            }
            submitDelegarExterno(delegadofake)
        }
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues);

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Controls.Button
                            variant="outlined"
                            text="Regresar"
                            size="small"
                            onClick={() => {setTipoDelegar('interno')}}
                        />
                        <Controls.Input 
                            name="nombre"
                            label="Nombre del Destinatario"
                            value={values.nombre} 
                            onChange = {handleInputChange}
                            error={errors.nombre}
                        />
                        <Controls.Input 
                            name="correo"
                            label="Direccion de correo electrónico"
                            value={values.correo} 
                            onChange = {handleInputChange}
                            error={errors.correo}
                        />
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="flex-end">
                    <Controls.Button
                        text="Enviar"
                        type="submit"
                        endIcon={<SendIcon/>}
                    />
                </Box>
            </Form>
        </>
    )
}

export default function DelegarForm(props) {
    const { submitDelegar, submitDelegarExterno } = props

    const [ tipoDelegar, setTipoDelegar ] = React.useState('interno')

    return (
        <>
            { 
                tipoDelegar === 'interno' &&
                <DelegarInternoForm 
                    submitDelegar={submitDelegar} 
                    setTipoDelegar={setTipoDelegar}
                />
            }
            {
                tipoDelegar === 'externo' &&
                <DelegarExternoForm
                    submitDelegarExterno={submitDelegarExterno}
                    setTipoDelegar={setTipoDelegar}
                />
            }
        </>
    )
}
