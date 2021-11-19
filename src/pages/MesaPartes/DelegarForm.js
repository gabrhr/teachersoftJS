import { InsertEmoticonSharp } from '@mui/icons-material';
import { Grid, InputAdornment, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react'
import { Controls } from '../../components/controls/Controls';
import { Form, useForm } from '../../components/useForm';
import useTable from '../../components/useTable'
import SearchIcon from '@mui/icons-material/Search';

const tableHeaders = [
    {
      id: 'nombre',
      label: '',
      numeric: false,
      sortable: true
    },
    {
      id: 'delegar',
      label: '',
      numeric: false,
      sortable: false
    },
]

const initialFieldValues = {
    destinatarioID:0,
    departamentoID: 0,
    seccionID:0
}

function getDestinatarios() {
    return ([
        { id: 0, title: 'Seleccionar'},
        { id: 1, title: 'Jefe de Departamento'},
        { id: 2, title: 'Coordinadores de Sección'},
        { id: 3, title: 'Docentes'},
    ])
}

export default function DelegarForm() {
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues);

    function validate() {
        let temp = {...errors}
        let defaultError = "Este campo es requerido"
        temp.destinatarioID = values.destinatarioID !== 0 ? "" : defaultError
        temp.departamentoID = values.departamentoID !== 0 ? "" : defaultError
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (validate()) {
            
        }
    }

    const handleSearch = e => {
        let target = e.target;
        /* React "state object" (useState()) doens't allow functions, only
          * objects.  Thus the function needs to be inside an object. */
        setFilterFn({
          fn: items => {
            if (target.value === "")
              /* no search text */
              return items
            else
              return items.filter(x => x.apellidos.toLowerCase()
                  .includes(target.value.toLowerCase()))
          }
        })
     }

    return (
        <Form onSubmit={handleSubmit}>
            <Controls.Select
                name="destinatarioID"
                label="Tipo de Destinatario"
                value={values.destinatarioID}
                onChange={handleInputChange}
                options={getDestinatarios()}
                error={errors.destinatarioID}
            />
            <Controls.Select
                name="departamentoID"
                label="Departamento"
                value={values.departamentoID}
                onChange={handleInputChange}
                options={getDestinatarios()}
                error={errors.departamentoID}
            />
            <Controls.Select
                name="seccionID"
                label="Sección"
                value={values.seccionID}
                onChange={handleInputChange}
                options={getDestinatarios()}
                error={errors.seccionID}
            />
             <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
                {/* <Toolbar> */}
                <Controls.Input
                    label="Buscar Docentes por Nombre"
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
            </div>
            <BoxTbl>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                       recordsAfterPagingAndSorting().map((item,index) => (
                            <ItemTable key={index} item={item}/>
                        ))
                    }
                    </TableBody>
                </TblContainer>
            </BoxTbl>

        </Form>
    )
}

function ItemTable(props){
    const {item} =props
    return (
        <TableRow key={item.id}>
            <TableCell>
            hola
            </TableCell>
            <TableCell>
               jeje
            </TableCell>
        </TableRow>
    );
}