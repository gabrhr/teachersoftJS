import { Form } from "../../../components/useForm"
import { Input, Grid, Stack, Paper, TableBody, TableCell, TableRow, InputAdornment } from '@mui/material';
import { Typography } from '@mui/material'
import { Controls } from '../../../components/controls/Controls'
import { StyledTableRow, StyledTableCell } from '../../../components/controls/StyledTable';
import useTable from "../../../components/useTable"
import React, {useState} from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ModalDocenteClasesAsignados from "./ModalDocenteClasesAsignados";
import ModalDocenteClasesBusqueda from "./ModalDocenteClasesBusqueda"
import HorarioService from '../../../services/horarioService';
import CursoService from '../../../services/cursoService';
import PersonaService from '../../../services/personaService';
import {useHistory} from 'react-router-dom'
import { useLocation } from 'react-router';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import  ContentHeader from '../../../components/AppMain/ContentHeader';
import Popup from '../../../components/util/Popup'
import ModalCancelarAsignarDocentes from "./ModalCancelarAsignarDocentes";
import ModalGuardarAsignarDocentes from "./ModalGuardarAsignarDocentes";
const fillDocentes = async() => {
  //Llamado del axios para llenar a los docentes - personas con id_rol = 1
  let docentes = [];

  const dataDoc = await PersonaService.getPersonasxTipo(1); //1 - docente
  
  if(!dataDoc) {  //No estima que no haya docentes ingresados - no deberia ser problema igual
    console.error("No se pudo regresar la data del backend para Docentes");
    return [];
  }
  for(let doc of dataDoc){
    if(doc.tipo_docente)
      docentes.push( doc ); //Se esquiva al docente - no se enlista porque no está asignado como tal.
  }
  
  console.log(docentes);
  return docentes
}

export default function ModalDocenteClases(){
    const [openCancelarPopup, setOpenCancelarPopup] = useState(false)
    const [openGuardarPopup, setOpenGuardarPopup] = useState(false)
    const history = useHistory()
    const location= useLocation()
    const {docentesAsig, horario, tipo, curso} = location.state
    const [recordsBusq, setRecordsBusq] = useState([])
    const [recordsAsig, setRecordsAsig] = useState(docentesAsig)
    const [tipoDic, setTipoDic] = useState(tipo ? horario.sesiones[1].tipo_dictado : horario.sesiones[0].tipo_dictado);
    const [recordsDel, setRecordsDel] = useState([])
      //Conseguimos los indices del arreglo - se puede ingresar de manera errada
      let iClase = horario.sesiones.findIndex( s => s.secuencia === 0);
      let iLab = iClase ? 0 : 1;

    
    //console.log("Lista de asignación: ", recordsAsig);
    React.useEffect(() => {
      fillDocentes()
        .then(docentes => {
          setRecordsBusq(docentes);        
        });  
    }, [])


    const handleSubmit = async e => {
      /* e is a "default parameter" */
      e.preventDefault();

      const datosSesion = []

      datosSesion[0] = tipo ? horario.sesiones[1].horas : horario.sesiones[0].horas
      datosSesion[1] = tipoDic
      
      console.log(datosSesion);
      if(recordsAsig.length > 0){
        if (!datosSesion[1]){  //El tipo es de dictado compartido
          let sumHorasDic = 0;
          for(let ses_doc of recordsAsig){
            sumHorasDic += ses_doc.horas_dictado_docente_sesion;
          }
          if(sumHorasDic !== datosSesion[0]){//Si la suma de hroas totales es distinto - se rechaza
            console.log("Insertar mensaje para el usuario: error de dictado compartido")
            return; //AARON: SI SE PUEDE - METERLE UN AVISO QUE LE INDIQUE EL ERROR: "LAS SUMA DE HORAS DE LOS DOCENTES NO SON IGUALES AL DEL HORARIO""
          }
        }
        else{ //El tipo es de dictado codicxtado
          for(let ses_doc of recordsAsig){
            if(ses_doc.horas_dictado_docente_sesion !== datosSesion[0]){//Si la suma de hroas totales es mayor - se rechaza
              console.log("Insertar mensaje para el usuario: error de co-dictado")
              return; //AARON: SI SE PUEDE - METERLE UNA VISO QUE INDIQUE EL ERROR: "LAS HORAS DE LOS DOCENTES NO SON IGUALES AL DEL HORARIO"
            }
          }
        }
      }

      console.log("Pasamos la prueba :D")
      //console.log(recordsAsig);
      //console.log(horario);

      //ANTES QUE NADA - VAMOS A BORRAR TODOS LOS QUE PERTENCEN A LA LISTA DE DELETE

      for(let del of recordsDel){
        const dataPer = await PersonaService.updatePersona(del)
        console.log(dataPer);
      }


      //Recorremos toda la persona para realizar la sesion_docente
      const sesion_docente = [];
      for(let ses_doc of recordsAsig){
        sesion_docente.push({
          "docente": {
            "id": ses_doc.docente.id
          },
          "horas_dictado_docente_sesion": ses_doc.horas_dictado_docente_sesion,
        })
      }
      let sesionesActual;
      //console.log(horario);
      //Ingresamos las sesiones - dependiendo del tiipo de secuencia
      if(tipo){ //Es 1 - laboratorio
        sesionesActual = [{
            "id": horario.sesiones[iClase].id,
            "horas": horario.sesiones[iClase].horas,
            "secuencia": horario.sesiones[iClase].secuencia,
            "sesion_docentes": horario.sesiones[iClase].sesion_docentes,
            "tipo_dictado": horario.sesiones[iClase].tipo_dictado,
          }, {
          "id": horario.sesiones[iLab].id,
          "horas": horario.sesiones[iLab].horas,
          "secuencia": horario.sesiones[iLab].secuencia,
          "sesion_docentes": sesion_docente,
          "tipo_dictado": tipoDic,
        }]
      }
      else{ //Es 0 - clase
        if(horario.sesiones[iLab]){
          sesionesActual = [{
            "id": horario.sesiones[iClase].id,
            "horas": horario.sesiones[iClase].horas,
            "secuencia": horario.sesiones[iClase].secuencia,
            "sesion_docentes": sesion_docente,
            "tipo_dictado": tipoDic,
          }, 
          {
            "id": horario.sesiones[iLab].id,
            "horas": horario.sesiones[iLab].horas,
            "secuencia": horario.sesiones[iLab].secuencia,
            "sesion_docentes": horario.sesiones[iLab].sesion_docentes,
            "tipo_dictado": horario.sesiones[iLab].tipo_dictado,
          }]
        }
        else{
          sesionesActual = [{
            "id": horario.sesiones[iClase].id,
            "horas": horario.sesiones[iClase].horas,
            "secuencia": horario.sesiones[iClase].secuencia,
            "sesion_docentes": sesion_docente,
            "tipo_dictado": tipoDic,
          }]
        }
      }

      //const ciclo = await CursoService.getCursoCicloxCicloxCodigoNombre
      const horUpdate = {
        "id": horario.id,
        "codigo": horario.codigo,
        "curso_ciclo": {
          "id": horario.curso_ciclo.id,
        },
        "sesiones": sesionesActual
      }

      console.log(horUpdate);
      const dataHor = await HorarioService.updateHorario(horUpdate);
      console.log(dataHor);

      //Ahora actualizaremos la data de cada persona agregada      
      for(let doc of recordsAsig){
        const dataPer = await PersonaService.updatePersona(doc.docente)
        console.log(dataPer);
      }

      // if(dataHor){
      //   history.push('/as/asignacionCarga/registroCarga/horarios')
      // } 
      console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
    }

    return(
      <>
        <ContentHeader 
        text= {tipo?"Búsqeda de docentes para laboratorios":"Búsqeda de docentes para clases"}
        cbo= {false}
        />
        <Controls.Button
          variant="outlined"
          text="Regresar"
          size="small"
          startIcon={<ArrowBackIcon />}
          onClick={() => {setOpenCancelarPopup(true)}}
        />
          <Form /*onSubmit={handleSubmit}*/>
                  <ModalDocenteClasesAsignados records = {recordsAsig} setRecords = {setRecordsAsig} tipo_dictado = {tipoDic} setTipoDic = {setTipoDic}
                                  sesion = {tipo ? horario.sesiones[iLab].horas : horario.sesiones[iClase].horas} recordsBusq = {recordsBusq} setRecordsBusq = {setRecordsBusq}
                                  recordsDel = {recordsDel} setRecordsDel = {setRecordsDel}/>
                  <Grid cointainer align="right" mt={2.5} />   
                  <hr color = "#636e9a"/> 
                  <Grid cointainer align="right" mt={2.5} />
                  <ModalDocenteClasesBusqueda records = {recordsBusq} setRecords = {setRecordsBusq} recordsAsig = {recordsAsig} setRecordsAsig = {setRecordsAsig}/>
              <Grid cointainer align="right" mt={5}>
                  <div>
                      <Controls.Button
                          // variant="contained"
                          // color="primary"
                          // size="large"
                          text="Guardar"
                          onClick={()=>{setOpenGuardarPopup(true)}}
                      >
                      </Controls.Button>
                  </div>
              </Grid>
          </Form>
          <Popup
                openPopup={openCancelarPopup}
                setOpenPopup={setOpenCancelarPopup}
                title="Regresar"
                size = "sm"
            >
               <ModalCancelarAsignarDocentes setOpenCancelarPopup={setOpenCancelarPopup} curso = {curso}/>
            </Popup> 
            <Popup
                openPopup={openGuardarPopup}
                setOpenPopup={setOpenGuardarPopup}
                title="Guardar"
                size = "sm"
            >
               <ModalGuardarAsignarDocentes setOpenGuardarPopup = {setOpenGuardarPopup} guardarAsignacion = {handleSubmit}/>
            </Popup>
        </>
    )
}