import { useForm, Form } from "../../../components/useForm"
import Popup from "../../../components/util/Popup";
import { Controls } from "../../../components/controls/Controls"
import { Alert, Grid, InputAdornment, Paper, TableBody, Typography } from '@mui/material'
import React, {useState} from 'react'
import Button from '../../../components/controls/Button';
import SearchIcon from '@mui/icons-material/Search';
import { StyledTableRow, StyledTableCell } from '../../../components/controls/StyledTable';
import useTable from "../../../components/useTable"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const tableHeaders = [
    {
      id: 'clave',
      label: 'Clave',
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

const SubtitulosTable={display:"flex"}

export default function ModalCursosCicloAsignados({records, setRecords, recordsBusq, setRecordsBusq, recordsDel, setRecordsDel}){
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [recordsABo, setRecordsABo] = useState([])

    const filtrarRecords = (row) => {
        for(let cur of recordsABo){
            if(row.codigo === cur.codigo) return false
        }
        return true
    }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);

    const addCursoBorrar = (curso) => {
        curso.selected = !curso.selected
    }

    const deleteCursos = () => {
      
        let curFil = records.filter((cur) => cur.selected===true)

        let items = records.filter((row) => row.selected===false);

        setRecords(items)
        setRecordsDel(curFil) //Le metemos los eliminados a los que se van a deletear.

        for(let cur of curFil){
            cur.selected = false
        }

        setRecordsBusq(recordsBusq=>[...recordsBusq, ...curFil])

    }

    return(
        <>
            <Grid container>
                <Grid item xs = {9.5}>
                <Grid cointainer align="right" mt={2.5} />  
                    <Typography variant="h3" color="primary.light" style={SubtitulosTable} >
                        Lista de cursos asignados
                    </Typography>
                </Grid>
                <Controls.Button
                    variant="outlined"
                    text="Borrar seleccionado"
                    size="small"
                    endIcon={<DeleteOutlineOutlinedIcon />}
                    onClick={()=>{deleteCursos()}}
                    disabled = {false}
                />
            </Grid>
                <BoxTbl>
                    <TblContainer>
                        <TblHead/>
                        {/* <colgroup>
                          <col style={{ width: '10%' }} />
                          <col style={{ width: '65%' }} />
                          <col style={{ width: '10%' }} />
                          <col style={{ width: '5%' }} />
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
                                <Controls.RowCheckBox sx = '1' onClick = {()=>{addCursoBorrar(item)}}>
                                    <EditOutlinedIcon fontSize="small" />
                                 </Controls.RowCheckBox>
                            </StyledTableCell>
                        </StyledTableRow>
                        ))
                        }
                        </TableBody>
                    </TblContainer>
                    <TblPagination/>
                </BoxTbl>
                </>
    )   
}