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
const tableHeaders = [
    {
      id: 'codigo',
      label: 'Codigo',
      numeric: true,
      sortable: true
    },
    {
      id: 'nombreDocente',
      label: 'Nombre',
      numeric: false,
      sortable: true
    },
    {
      id: 'tipoDocente',
      label: 'Tipo',
      numeric: false,
      sortable: true
    },
    {
        id: 'cargaDocente',
        label: 'Carga',
        numeric: true,
        sortable: true
     },
     {
        id: 'deudaDocente',
        label: 'Deuda',
        numeric: true,
        sortable: true
     },
     {
         id: 'horasDocente',
         labe: 'Horas',
         numeric: true,
         sortable: true
     }
]

    const SubtitulosTable={display:"flex"}

export default function ModalDocenteClasesAsignados({records, setRecords}){
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [selectedRow, setSelectedRow] = useState(records.length+1)
    const [borrarDisabled, setBorrarDisabled] = useState(true)
    const [horasAsig, setHorasAsig] = useState('')
    const [cargaHor, setCargaHor] = useState('')
    const [cargaHorIni, setCargaHorIni] = useState('')
    const [deudaHor, setDeudaHor] = useState('')
    const [deudaHorIni, setDeudaHorIni] = useState('')
    const [profDelete, setProfDelete] = useState({})

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);

    const changeSelected=(prof)=>{
        const sel = records.indexOf(prof)
        if(sel===selectedRow){
             setSelectedRow(records.length+1)
             setBorrarDisabled(true)
             setHorasAsig('')
             setCargaHor('')
             setDeudaHor('')
             setProfDelete({})
        }else{
            setSelectedRow(sel)
            setBorrarDisabled(false)
            setHorasAsig(`${prof.horasDocente}`)
            setCargaHor(`${prof.cargaHoraria}`)
            setCargaHorIni(`${prof.cargaHoraria}`)
            setDeudaHor(`${prof.deudaHoraria}`)
            setDeudaHorIni(`${prof.deudaHoraria}`)
            setProfDelete(prof)
        }
    }

    const changeCarga = (e) => {
        console.log('hola')
        console.log(`${e.target.value}`)
        setHorasAsig(`${e.target.value}`)
        records[selectedRow].horasDocente = e.target.value===''?0: e.target.value
        records[selectedRow].cargaHoraria = parseInt(cargaHorIni) + parseInt(records[selectedRow].horasDocente)
        records[selectedRow].deudaHoraria = deudaHorIni - records[selectedRow].horasDocente    
        setCargaHor(records[selectedRow].cargaHoraria)
        setDeudaHor(records[selectedRow].deudaHoraria)
        console.log(horasAsig)
    }

    const deleteProfesor = () => {
        // let recAux = records
        // recAux.splice(recAux.indexOf(profDelete), 1)
        // console.log(recAux)
        // setRecords(recAux)
        // console.log(records)
        let items = records.filter((row) => row.codigo !== profDelete.codigo);
        setRecords(items);
        setSelectedRow(records.length+1)
        setBorrarDisabled(true)
        setHorasAsig('')
        setCargaHor('')
        setDeudaHor('')
        setProfDelete({})
    }

    return(
        <>
            <Grid container>
                <Grid item xs = {8}>
                    <Typography variant="h3" color="primary.light" style={SubtitulosTable} >
                        Lista de docentes asignados
                    </Typography>
                </Grid>
                <Controls.Button
                    variant="outlined"
                    text="Borrar seleccionado"
                    size="small"
                    endIcon={<DeleteOutlineOutlinedIcon />}
                    onClick={deleteProfesor}
                    disabled = {borrarDisabled}
                />
            </Grid>
                <BoxTbl>
                    <TblContainer>
                        <TblHead/>
                        <TableBody>
                        {
                        recordsAfterPagingAndSorting().map(item => (
                        <StyledTableRow key={item.codigo} backCl = {(selectedRow===records.indexOf(item))?'#DEEEFF':'#E9ECF8'}
                                        sx={(selectedRow===records.indexOf(item))?{backgroundColor: '#DEEEFF'}:{}} 
                                        onClick={()=>changeSelected(item)}>
                            <StyledTableCell align="right">{item.id}</StyledTableCell>
                            <StyledTableCell>{item.nombre}</StyledTableCell>
                            <StyledTableCell>{item.tipo}</StyledTableCell>
                            <StyledTableCell        align="right">{item.cargaHoraria}</StyledTableCell>
                            <StyledTableCell        align="right">{item.deudaHoraria}</StyledTableCell>
                            <StyledTableCell        align="right">{item.horasDocente}</StyledTableCell>
                        </StyledTableRow>
                        ))
                        }
                        </TableBody>
                    </TblContainer>
                    <TblPagination/>
                </BoxTbl>
                <Grid container>
                    <Grid item xs={3} sx={{marginX: 1}}>
                        <Controls.Input
                            value = {horasAsig}
                            label="Horas asignadas"
                            sx={{ width: .75 }}
                            size= 'small'
                            onChange={(selectedRow<=records.length)?((e)=>changeCarga(e)):(()=>{})}
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={3} sx={{marginRight: 2, marginLeft:1}} >
                        <Controls.Input
                            value = {cargaHor}
                            label="Carga horaria"
                            sx={{ width: .75 }}
                            size= 'small'
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Controls.Input
                            value= {deudaHor}
                            label="Deuda horaria"
                            sx={{ width: .75 }}
                            size= 'small'
                        />
                    </Grid>
                </Grid>
                </>
    )
}