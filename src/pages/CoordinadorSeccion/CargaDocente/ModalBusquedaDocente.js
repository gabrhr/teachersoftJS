import React, {useState} from 'react'
import { Controls } from '../../../components/controls/Controls'
import useTable from "../../../components/useTable"
import { Input, Grid, Stack, Paper, TableBody, TableCell, TableRow, InputAdornment } from '@mui/material';
import { StyledTableRow, StyledTableCell } from '../../../components/controls/StyledTable';
import { Typography } from '@mui/material'
import * as XLSX from 'xlsx'
/* ICONS */
import { useForm, Form } from '../../../components/useForm';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { set } from 'date-fns';
import SearchIcon from '@mui/icons-material/Search';

/*Headers de la tabla*/

const tableHeaders = [
    {
      id: 'selected',
      label: '',
      numeric: false,
      sortable: true,
      
    },
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
]
function createData(selected, codigo, nombreDocente, tipoDocente, cargaDocente, deudaDocente) {
    return {
      selected, codigo, nombreDocente, tipoDocente, cargaDocente, deudaDocente
    }
  }

  export default function ModalBusquedaDocente(props) {
    const {listDocentes, getListDocentes} = props //Para ver cuales son seleccionados
    const [records, setRecords] = useState(listDocentes)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    const seleccionados = records.map(()=>(false))    
    console.log(seleccionados)
    const SubtitulosTable={display:"flex"}
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, 
    color:"primary.light", elevatio:0, marginTop: 3}

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);

    const {
      TblContainer,
      TblHead,
      TblPagination,
      recordsAfterPagingAndSorting,
      BoxTbl
  } = useTable(records, tableHeaders, filterFn);
  
  const onInputClick = (event) => {
      event.target.value = ''
  }

  const processData = dataString => {
        
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    let list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
        const row = dataStringLines[i].split(
            /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
        );
        if (headers && row.length == headers.length) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                let d = row[j];
                if (d.length > 0) {
                    if (d[0] == '"') d = d.substring(1, d.length - 1);
                    if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
                }
                if (headers[j]) {
                    obj[headers[j]] = d;
                }
            }

            // remove the blank rows
            if (Object.values(obj).filter(x => x).length > 0) {
                list.push(obj);
            }
        }
    }

    // prepare columns list from headers
    const columns = headers.map(c => ({
        name: c,
        selector: c
    }));

    //console.log(list)
    setData(list);
    setColumns(columns);

    let listaCorrectos = []
    let listaIncorrectos = []

    for (let i = 0; i < list.length; i++) {
        listaIncorrectos.push(list[i])
    }

    setRecords(listaIncorrectos)

};

  const handleSubmit = e => {
    /* e is a "default parameter" */
    e.preventDefault()
    // if (validate())
    const selec = records.map(profesor =>
      seleccionados[records.indexOf(profesor)] ? profesor : null
    )
    getListDocentes(selec)
    props.setOpenPopup(false)
  }

  const cambiarSeleccion = num => {
    seleccionados[num] = !seleccionados[num]
    console.log(seleccionados)
  }

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value === "")
          /* no search text */
          return items
        else
          return items
            .filter(x => x.fullName.toLowerCase()
            .includes(target.value.toLowerCase()))
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Paper>
        <Typography variant="h3" color="primary.light" style={SubtitulosTable} >
          Docentes
        </Typography>
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
              <StyledTableRow key={item.codigo} >
                  <StyledTableCell>
                    <Controls.RowCheckBox value = {item.selected}  sx = '1' onClick = {()=>cambiarSeleccion(records.indexOf(item))}>
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.RowCheckBox>
                  </StyledTableCell >
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