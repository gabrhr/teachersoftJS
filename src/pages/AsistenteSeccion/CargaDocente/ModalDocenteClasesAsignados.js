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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import moment from 'moment'
import 'moment/locale/es'
moment.locale('es');


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

export default function ModalDocenteClasesAsignados({records, setRecords, tipo_dictado, setTipoDic, sesion, recordsBusq, setRecordsBusq , setRecordsDel, recordsDel}){
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [selectedRow, setSelectedRow] = useState(records.length+1)
    const [borrarDisabled, setBorrarDisabled] = useState(true)
    const [horasAsig, setHorasAsig] = useState('')
    const [horasAsigIni, setHorasAsigIni] = useState('')
    const [cargaHor, setCargaHor] = useState('')
    const [cargaHorIni, setCargaHorIni] = useState('')
    const [deudaHor, setDeudaHor] = useState('')
    const [deudaHorIni, setDeudaHorIni] = useState('')
    const [profDelete, setProfDelete] = useState({})
    const [maxHoras, setMaxHoras] = useState(6);
    const [isSelected, setIsSelected] = useState(false); 
    //const [tipoDic, setTipoDictado] = useState(tipo_dictado);


    const handleChangeSwitch = async e =>{
      await tipo_dictado ? setTipoDic(0) : setTipoDic(1)

    }

    console.log("Asignados: ", records, " \n tipo_dicatdo:", tipo_dictado);

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
            setHorasAsigIni(`${prof.horas_dictado_docente_sesion ? (prof.horas_dictado_docente_sesion) : ""}`)
            setCargaHor(`${prof.docente.cargaDocente}`)
            setCargaHorIni(`${prof.docente.cargaDocente}`)
            setDeudaHor(`${prof.docente.deuda_docente}`)
            setDeudaHorIni(`${prof.docente.deuda_docente}`)
            setProfDelete(prof)
            setIsSelected(true);
        }
        let maximoHoras;
        switch(prof.docente.tipo_docente){
          case 1:
            maximoHoras = 10;
            break;
          case 2:
            maximoHoras = 6;
            break;
          default:
            maximoHoras = 6;
            break;
        }

        const curDate = moment().format("LLL");
          //curDate.setFullYear(curDate.getFullYear() - 1);  // Le quitamos 1 año - para comparar con el del docente
          if(prof.docente.tipo_bono) 
            if(curDate <= moment(prof.docente.fecha_ultimo_bono).add('year',1).format("LLL"))  maximoHoras = maximoHoras - 2;

        setMaxHoras(maximoHoras);
    }

    const changeCarga = (e) => {
        const pattern = /^[0-9.]*$/;   
        
        //Verificacion de que sea numero
        if (!pattern.test(e.target.value)) {
          e.target.value = e.target.value.replace(/[^0-9.]/g, "");
          // invalid character, prevent input

        }
        let valueAnt = horasAsig; 
        setHorasAsig(`${e.target.value}`)
        records[selectedRow].horas_dictado_docente_sesion = parseFloat(e.target.value===''?0: e.target.value)
        records[selectedRow].docente.cargaDocente = parseFloat(cargaHorIni)-parseFloat(horasAsigIni ? horasAsigIni : 0) + records[selectedRow].horas_dictado_docente_sesion
        setCargaHor(records[selectedRow].docente.cargaDocente)

        records[selectedRow].docente.deuda_docente = parseFloat(deudaHorIni) + ( (records[selectedRow].docente.cargaDocente>= maxHoras ) ? (maxHoras - records[selectedRow].docente.cargaDocente) : 0)
        setDeudaHor(records[selectedRow].docente.deuda_docente)

        console.log(records[selectedRow])
    }

    //console.log(records);

    const deleteProfesor = () => {
        // let recAux = records
        // recAux.splice(recAux.indexOf(profDelete), 1)
        // console.log(recAux)
        // setRecords(recAux)
        profDelete.selected = true;
        console.log(records)
        let profFil = records.filter((prof) => prof.selected===true)

        let items = records.filter((row) => (row.selected===false || !row.selected));

        setRecords(items)
        let newListProf = [];
        for(let prof of profFil){
          prof.docente.cargaDocente = parseFloat(cargaHorIni)-parseFloat(horasAsigIni)
          prof.docente.deuda_docente = parseFloat(deudaHorIni) + ( (prof.docente.cargaDocente>= maxHoras ) ? (maxHoras - prof.docente.cargaDocente) : 0)
          
          newListProf.push(prof.docente)
        }
        console.log(newListProf, items);
        setRecordsDel(recordsDel => [...recordsDel, ...newListProf]) //Le metemos los eliminados a los que se van a deletear.
        
        setRecordsBusq(recordsBusq=>[...recordsBusq, ...newListProf])
  //      setRecords(items);
  //      setSelectedRow(records.length+1)
        setBorrarDisabled(true)
        setHorasAsig('')
        setCargaHor('')
        setDeudaHor('')
        setProfDelete({})
    }
    //console.log("Set Records - asignados: ", records);

    const hallarDocente = (tipo) => {
        let tipo_doc;
        switch(tipo){
          case 1:
             tipo_doc = "TC";
            break;
          case 2:
             tipo_doc = "TPC";
            break;
          default:
             tipo_doc = "TPA";
            break;
        }
        return  tipo_doc;
    }

    return(
        <>
            <Grid container>
                <Grid item xs = {10}>
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
                    onClick={() => {deleteProfesor()}}
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
                            <StyledTableCell align="right">{item.docente.codigo_pucp}</StyledTableCell>
                            <StyledTableCell>{`${item.docente.nombres}, ${item.docente.apellidos}`}</StyledTableCell>
                            <StyledTableCell>{hallarDocente(item.docente.tipo_docente)}</StyledTableCell>
                            <StyledTableCell        align="center">{item.docente.cargaDocente}</StyledTableCell>
                            <StyledTableCell        align="center">{item.docente.deuda_docente}</StyledTableCell>
                            <StyledTableCell        align="center">{item.horas_dictado_docente_sesion ? item.horas_dictado_docente_sesion : 0}</StyledTableCell>
                        </StyledTableRow>
                        ))
                        }
                        </TableBody>
                    </TblContainer>
                    <TblPagination/>
                </BoxTbl>
                <Grid container xs = {12}>
                  <Grid item xs={0.2}></Grid>
                  <Grid item xs = {1.8}>
                  <FormGroup>
                    <FormControlLabel 
                      control={
                        <Switch sx 
                        defaultChecked = { tipo_dictado ? true : false}
                        disabled = {records.length ? true : false}
                        onChange = {handleChangeSwitch}
                        disableRipple = {false} 
                      />} 
                        label= { tipo_dictado ? "Co-Dictado" : "Compartido"} 
                    />
                  </FormGroup>
                  </Grid>
                  {isSelected ? 
                    <>
                      <Grid item xs={2.5}></Grid>
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
                      <Grid item xs={1}></Grid>
                      <Grid item xs={2} sx={{marginX: 1}}>
                          <Controls.Input
                              value = {horasAsig}
                              label="Horas asignadas"
                              sx={{ width: .75 }}
                              size= 'small'
                              onChange={(selectedRow<=records.length)?((e)=>changeCarga(e)):(()=>{})}
                          />
                      </Grid>
                    </>
                  : <Grid cointainer align="right" mt={2.5} />    
                }
                
                {records.length ? 
                    <Grid item xs={12}>
                      <Typography color = "secondary">
                        Para cambiar el tipo de dictado, se deben eliminar primero a todos los docentes
                      </Typography>
                    </Grid> 
                : <Grid item xs={12}></Grid>}
                </Grid>
                </>
    )
}