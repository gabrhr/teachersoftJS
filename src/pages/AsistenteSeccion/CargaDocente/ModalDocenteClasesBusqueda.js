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
     }
]

export default function ModalDocenteClasesBusqueda({records, setRecords, recordsAsig, setRecordsAsig}){
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [selectedRow, setSelectedRow] = useState(records.length+1)
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
                .filter(x => x.nombreDocente.toLowerCase()
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
                <Grid item xs = {8}>
                    <Typography variant="h3" color="primary.light" style={SubtitulosTable} >
                        Docentes
                    </Typography>
                </Grid>
                <Typography align="center" sx = {{marginTop: 3}}>
                  Asignar profesor
                </Typography>
                <Button
                  variant= "iconoTexto"
                  onClick = {()=>addProf()}
                  disabled = {asignarDisabled}
                />
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
            <TableBody>
            {
              recordsAfterPagingAndSorting().map(item => (
              <StyledTableRow key={item.id} backCl = {(selectedRow===records.indexOf(item))?'#DEEEFF':'#E9ECF8'}
                              sx={(selectedRow===records.indexOf(item))?{backgroundColor: '#DEEEFF'}:{}} 
                              onClick={()=>changeSelected(item)}>
                  <StyledTableCell align="right">{item.id}</StyledTableCell>
                  <StyledTableCell>{item.nombre}</StyledTableCell>
                  <StyledTableCell>{item.tipo}</StyledTableCell>
                  <StyledTableCell        align="right">{item.cargaHoraria}</StyledTableCell>
                  <StyledTableCell        align="right">{item.cargaHoraria}</StyledTableCell>
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