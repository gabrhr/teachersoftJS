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
        label: 'Horas',
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
    const [maxHoras, setMaxHoras] = useState(6);
    const [isSelected, setIsSelected] = useState(false); 

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
             setIsSelected(false);
        }else{
            setSelectedRow(sel)
            setBorrarDisabled(false)
            setHorasAsig(`${prof.horas_dictado_docente_sesion ? (prof.horas_dictado_docente_sesion) : ""}`)
            setCargaHor(`${prof.docente.cargaHoraria}`)
            setCargaHorIni(`${prof.docente.cargaHoraria}`)
            setDeudaHor(`${prof.docente.deudaHoraria}`)
            setDeudaHorIni(`${prof.docente.deudaHoraria}`)
            setProfDelete(prof)
            setIsSelected(true);
        }
        let maximoHoras;
        switch(prof.docente.tipo){
          case "TC":
            maximoHoras = 10;
            break;
          case "TPC":
            maximoHoras = 6;
            break;
          default:
            maximoHoras = 6;
            break;
        }
        setMaxHoras(maximoHoras);
    }

    const changeCarga = (e) => {

        setHorasAsig(`${e.target.value}`)
        records[selectedRow].horas_dictado_docente_sesion = parseInt(e.target.value===''?0: e.target.value)
        records[selectedRow].docente.cargaHoraria = parseInt(cargaHorIni) + records[selectedRow].horas_dictado_docente_sesion
        setCargaHor(records[selectedRow].docente.cargaHoraria)

        records[selectedRow].docente.deudaHoraria = parseInt(deudaHorIni) + ( (records[selectedRow].docente.cargaHoraria>= maxHoras ) ? (maxHoras - records[selectedRow].docente.cargaHoraria) : 0)
        setDeudaHor(records[selectedRow].docente.deudaHoraria)

        //console.log(horasAsig)
    }

    //console.log(records);

    const deleteProfesor = () => {
        // let recAux = records
        // recAux.splice(recAux.indexOf(profDelete), 1)
        // console.log(recAux)
        // setRecords(recAux)
        // console.log(records)
        let items = records.filter((row) => row.docente.codigo !== profDelete.docente.codigo);

        setRecords(items);
        setSelectedRow(records.length+1)
        setBorrarDisabled(true)
        setHorasAsig('')
        setCargaHor('')
        setDeudaHor('')
        setProfDelete({})
    }
    //console.log("Set Records - asignados: ", records);
    return(
        <>
            <Grid container>
                <Grid item xs = {9.5}>
                <Grid cointainer align="right" mt={2.5} />  
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
                        <colgroup>
                          <col style={{ width: '10%' }} />
                          <col style={{ width: '65%' }} />
                          <col style={{ width: '10%' }} />
                          <col style={{ width: '5%' }} />
                          <col style={{ width: '5%' }} />
                          <col style={{ width: '5%' }} />
                        </colgroup>
                        <TableBody>
                        {
                        recordsAfterPagingAndSorting().map(item => (
                        <StyledTableRow key={item.docente.id} backCl = {(selectedRow===records.indexOf(item))?'#DEEEFF':'#E9ECF8'}
                                        sx={(selectedRow===records.indexOf(item))?{backgroundColor: '#DEEEFF'}:{}} 
                                        onClick={()=>changeSelected(item)}>
                            <StyledTableCell align="right">{item.docente.codigo}</StyledTableCell>
                            <StyledTableCell>{item.docente.nombre}</StyledTableCell>
                            <StyledTableCell>{item.docente.tipo}</StyledTableCell>
                            <StyledTableCell        align="center">{item.docente.cargaHoraria}</StyledTableCell>
                            <StyledTableCell        align="center">{item.docente.deudaHoraria}</StyledTableCell>
                            <StyledTableCell        align="center">{item.horas_dictado_docente_sesion ? item.horas_dictado_docente_sesion : 0}</StyledTableCell>
                        </StyledTableRow>
                        ))
                        }
                        </TableBody>
                    </TblContainer>
                    <TblPagination/>
                </BoxTbl>
                <Grid container>
                  {isSelected ? 
                    <>
                      <Grid item xs={2} sx={{marginX: 1}}>
                          <Controls.Input
                              value = {horasAsig}
                              label="Horas asignadas"
                              sx={{ width: .75 }}
                              size= 'small'
                              onChange={(selectedRow<=records.length)?((e)=>changeCarga(e)):(()=>{})}
                          />
                      </Grid>
                      <Grid item xs={5.5}></Grid>
                      <Grid item xs={2} sx={{marginRight: 2, marginLeft:1}} >
                          <Controls.Input
                              value = {cargaHor}
                              label="Carga horaria"
                              sx={{ width: .75 }}
                              disabled = {isSelected}
                              size= 'small'
                          />
                      </Grid>
                      <Grid item xs={2}>
                          <Controls.Input
                              value= {deudaHor}
                              label="Deuda horaria"
                              sx={{ width: .75 }}
                              disabled = {isSelected}
                              size= 'small'
                          />
                      </Grid>
                    </>
                  : <Grid cointainer align="right" mt={2.5} />    
                }
                </Grid>
                </>
    )
}