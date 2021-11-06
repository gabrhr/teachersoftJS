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
import * as DTLocalServices from '../../services/DTLocalServices';
import { Form, useForm } from '../useForm'
import { useTheme } from '@mui/material/styles'
import cicloService from "../../services/cicloService";
import {useState, useEffect} from 'react'
import { DT } from '../../components/DreamTeam/DT'

const fillCiclos = async () => {
  let dataCic = await cicloService.getCiclos();
  dataCic = dataCic ?? [{id: '1', title: '2021-2'}]

  const ciclos = [];
  dataCic.map(cic => {
    ciclos.push({
      id: cic.id.toString(),
      title: cic.anho + '-' +cic.periodo
    })
  });
  return ciclos;
}

const initialFieldValues = {
    id: '',
    title: ''
}

function CboCiclo(props) {
    const [ciclos, setCiclos] = useState([]);

    const cbo = props.cbo;
    const theme= useTheme();
    
    const {
      values,
      // setValues,
      handleInputChange
    } = useForm(initialFieldValues);

    React.useEffect(() => {
      fillCiclos()
      .then (newCiclo =>{
        setCiclos(newCiclo);
        //console.log(ciclos);
      });
    }, [])

    React.useEffect(()=>{
      window.localStorage.setItem('ciclo', JSON.stringify(values.id))
    },[values])
    
    //console.log(values);
    if (cbo) {

        return (<Grid item sx={{marginRight: theme.spacing(3)}}>
            <Box  sx={{width: "10vw", align: "Right"}}> 
                <Controls.Select
                    name="title"
                    label="Ciclo"
                    value={values.title}
                    onChange={handleInputChange}
                    options={DTLocalServices.getAllCiclos()}
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

    // console.log("ContentHeader: ")
    // console.log(DTLocalServices.getAllCiclos())
    
    return (
        <Form>
            <Grid container >
                <Grid item >
                    <DT.Title size="big" text={text} />
                </Grid>
                <Grid item sm/>
                <CboCiclo cbo={cbo}/>
            </Grid>
        </Form>
    )
}
