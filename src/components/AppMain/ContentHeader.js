/* Author: Gabriela 
 *
 * Componente que va como cabecera de la mayoria de las paginas,  
 * indica el ciclo sobre el que se esta modificando la data 
 */
import { Grid,Typography,Box } from '@mui/material'
import React from 'react'
import { Controls } from '../controls/Controls';
/* fake BackEnd */
import * as employeeService from '../../services/employeeService';
import { Form, useForm } from '../useForm'
import { useTheme } from '@mui/material/styles'
import cicloService from "../../services/cicloService";
import {useState, useEffect} from 'react'
import { DT } from '../../components/DreamTeam/DT'

const fillCiclos = async (cicloActualAxios) => {
  //const dataCic = await cicloService.getCiclos();
  //console.log("Este es el dataCiclo: ", dataCic);
  let dataCic = await cicloService.getCiclos();
  dataCic = dataCic ?? [{id: '1', title: '2021-2'}]
  let cicloActual = {};

  const ciclos = [];
  if(!dataCic) {
    console.error("No se pudo regresar la data del backend para Ciclos");
    return [];
  }
  
  dataCic.map(cic => {
    ciclos.push({
      id: cic.id.toString(),
      title: cic.anho + '-' +cic.periodo
    })
    if(cic.id === cicloActualAxios[0].id){ //PARA QUE SEA EL AÑO ACTUAL - LUEGO HACERLO AUTOMATIZADO
      cicloActual = {
        id: cic.id.toString(),
        title: cic.anho + '-' + cic.periodo
      }
    }
  });
  return [ciclos,cicloActual];
}

const initialFieldValues = {
    id: '',
    title: ''
}

function CboCiclo (props) {
    const [ciclos, setCiclos] = useState([]);
    const [cicloActual, setCicloActual] = useState();
    const cbo = props.cbo;
    const records = props.records;
    const setRecords = props.setRecords;
    const theme= useTheme();
    let cicloActualAxios;

    const {
      values,
      setValues,
      handleInputChange
    } = useForm(initialFieldValues);  

    React.useEffect(() => {
      cicloService.cicloActual()
      .then(c => {
          cicloActualAxios = c
      });
      if(!cicloActualAxios) cicloActualAxios = [{id: 2, title: '2021-2'}];
      window.localStorage.setItem('ciclo', JSON.stringify(parseInt(cicloActualAxios[0].id))) //El ciclo fijo - actual

      fillCiclos(cicloActualAxios)
      .then (newCiclo => {
        setCiclos(newCiclo[0]);
        setCicloActual(newCiclo[1]);
        setValues(newCiclo[1]); //Si aca no lo hacemos directo - se muere porque no prometemos antes el CicloActual
        //console.log("Ciclo: ",cicloActual);
        //console.log("Values: ", values);
      });
    }, [])
    //console.log("Values: ", values);
    /*UNA VEZ ACTUALIZAMOS LOS DATOS DE VALUES - LE PASAMOS EL CICLOACTUAL PARA QUE SEA EL DEFAULT */

    React.useEffect(()=>{
        if(records)  setRecords(values.id);
        else{
          let cicloActual = window.localStorage.getItem("ciclo");
          if (setRecords) setRecords(cicloActual)
        }  
        window.localStorage.setItem('cicloSeleccionado', JSON.stringify(parseInt(values.id)))
    },[values])

    if (cbo) {

        return (<Grid item sx={{marginRight: theme.spacing(3)}}>
            <Box  sx={{width: "10vw", align: "Right"}}> 
                <Controls.Select
                    name="id"
                    label="Ciclo"
                    value={values.id}
                    onChange={handleInputChange}
                    options={ciclos}
                    type="contained"
                />
            </Box>
        </Grid>
        );
    }else{
        return null;
    }
}

export default function ContentHeader({text, cbo, records, setRecords}) {
    //console.log(records)
    // console.log("ContentHeader: ")
    // console.log(DTLocalServices.getAllCiclos())
    
    return (
        <Form>
            <Grid container >
                <Grid item >
                    <DT.Title size="big" text={text} />
                </Grid>
                <Grid item sm/>
                <CboCiclo cbo={cbo} records = {records} setRecords = {setRecords}/>
            </Grid>
        </Form>
    )
}
