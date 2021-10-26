import React, { useEffect, useState } from 'react'
// import ContentHeader from '../../../components/AppMain/ContentHeader'
import ContentHeader from '../../../components/AppMain/ContentHeader'
import { Avatar, Divider, Grid, Input, Stack, Typography } from '@mui/material'
import { DT } from '../../../components/DreamTeam/DT'
import { Controls } from '../../../components/controls/Controls'
import { useForm, Form } from '../../../components/useForm';
import { useTheme } from '@mui/material/styles'
/* fake BackEnd */
import * as DTLocalServices from '../../../services/DTLocalServices';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Box } from '@mui/system'

const styles = {
  columnGridItem: {
    padding: 2
  }
}

const initialFieldValues = {
  id: 0,
  nombres: '',
  apellidoMaterno: '',
  apellidoPaterno: '',
  DNI: '',
  correo: '',
  rol: '',
  departamento: '',
  seccion: '',
}

export default function GestionUsuariosForm(props) {

  const { addOrEdit, recordForEdit } = props

  // const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', message: '', type: ''})
  const [fotoPerfil, setFotoPerfil] = React.useState(null);
  const [fileFoto, setFileFoto] = React.useState(null);
  const [cambio, setCambio] = React.useState(false);


  // const onSubmit = id => {
  //     setConfirmDialog({
  //         ...confirmDialog ,
  //         isOpen: false,
  //     })
  // }

  /* for "onChange" validation (real time validation) */
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('nombres' in fieldValues)
      if (fieldValues.nombres.length === 0)
        temp.nombres = "Campo requerido"
      else
        temp.nombres = DTLocalServices.validateName(fieldValues.nombres)
    if ('apellidoPaterno' in fieldValues)
      if (fieldValues.apellidoPaterno.length === 0)
        temp.apellidoPaterno = "Campo requerido"
      else
        temp.apellidoPaterno = DTLocalServices.validateName(fieldValues.apellidoPaterno)
    if ('apellidoMaterno' in fieldValues)
      temp.apellidoMaterno = DTLocalServices.validateName(fieldValues.apellidoMaterno)
    if ('correo' in fieldValues)
      temp.correo = DTLocalServices.validateEmail(fieldValues.correo)
    if ('DNI' in fieldValues)
      temp.DNI = (/^\d\d\d\d\d\d\d\d$/).test(fieldValues.DNI) 
        ? ""
        : "DNI necesita 8 digitos"
    if ('rol' in fieldValues)
      temp.rol = DTLocalServices.requiredField(fieldValues.rol)
    if ('departamento' in fieldValues)
      temp.departamento = DTLocalServices.requiredField(fieldValues.departamento)
    if ('seccion' in fieldValues)
      temp.seccion = DTLocalServices.requiredField(fieldValues.seccion)

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
  } = useForm(initialFieldValues, true, validate);

  const handleSubmit = e => {
    /* e is a "default parameter" */
    e.preventDefault()
    if (validate())
      addOrEdit(values, resetForm)
  }

  /* "detect the change of recordForEdit inside this bottom component" */
  useEffect(() => {
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
        <Grid container
          sx={{
            gridTemplateColumns: "1fr 1fr 1fr ",
          }}
        >
          {/* Datos Personales */}
          <Grid item xs={4} sx={styles.columnGridItem}>
            <Typography variant="h4" mb={2}>
              DATOS PERSONALES
            </Typography>
            <Controls.Input
              name="nombres"
              label="Nombre"
              value={values.nombres}
              onChange={handleInputChange}
              error={errors.nombres}
            />
            <Controls.Input
              name="apellidoPaterno"
              label="Apellido Paterno"
              value={values.apellidoPaterno}
              onChange={handleInputChange}
              error={errors.apellidoPaterno}
            />
            <Controls.Input
              name="apellidoMaterno"
              label="Apellido Materno"
              value={values.apellidoMaterno}
              onChange={handleInputChange}
              error={errors.apellidoMaterno}
            />
            <Controls.Input
              name="DNI"
              label="Documento de Identidad"
              value={values.DNI}
              onChange={handleInputChange}
              error={errors.DNI}
            />
            <Controls.Input
              name="correo"
              label="Correo Electrónico"
              value={values.correo}
              onChange={handleInputChange}
              error={errors.correo}
            />
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mt: 9, mb: 2, mx: 1 }} />

          {/* Restricciones */}
          <Grid item xs={4} sx={styles.columnGridItem} >
            <Typography variant="h4" marginBottom={2} >
              RESTRICCIONES
            </Typography>
            <Controls.Select
              name="rol"
              label="Rol del Usuario"
              value={values.rol}
              onChange={handleInputChange}
              options={DTLocalServices.getAllRoles()}
              error={errors.rol}
            />
            <Controls.Select
              name="departamento"
              label="Departamento"
              value={values.departamento}
              onChange={handleInputChange}
              options={DTLocalServices.getAllDepartamentos()}
              error={errors.departamento}
            />
            <Controls.Select
              name="seccion"
              label="Sección Principal"
              value={values.seccion}
              onChange={handleInputChange}
              options={DTLocalServices.getAllSecciones()}
              error={errors.seccion}
            />
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mt: 9, mb: 2, mx: 1 }} />
          {/* Foto del usuario */}
          <Grid item xs sx={styles.columnGridItem} align="center" >
            <Typography variant="h4" marginBottom={2}>
              FOTO REFERENCIAL
            </Typography>
            <Avatar src={fotoPerfil} sx={{ width: 250, height: 250, mb: 2 }} />
            {/* Botoncito para subir imagen */}
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file"
                type="file" sx={{ display: 'none' }}
                onChange={(event) => {
                  const files = event.target.files
                  //console.log(files[0]);

                  setFileFoto(files[0])
                  setCambio(true)

                  if (files && files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                      setFotoPerfil(e.target.result)
                    };
                    reader.readAsDataURL(files[0]);

                  }
                }}
              />
              <Controls.Button
                text="Subir foto"
                // type="submit"   // html property (not component)
                endIcon={<AddAPhotoIcon />} //Opcional con imagen
                size="medium"
                component="span"
              />
            </label>
          </Grid>
        </Grid>
        {/* <Grid align="right" marginY={5} > */}
        <Box display="flex" justifyContent="flex-end" mt={5} width={1} >
          <Controls.Button
            variant="outlined"
            text="cancelar"
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
      {/* <MessageBoxOK
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            /> */}
    </>
  )
}
