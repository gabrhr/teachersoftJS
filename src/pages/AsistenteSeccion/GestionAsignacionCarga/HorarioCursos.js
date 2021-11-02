import React, {useState} from 'react'
import { Grid, Stack, Typography } from '@mui/material';
import { DT } from '../../../components/DreamTeam/DT'
import HorarioService from '../../../services/horarioService';
import { formatHorario, formatHorarioCursos } from '../../../components/auxFunctions';
import { Controls } from '../../../components/controls/Controls'
import { useForm, Form } from '../../../components/useForm';
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { useHistory } from 'react-router-dom'
import { Box, Paper, TableBody, TableRow, TableCell,InputAdornment } from '@mui/material';
/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const initialFieldValues = {
    searchText: ''
}

const tableHeaders = [
    /*{
      id: 'id',
      label: 'SeccionID',
      numeric: true,
      sortable: true
    },*/
    {
      id: 'claveCurso',
      label: 'Clave',
      numeric: false,
      sortable: true
    },
    {
      id: 'nombreCurso',
      label: 'Nombre',
      numeric: false,
      sortable: true
    },
    {
        id: 'horario',
        label: 'Horario',
        numeric: false,
        sortable: true
     },
     {
        id: 'tipoSesion',
        label: 'Tipo',
        numeric: false,
        sortable: true
     },
    {
      id: 'cargaHoraria',
      label: 'Carga Horaria',
      numeric: false,
      sortable: true
    },
     {
        id: 'horaSesion',
        label: 'Hora-Sesion',
        numeric: false,
        sortable: true
     },
]

const fillHorarios = async () => {
  const dataHor = await HorarioService.getHorarios();
  //dataSecc → id, nombre,  fechaFundacion, fechaModificacion,nombreDepartamento
  const horarios = [];
  if(!dataHor)  {
    console.error("No se puede traer la data del servidor de los horarios")
    return [];
  }

  dataHor.map(hor => (
    horarios.push({
      "id": hor.id,
      "codigo": hor.codigo,
      "tipo": hor.tipo,
      "horas_semanales": hor.horas_semanales,
      ciclo:{
        "id": hor.ciclo.id,
      },
      curso:{
        "id": hor.curso.id,
        "codigo": hor.curso.codigo,
        "nombre": hor.curso.nombre,
        "creditos": hor.curso.creditos,
        "unidad": hor.curso.unidad,
        "carga": hor.curso.carga
      },
      "sesiones_excel": hor.sesiones_excel
    })
    ));
  console.log(horarios);

  return horarios;

}

export default function HorarioCursos({records, setRecords}) {

    //let hors = (window.localStorage.getItem('listHorario'))
    //const {getHorario, horario, setHorario, isNewFile } = props
    //const [openPopup, setOpenPopup] = useState(false);
    //const [recordsX, setRecordsX] = useState([]); //Se debe colocar el ID
    //const [columns, setColumns] = useState([]);
    //const [data, setData] = useState([]);
    //const [open, setOpen] = React.useState(false);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const history = useHistory()
    const SubtitulosTable={display:"flex"}
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, 
    color:"primary.light", elevatio:0}
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);
    const {
        // values,
        // setValues,
        handleInputChange
    } = useForm(initialFieldValues);

    //Le pasamos los horarios

    React.useEffect(() => {
      //Obtenemos las secciones
      fillHorarios()
      .then (newHorarios =>{
        //setRecordsX(newHorarios); //Se quiere actualizar todo
        setRecords(newHorarios);
      });
      
    }, [])
  
    //console.log(records);


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
              return items.filter(x => x.curso.nombre.toLowerCase()
                  .includes(target.value.toLowerCase()))
          }
        })
      }
    const handleClick = (e) => {
        history.push("/as/asignacionCarga/cursos");
    };
    return (
        <Form>            
            <Typography variant="h4"
                color="primary.light" style={SubtitulosTable}
            >
                Horario de Cursos
            </Typography>
            <Grid container>
                <Grid item xs={8}>
                    <Stack direction="row" align="left" spacing={0}>
                        <Controls.Input
                            name="searchText"
                            label="Buscar Cursos por el nombre"
                            onChange={handleSearch}
                            type="search"
                            size="small"
                            sx = {{
                                maxWidth: .7
                            }}
                        />
                        {/* <Controls.Button  
                            text={<SearchIcon/>}
                            size="small"
                            sx = {{
                                // display: "inline",
                                maxWidth: .05
                            }}
                        /> */}
                    </Stack>
                </Grid>
                {/* FIX:  left align */}
                <Grid item xs={4} align="right">
                    {/* FIX:  DT IconButton */}
                    <Controls.AddButton 
                        title="Agregar Nuevo Horario"
                        variant="iconoTexto"
                        onClick = {(event) => handleClick(event)}
                    />
                </Grid>
            </Grid>
            <BoxTbl>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    
                    {records.length > 0 ? 
                        recordsAfterPagingAndSorting().map(item => (
                        <TableRow key={item.id}>
                            {/*<TableCell
                            align="right"
                            >
                            {item.clave}
                            </TableCell>*/}
                            <TableCell>{item.curso.codigo}</TableCell>
                            <TableCell>{item.curso.nombre}</TableCell>
                            <TableCell>{item.codigo}</TableCell>
                            <TableCell>{item.tipo ? "Clase":"Laboratorio"}</TableCell>
                            <TableCell>{item.horas_semanales}</TableCell>
                            <TableCell>{item.sesiones_excel}</TableCell>
                        </TableRow>
                        ))
                        :   (
                            <Typography variant="body1" color="primary.light" style={SubtitulosTable}>    
                                No hay elementos en la tabla. 
                            </Typography>  
                            )
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl>
        </Form>
    )
}
