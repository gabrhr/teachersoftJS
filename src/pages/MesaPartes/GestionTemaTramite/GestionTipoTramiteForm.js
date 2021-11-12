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
import tipotramiteService from '../../../services/tipotramiteService';


const styles = {
    columnGridItem: {
      padding: 2
    }
  }


const initialFieldValues = {
    id: 0,
    nombre: '',
    id_tema: localStorage.getItem("id_tramite")
}

const getTemaTramites = async () => {

    const dataTema = await tematramiteService.getTemaTramites();
    const temaTramites = [];

    dataTema.map(tema => (
        temaTramites.push({
            id: tema.id,
            nombre: tema.nombre,
            id_tema: localStorage.getItem("id_tramite")
        })
    ));
    return temaTramites;
}

export default function GestionTemaTramiteForm(props){

    const { recordForEdit, addOrEdit, setOpenPopup } = props;
    const [temaTramite, seTemaTramite] = useState([]);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nombre' in fieldValues)
          if (fieldValues.nombre.length === 0)
            temp.nombre = "Campo requerido"
          else
            temp.nombre = DTLocalServices.requiredField(fieldValues.nombre)
 


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
            const tipo = tipotramiteService.getTipoTramite(values.id);
            console.log(tipo);
          }
    
          const newTipo = {
            id: values.id,
            nombre: values.nombre,
            temaTramiteMesaDePartes: {
              id:localStorage.getItem("id_tramite")
            },
            id_tema: localStorage.getItem("id_tramite")
          }
          
          console.log(newTipo);
          addOrEdit(newTipo, resetForm)
        }
    }

    useEffect(() => {
        getTemaTramites()
          .then(newTema => {
            seTemaTramite(prevTema => prevTema.concat(newTema));
        
          });
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

                    <Grid item xs={12} sx={styles.columnGridItem}>
                        <Typography variant="h4" mb={2}>
                            DATOS DEL TIPO DE TRÁMITE
                        </Typography>
                        <Controls.Input
                            name="nombre"
                            label="Nombre"
                            value={values.nombre}
                            onChange={handleInputChange}
                            error={errors.nombre}
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