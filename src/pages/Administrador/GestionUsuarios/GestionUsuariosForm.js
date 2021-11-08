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
import departamentoService from '../../../services/departamentoService';
import SeccionService from '../../../services/seccionService.js';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Box } from '@mui/system'

const styles = {
  columnGridItem: {
    padding: 2
  }
}

const initialFieldValues = {
  id: 0,
  idPersona: '',
  nombre: '',
  apellidoMaterno: '',
  apellidoPaterno: '',
  DNI: '',
  correo: '',
  rol: '',
  departamentId: '',
  nombreDepartamento: '',
  seccionId: '',
  nombreSeccion: '',
  departamento: {
    id: '',
    nombre: ''
  },
  seccion: {
    id: '',
    nombre: ''
  }
}
/*
const FillDepartamentos = async () =>{
  const dataDep = await DepartamentoService.getDepartamentos();
  const departamentos = []
  //if(dataDep) setDepartamentos(dataDep);
  dataDep.map(dep => (
    departamentos.push({
      id: dep.id.toString(),
      nombre: dep.nombre,
    })
  ));

  //console.log(departamentos);
  return departamentos;
}*/

const getDepartamento = async () => {

  const dataDep = await departamentoService.getDepartamentos();
  console.log("AQUI ESTA EL DATADEP")
  console.log(dataDep)
  const departamentos = [];
  if(dataDep){
    dataDep.map(dep => (
    departamentos.push({
      id: dep.id.toString(),
      nombre: dep.nombre,
      correo: dep.correo,
      fechaModificacion: dep.fecha_modificacion,
      fechaFundacion: dep.fechaFundacion,
    })
    ));
  }
  else console.log("No existen datos en Departamentos");
  return departamentos;
}

const getSecciones = async () => {

  const dataSecc = await SeccionService.getSecciones();
  //dataSecc → id, nombre,  fechaFundacion, fechaModificacion,nombreDepartamento
  const secciones = [];
  dataSecc.map(seccion => (
    secciones.push({
      id: seccion.id.toString(),
      nombre: seccion.nombre,
      fechaFundacion: seccion.fecha_fundacion,
      fechaModificacion: seccion.fecha_modificacion,
      departamento:{
        id: seccion.departamento.id,
        nombre: seccion.departamento.nombre
      },
      correo: seccion.correo,
      foto:seccion.foto
    })
    ));
  //console.log(secciones);

  return secciones;
}

export default function GestionUsuariosForm(props) {

  const { recordForEdit,addOrEdit, setOpenPopup } = props
  const [createData, setCreateData] = useState(false);
  const [departamento, setDepartamentos] = useState([])
  const [seccion, setSecciones] = useState([])

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
    if ('nombre' in fieldValues)
      if (fieldValues.nombre.length === 0)
        temp.nombre = "Campo requerido"
      else
        temp.nombre = DTLocalServices.validateName(fieldValues.nombre)
    if ('apellidoPaterno' in fieldValues)
      if (fieldValues.apellidoPaterno.length === 0)
        temp.apellidoPaterno = "Campo requerido"
      else
        temp.apellidoPaterno = DTLocalServices.validateName(fieldValues.apellidoPaterno)
    if ('apellidoMaterno' in fieldValues)
      temp.apellidoMaterno = DTLocalServices.validateName(fieldValues.apellidoMaterno)
    if ('correo' in fieldValues)
      temp.correo = DTLocalServices.validateEmail(fieldValues.correo)
    if ('documento' in fieldValues)
      temp.documento = (/^\d\d\d\d\d\d\d\d$/).test(fieldValues.documento)
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
  } = useForm(recordForEdit ? recordForEdit : initialFieldValues, true, validate);

  const handleSubmit = e => {
    /* e is a "default parameter" */
    e.preventDefault()
    if (validate()){
      //window.alert('valid')
    //Este pasa como la nueva seccion o la seccion editada
      const newUsr = {
        id: values.id,
        idPersona: values.idPersona,
        nombre: values.nombre.toUpperCase(),
        apellidoPaterno: values.apellidoPaterno.toUpperCase(),
        apellidoMaterno: values.apellidoMaterno.toUpperCase(),
        correo: values.correo,
        DNI: values.documento,
        rol: values.rol,
        departamento: {
          id: recordForEdit ? parseInt(values.idDepartamento) : parseInt(values.departmentId) ,
          nombre: null,
        },
        seccion: {
          id: recordForEdit ? parseInt(values.idSeccion) : parseInt(values.seccionId) ,
          nombre: null,
        },

        //foto: fotoPerfil ? fotoPerfil : values.foto_URL,
        //~~~foto: --queda pendiente
      }
      console.log(newUsr);

      addOrEdit({...newUsr, image: fileFoto}, resetForm)
    }else{
      window.alert('invalid')
    }

  }

  /* "detect the change of recordForEdit inside this bottom component" */
  /*useEffect(() => {
    if (recordForEdit != null) {
      // object is not empty
      setValues({
        ...recordForEdit
      })
    }
  }, [recordForEdit])*/

  useEffect(() => {

    getDepartamento()
    .then (newDep =>{
      setDepartamentos(prevRecords => prevRecords.concat(newDep));

      //console.log(newSeccion);

    });
    if (recordForEdit != null) {
      /* object is not empty */
      setValues({
        ...recordForEdit
      })
    }

  }, [recordForEdit])

  useEffect(() => {
    getSecciones()
    .then (newSecc =>{
      setSecciones(prevSecc => prevSecc.concat(newSecc));

      //console.log(newSeccion);


    });
    if (recordForEdit != null) {
      /* object is not empty */
      setValues({
        ...recordForEdit
      })
    }

  }, [recordForEdit])

  /*useEffect(() => {
    getSecciones()
  }, [])

  const getSecciones = () => {

    DTLocalServices.getSecciones().then((response) => {
          setSecciones(response.data)
          console.log(response.data);
      });
  };*/

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
              name="nombre"
              label="Nombre"
              value={values.nombre}
              onChange={handleInputChange}
              error={errors.nombre}
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
              name="documento"
              label="Documento de Identidad"
              value={values.documento}
              onChange={handleInputChange}
              error={errors.documento}
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
              name={recordForEdit ? "idDepartamento":"departmentId"}
              label="Departamento"
              value={recordForEdit ? values.idDepartamento : values.departmentId}
              onChange={handleInputChange}
              options={departamento}

            />
            <Controls.Select
              name={recordForEdit ? "idSeccion" : "seccionId"}
              label="Seccion Principal"
              value={recordForEdit ? values.idSeccion : values.seccionId}
              onChange={handleInputChange}
              options={seccion}

            />

          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mt: 9, mb: 2, mx: 1 }} />
          {/* Foto del usuario */}
          <Grid item xs sx={styles.columnGridItem} align="center" >
            <Typography variant="h4" marginBottom={2}>
              FOTO REFERENCIAL
            </Typography>
            <Avatar src={values.foto_URL ? values.foto_URL : fotoPerfil} sx={{ width: 250, height: 250, mb: 2 }} />
            {/* Botoncito para subir imagen */}
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file"
                type="file" sx={{ display: 'none' }}
                value = {values.fileFoto}
                onChange={(event) => {
                  const files = event.target.files

                  //console.log(files[0]);
                  setFileFoto(files[0])
                  setCambio(true)

                  if (files && files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                      setFotoPerfil(e.target.result)
                      console.log(e.target.result)
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
            onClick={()=>setOpenPopup(false)}
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
