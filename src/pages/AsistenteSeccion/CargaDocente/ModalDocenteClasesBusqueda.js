import { Input, Grid, Stack, Paper, TableBody, TableCell, TableRow, InputAdornment } from '@mui/material';
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

const SubtitulosTable={display:"flex"}

const tableHeaders = [
    {
      id: 'codigo',
      label: 'Codigo',
      numeric: true,
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
      sortable: true
    },
    {
        id: 'cargaHoraria',
        label: 'Carga',
        numeric: true,
        sortable: true
     },
     {
        id: 'deudaHoraria',
        label: 'Deuda',
        numeric: true,
        sortable: true
     }
]

export default function ModalDocenteClasesBusqueda({records, setRecords, recordsAsig, setRecordsAsig}){
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [selectedRow, setSelectedRow] = useState(50) //se tiene que cambiar a records.lenght+1
    const [asignarDisabled, setAsignarDisabled] = useState(true)
    const [profAdd, setProfAdd] = useState({})

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
            if (target.value === "")
              /* no search text */
              return items
            else
              return items
                .filter(x => x.nombre.toLowerCase()
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
        console.log(profAdd)
        setRecordsAsig(recordsAsig => [...recordsAsig, profAdd])
        let items = records.filter((row) => row.codigo !== profAdd.codigo);
        setRecords(items);
        setSelectedRow(records.length+1)
        setAsignarDisabled(true)
    }

    return(
        <>
            <Grid container>
                <Grid item xs = {10}>
                    <Typography variant="h3" color="primary.light" style={SubtitulosTable} >
                        Docentes
                    </Typography>
                </Grid>
                {!asignarDisabled ? 
                  <Button
                    text = "Asignar profesor"
                    variant= "iconoTexto"
                    onClick = {()=>addProf()}
                  />
                  : <Grid cointainer align="right" mt={10} />    
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
                <col style={{ width: '10%' }} />
                <col style={{ width: '70%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '5%' }} />
                <col style={{ width: '5%' }} />
              </colgroup>
            <TableBody>
            {
              recordsAfterPagingAndSorting().map(item => (
              <StyledTableRow key={item.id} backCl = {(selectedRow===records.indexOf(item))?'#DEEEFF':'#E9ECF8'}
                              sx={(selectedRow===records.indexOf(item))?{backgroundColor: '#DEEEFF'}:{}} 
                              onClick={()=>changeSelected(item)}>
                  <StyledTableCell align="right">{item.codigo}</StyledTableCell>
                  <StyledTableCell>{item.nombre}</StyledTableCell>
                  <StyledTableCell        align="center">{item.tipo}</StyledTableCell>
                  <StyledTableCell        align="center">{item.cargaHoraria}</StyledTableCell>
                  <StyledTableCell        align="center">{item.deudaHoraria}</StyledTableCell>
              </StyledTableRow>
              ))
            }
              </TableBody>
            </TblContainer>
            <TblPagination />
        </BoxTbl>
        </>
    )
}