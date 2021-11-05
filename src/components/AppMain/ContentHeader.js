import { Grid,Typography,Box } from '@mui/material'
import React from 'react'
import { Controls } from '../controls/Controls';
/* fake BackEnd */
import * as employeeService from '../../services/employeeService';
import { Form, useForm } from '../useForm'
import { useTheme } from '@mui/material/styles'
import cicloService from "../../services/cicloService";
import {useState, useEffect} from 'react'

const fillCiclos = async () => {
  const dataCic = await cicloService.getCiclos();
  let cicloActual = {};
  console.log("Este es el dataCiclo: ", dataCic);

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
    if(cic.anho === 2021 && cic.periodo === 2){ //PARA QUE SEA EL AÑO ACTUAL - LUEGO HACERLO AUTOMATIZADO
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

function CboCiclo(props) {
    const [ciclos, setCiclos] = useState([]);
    const [cicloActual, setCicloActual] = useState();
    const cbo = props.cbo;
    const theme= useTheme();

    const {
      values,
      setValues,
      handleInputChange
    } = useForm(initialFieldValues);
    //console.log(values);

    React.useEffect(() => {
      fillCiclos()
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
      window.localStorage.setItem('ciclo', JSON.stringify(parseInt(values.id)))
    },[values])
    

    if (cbo) {

        return (<Grid item sx={{marginRight: theme.spacing(3)}}>
            <Box  sx={{width: "10vw", align: "Right"}}> 
                <Controls.Select
                    name="id"
                    label={"Ciclos"}
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

export default function ContentHeader({text, cbo}) {
    
    return (
        <Form>
            <Grid container >
                <Grid item >
                    <Typography 
                        variant="h3"
                        component="div"
                        paddingTop="5px"
                        paddingBottom="4px"
                        align="center"
                        color="primary"
                    >
                        {text}
                    </Typography>
                </Grid>
                <Grid item sm/>
                <CboCiclo cbo={cbo}/>
            </Grid>
        </Form>
    )
}
