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

export default function ModalDocenteClasesBusqueda({records, setRecords}){
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [selectedRow, setSelectedRow] = useState(records.length+1)
    const [asignarDisabled, setAsignarDisabled] = useState(true)

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
          //  setBorrarDisabled(true)
          //  setHorasAsig('')
          //  setCargaHor('')
          //  setDeudaHor('')
          //  setProfDelete({})
      }else{
          setSelectedRow(sel)
          setAsignarDisabled(false)
          // setBorrarDisabled(false)
          // setHorasAsig(`${prof.horasDocente}`)
          // setCargaHor(`${prof.cargaDocente}`)
          // setCargaHorIni(`${prof.cargaDocente}`)
          // setDeudaHor(`${prof.deudaDocente}`)
          // setDeudaHorIni(`${prof.deudaDocente}`)
          // setProfDelete(prof)
      }
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
                  onClick = {()=>{}}
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
              <StyledTableRow key={item.codigo} backCl = {(selectedRow===records.indexOf(item))?'#DEEEFF':'#E9ECF8'}
                              sx={(selectedRow===records.indexOf(item))?{backgroundColor: '#DEEEFF'}:{}} 
                              onClick={()=>changeSelected(item)}>
                  <StyledTableCell align="right">{item.codigo}</StyledTableCell>
                  <StyledTableCell>{item.nombreDocente}</StyledTableCell>
                  <StyledTableCell>{item.tipoDocente}</StyledTableCell>
                  <StyledTableCell        align="right">{item.cargaDocente}</StyledTableCell>
                  <StyledTableCell        align="right">{item.deudaDocente}</StyledTableCell>
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