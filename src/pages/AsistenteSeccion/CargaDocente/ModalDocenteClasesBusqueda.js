import { Avatar, Input, Grid, Stack, Paper, TableBody, TableCell, TableRow, InputAdornment } from '@mui/material';
import { Typography } from '@mui/material'
import React, {useState} from 'react'
import { Controls } from '../../../components/controls/Controls'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddButton from '../../../components/controls/AddButton';
import Button from '../../../components/controls/Button';
import SearchIcon from '@mui/icons-material/Search';
import useTable from "../../../components/useTable"
import { StyledTableRow, StyledTableCell } from '../../../components/controls/StyledTable';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box } from '@mui/system';
import ModalDetalleCursosDocente from './ModalDetalleCursosDocente';
import Popup from '../../../components/util/Popup'
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es');

const SubtitulosTable={display:"flex"}

const tableHeaders = [
    {
      id: '',
      label: '',
      numeric: false,
      sortable: false
    },
    {
      id: 'codigo',
      label: 'Codigo',
      numeric: false,
      sortable: true
    },
    {
      id: 'nombre',
      label: 'Nombre',
      numeric: false,
      sortable: true
    },
    {
      id: 'tipo',
      label: 'Tipo',
      numeric: false,
      sortable: false
    },
    {
        id: 'carga',
        label: 'Horas Dictado',
        numeric: false,
        sortable: false
     },
    {
        id: 'cargaHoraria',
        label: 'Carga',
        numeric: false,
        sortable: false
     },
     {
        id: 'deudaHoraria',
        label: 'Deuda',
        numeric: false,
        sortable: false
     },
     {
        id: 'detalle',
        label: 'Detalle',
        numeric: false,
        sortable: false
     }
]

const hallarCargaTeorica = docente => {
  let horas_teoricas;

  //hallamos las horas que debería dictar el docente en el ciclo
  switch(docente.tipo_docente){
    case 1:
        horas_teoricas = 10;
      break;
    case 2:
        horas_teoricas = 6;
      break;
    default:
        horas_teoricas = 6;
      break;
  }
  const curDate = moment().format("LLL");
  //curDate.setFullYear(curDate.getFullYear() - 1);  // Le quitamos 1 año - para comparar con el del docente
  if(docente.tipo_bono) 
    if(curDate <= moment(docente.fecha_ultimo_bono).add('year',1).format("LLL"))  horas_teoricas = horas_teoricas - 2;

  return horas_teoricas;
}

const hallarDeuda = docente => {

  const carga_Teo = hallarCargaTeorica(docente);

  const deuda = parseInt(docente.deuda_docente) + ( (docente.cargaDocente >= carga_Teo ) ? (carga_Teo - docente.cargaDocente) : 0)

  return deuda;
}


export default function ModalDocenteClasesBusqueda({records, setRecords, recordsAsig, setRecordsAsig}){
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [selectedRow, setSelectedRow] = useState(50) //se tiene que cambiar a records.lenght+1
    const [asignarDisabled, setAsignarDisabled] = useState(true)
    const [profAdd, setProfAdd] = useState({})
    const [openDetallePopup, setOpenDetallePopup] = useState(false)

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
          fn: items => {
            console.log(items);
            if (target.value === "")
              /* no search text */
              return items
            else
              return items
                .filter(x => x.nombres.toLowerCase()
                .includes(target.value.toLowerCase()))
          }
        })
    }

    const changeSelected=(prof)=>{
      const sel = records.indexOf(prof)
      if(sel===selectedRow){
           setSelectedRow(records.length+1)
           setAsignarDisabled(true)
      }else{
          setSelectedRow(sel)
          setAsignarDisabled(false)
          setProfAdd(prof)
      }
    }

    const addProf = () => {
        console.log('profadd: ', profAdd)
        let sesion_docente = {
          "docente" : profAdd,
          "horas_dictado_docente_sesion": 0,
          "selected": false,
        }
        setRecordsAsig(recordsAsig => [...recordsAsig, sesion_docente])
        let items = records.filter((row) => row.codigo_pucp !== profAdd.codigo_pucp);

        setRecords(items);
        setSelectedRow(records.length+1)
        setAsignarDisabled(true)
    }


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
                <Grid item xs = {5}>
                    <Typography variant="h3" color="primary.light" style={SubtitulosTable} >
                        Docentes
                    </Typography>
                </Grid>
                {!asignarDisabled ? (
                  <>
                  <Grid item xs={5}/>
                  {/* FIX:  left align */}
                  <Grid item xs={2} align="right">
                      {/* FIX:  DT IconButton */}
                      <Controls.Button 
                          title="Agregar Nuevo Horario"
                          variant="text+icon"
                          text = "Agregar Nuevo Horario"
                          onClick = {(event) => addProf()}
                      />
                  </Grid>
                  </>
                ): <Grid cointainer align="right" mt={10} />    
                }
            </Grid>
            <Controls.Input
            label="Buscar docentes por nombre"
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
        <BoxTbl>
          <TblContainer>
            <TblHead />
              <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '48%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '5%' }} />
                <col style={{ width: '5%' }} />
                <col style={{ width: '5%' }} />
              </colgroup>
            <TableBody>
            {
              recordsAfterPagingAndSorting().map(item => (
              <StyledTableRow key={item.id} backCl = {(selectedRow===records.indexOf(item))?'#DEEEFF':'#E9ECF8'}
              sx={(selectedRow===records.indexOf(item))?{backgroundColor: '#DEEEFF'}:{}} 
              onClick={()=>changeSelected(item)}>
                  <StyledTableCell>
                  <Avatar>
                      {item.foto_URL !== ("static/images/avatar/1.jpg" || "")
                        ? <img height = "125%" width = "125%" text-align ="center" alt = "" 
                          src={item.foto_URL}></img>
                        :  <AccountCircleIcon/>}
                  </Avatar>
                  </StyledTableCell>
                  <StyledTableCell>{item.codigo_pucp}</StyledTableCell>
                  <StyledTableCell>{`${item.nombres}, ${item.apellidos}`}</StyledTableCell>
                  <StyledTableCell>{hallarDocente(item.tipo_docente)}</StyledTableCell>
                  <StyledTableCell        align="center" color ="secondary">{`${hallarCargaTeorica(item)} horas`}</StyledTableCell>
                  <StyledTableCell        align="center">
                    <Typography color = "secondary">  {item.cargaDocente} </Typography>
                  </StyledTableCell>
                  <StyledTableCell        align="center">
                    <Typography style ={{color: "red"}}>  {hallarDeuda(item)} </Typography>
                  </StyledTableCell>
                  <StyledTableCell        align="center">
                      <Controls.ActionButton
                        color="warning"
                        onClick={() => { setOpenDetallePopup(true) }}
                      >
                        <ContactPageOutlinedIcon fontSize="middle" />
                      </Controls.ActionButton>
                    </StyledTableCell>
              </StyledTableRow>
              ))
            }
              </TableBody>
            </TblContainer>
            <TblPagination />
        </BoxTbl>
        <Popup
                openPopup={openDetallePopup}
                setOpenPopup={setOpenDetallePopup}
                title="Detalle de cursos"
                size = "xl"
            >
               <ModalDetalleCursosDocente docente = {profAdd}/>
            </Popup>
        </>
    )
}