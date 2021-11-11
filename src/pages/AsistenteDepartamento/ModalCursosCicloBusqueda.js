import { useForm, Form } from "../../components/useForm"
import Popup from "../../components/util/Popup";
import { Controls } from "../../components/controls/Controls"
import { Alert, Grid, InputAdornment, Paper, TableBody, Typography } from '@mui/material'
import React, {useState} from 'react'
import Button from '../../components/controls/Button';
import SearchIcon from '@mui/icons-material/Search';
import { StyledTableRow, StyledTableCell } from '../../components/controls/StyledTable';
import useTable from "../../components/useTable"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const SubtitulosTable={display:"flex"}
const tableHeaders = [
    {
      id: 'clave',
      label: 'Clave',
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
        id: 'facultad',
        label: 'Facultad',
        numeric: false,
        sortable: true
      },
      {
        id: 'creditos',
        label: 'Créditos',
        numeric: false,
        sortable: true
      },
    {
        id: 'selected',
        label: '',
        numeric: false,
        sortable: true
    }
]

export default function ModalCursosCicloBusqueda({records, setRecords, recordsAsig, setRecordsAsig}){
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })    
    const [asignarDisabled, setAsignarDisabled] = useState(false)

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

    const addCursoAsignar = (curso) => {
        console.log(curso.selected)
        curso.selected = !curso.selected
        //if(asignarDisabled===true) setAsignarDisabled(false)
        //else if(records.filter(cur => cur.selected === true) === []) setAsignarDisabled(true)
        console.log(curso.selected)
    }

    const addCursos = () => {
        console.log(records)
        let curFil = records.filter((cur) => cur.selected===true)

        let items = records.filter((row) => row.selected===false);
        console.log(items)
        setRecords(items);

        for(let cur of curFil){
            cur.selected = false
        }

        console.log('curfil: ',curFil)
        setRecordsAsig(recordsAsig=>[...recordsAsig, ...curFil])

        //setAsignarDisabled(true)

        console.log("adasd", recordsAsig)
    }

    return(
        <>
            <Grid container>
                <Grid item xs = {10}>
                    <Typography variant="h3" color="primary.light" style={SubtitulosTable} >
                        Cursos
                    </Typography>
                </Grid>
                {!asignarDisabled ? 
                  <Button
                    text = "Asignar curso"
                    variant= "iconoTexto"
                    onClick = {()=>{addCursos()}}
                  />
                  : <Grid cointainer align="right" mt={10} />    
                }
            </Grid>
            <Controls.Input
            label="Buscar cursos por nombre"
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
              {/* <colgroup>
                <col style={{ width: '10%' }} />
                <col style={{ width: '70%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '5%' }} />
                <col style={{ width: '5%' }} />
              </colgroup> */}
            <TableBody>
            {
              recordsAfterPagingAndSorting().map(item => (
              <StyledTableRow key={item.id}>
                <StyledTableCell>{item.codigo}</StyledTableCell>
                <StyledTableCell>{item.nombre}</StyledTableCell>
                <StyledTableCell>{item.seccion.departamento.unidad.nombre}</StyledTableCell>
                <StyledTableCell>{item.creditos}</StyledTableCell>
                <StyledTableCell>
                    <Controls.RowCheckBox sx = '1' onClick = {()=>{addCursoAsignar(item)}}>
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.RowCheckBox>
                </StyledTableCell>
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