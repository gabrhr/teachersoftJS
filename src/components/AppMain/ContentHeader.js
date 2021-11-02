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

  const ciclos = [];
  dataCic.map(cic => {
    return(ciclos.push({
      id: cic.id.toString(),
      title: cic.anho + '-' +cic.periodo
    }));
    
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
      window.localStorage.setItem('ciclo', JSON.stringify(parseInt(values.id)))
    },[values])
    
    //console.log(values);
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
