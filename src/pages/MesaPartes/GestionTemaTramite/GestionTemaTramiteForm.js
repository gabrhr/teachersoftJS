import React, { useEffect, useState } from 'react'
// import ContentHeader from '../../../components/AppMain/ContentHeader'
import ContentHeader from '../../../components/AppMain/ContentHeader'
import { Avatar, Divider, Grid, Input, Stack, Typography } from '@mui/material'
 
import { Controls } from '../../../components/controls/Controls'
import { useForm, Form } from '../../../components/useForm';
import { useTheme } from '@mui/material/styles'
/* fake BackEnd */
import * as DTLocalServices from '../../../services/DTLocalServices';
 
import { Box } from '@mui/system';
import tematramiteService from '../../../services/tematramiteService';
import seccionService from '../../../services/seccionService';


/*SERVICES*/ 


const styles = {
    columnGridItem: {
      padding: 2
    }
  }


const initialFieldValues = {
    id: 0,
    nombre: '',
    seccionId: 0,
    nombreSeccion: '',
    seccion: {
        id: '',
        nombre: ''
    }
}

export default function GestionTemaTramiteForm(props){

    const { recordForEdit, addOrEdit, setOpenPopup } = props
    const [createData, setCreateData] = useState(false);
    const [seccion, setSecciones] = useState([])
  
    const [cambio, setCambio] = React.useState(false);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        let defaultError = "Este campo es requerido"
        if ('nombre' in fieldValues)
          if (fieldValues.nombre.length === 0)
            temp.nombre = "Campo requerido"
          else
            temp.nombre = DTLocalServices.requiredField(fieldValues.nombre)
      
        if(recordForEdit){

          temp.idSeccion = values.idSeccion!=0? "": defaultError
        }else{
          temp.seccionId = values.seccionId!=0? "": defaultError
        }
    
        setErrors({
          ...temp
        })
    
        if (fieldValues == values)
          return Object.values(temp).every(x => x === "")
        // Ref:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(recordForEdit ? recordForEdit : initialFieldValues, true, validate);
    
    const handleSubmit = (e) => {
        /* e is a "default parameter" */
        e.preventDefault();

        if (validate()) {
          //window.alert('valid')
          //Este pasa como la nueva seccion o la seccion editada
    
          if (values.id) {
            const tema = tematramiteService.getTemaTramite(values.id);
            console.log(tema);
            
          }
    
          const newTema = {
            id: values.id,
            nombre: values.nombre,
            seccion: {
                id: recordForEdit ? parseInt(values.idSeccion) : parseInt(values.seccionId),
                nombre: values.nombreSeccion,
              },
            
            /*
            seccion: {
              id: recordForEdit ? parseInt(values.idSeccion) : parseInt(values.seccionId),
              nombre: null,
            },
            */
   
            //~~~foto: --queda pendiente
          }
          console.log(newTema);
          addOrEdit(newTema, resetForm)
        }
    }

    const getSecciones = async () => {

      const dataSecc = await seccionService.getSecciones();
      setSecciones(dataSecc?? [])
  }

    useEffect(() => {
        getSecciones()
        if (recordForEdit != null) {
          /* object is not empty */
          setValues({
            ...recordForEdit
          })
        }
    
    }, [recordForEdit])

    return (
        <>
             <Form onSubmit={handleSubmit}>
                <Grid 
                    container 
                    sx={{ gridTemplateColumns: "1fr 1fr 1fr ", }}
                >
                     {/* Datos Personales */}
                    <Grid item xs={12} sx={styles.columnGridItem}>
                        <Typography variant="h4" mb={2}>
                            DATOS DEL TEMA TRÁMITE
                        </Typography>
                        <Controls.Input
                        name="nombre"
                        label="Nombre"
                        value={values.nombre}
                        onChange={handleInputChange}
                        error={errors.nombre}
                        />
                        <Controls.Select
                            name={recordForEdit ? "idSeccion" : "seccionId"}
                            label="Seccion Principal"
                            value={recordForEdit ? values.idSeccion : values.seccionId}
                            onChange={handleInputChange}
                            options={[{ id: 0, nombre: "Seleccionar"}].concat(seccion)}
                            error={recordForEdit ? errors.idSeccion: errors.seccionId}
                        />
                    </Grid>
        
                </Grid>
                <Box display="flex" justifyContent="flex-end" mt={5} width={1} >
                    <Controls.Button
                        variant="outlined"
                        text="cancelar"
                        onClick={() => setOpenPopup(false)}
                    />

                    <Controls.Button
                        text="guardar cambios"
                        type="submit"
                    // onClick = {() => {
                    //     setConfirmDialog({
                    //         isOpen: true,
                    //         title: 'Confirmacion',
                    //         message: 'Se confirmó la adición',
                    //         onConfirm: () => {onSubmit()}
                    //         } )
                    //     }
                    // }
                    />
                </Box>
             </Form>
        </>
    )
}