import { Form } from "../../../components/useForm"
import { Input, Grid, Stack, Paper, TableBody, TableCell, TableRow, InputAdornment } from '@mui/material';
import { Typography } from '@mui/material'
import { Controls } from '../../../components/controls/Controls'
import { StyledTableRow, StyledTableCell } from '../../../components/controls/StyledTable';
import useTable from "../../../components/useTable"
import React, {useState} from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ModalDocenteClasesAsignados from "./ModalDocenteClasesAsignados";
import ModalDocenteClasesBusqueda from "./ModalDocenteClasesBusqueda"

const handleSubmit = e => {
    /* e is a "default parameter" */
    e.preventDefault()
    // if (validate())


    // const selec = records.map(profesor =>
    //   seleccionados[records.indexOf(profesor)] ? profesor : null
    // )
    // getListDocentes(selec)
    // props.setOpenPopup(false)
}

export default function ModalDocenteClases({docentesAsig}){
    const [recordsBusq, setRecordsBusq] = useState([
        {
            codigo:1,
            horasDocente:0,
            deudaDocente: 2,
            cargaDocente: 8,
            nombreDocente: 'José'
        },
        {
            codigo:2,
            horasDocente:0,
            deudaDocente: 1,
            cargaDocente: 9,
            nombreDocente: 'Salomón'
        },
        {
            codigo:3,
            horasDocente:0,
            deudaDocente: 4,
            cargaDocente: 8,
            nombreDocente: 'Lorena'
        }
    ])
    const [recordsAsig, setRecordsAsig] = useState(docentesAsig)

    return(
        
        <Form onSubmit={handleSubmit}>
            <Paper>
                <ModalDocenteClasesAsignados records = {recordsAsig} setRecords = {setRecordsAsig}/>
                <ModalDocenteClasesBusqueda records = {recordsBusq} setRecords = {setRecordsBusq}/>
            </Paper>
            <Grid cointainer align="right" mt={5}>
                <div>
                    <Controls.Button
                        // variant="contained"
                        // color="primary"
                        // size="large"
                        text="Seleccionar"
                        type="submit"
                    >
                    </Controls.Button>
                </div>
            </Grid>
        </Form>
    )
}