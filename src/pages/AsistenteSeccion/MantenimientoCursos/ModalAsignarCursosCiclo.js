import { useForm, Form } from "../../../components/useForm"
import { useState } from "react";
import React from "react";
import Popup from "../../../components/util/Popup";
import { Controls } from "../../../components/controls/Controls"
import { Alert, Grid, InputAdornment, Paper, TableBody, Typography } from '@mui/material'
import ModalCursosCicloAsignados from './ModalCursosCicloAsignados'
import ModalCursosCicloBusqueda from "./ModalCursosCicloBusqueda";
import CursoService from '../../../services/cursoService';
import cursoService from "../../../services/cursoService";

const guardarCursos = async (recordsAsig, recordsDelete) => {
  //FUNCION PARA PODER ASIGNAR LOS CURSOS
  console.log(recordsAsig);
  console.log(recordsDelete);
  const ciclo = window.localStorage.getItem("ciclo"); 

  for(let cc of recordsDelete){
    //Previamente, verificamos que el curso no esté ingresado
    await cursoService.getCursoCicloxCicloxCodigoNombre(ciclo, cc.codigo)
      .then(data => {
        if(data.length === 0){
          console.log("No existe el curso");
        }
        else{ //Ya se ingreso previamente - no se hace nada
          console.log("Se elimina el curso");
          CursoService.deleteCursoCiclo(parseInt(data[0].id));
        }
    });
  }

  for(let cc of recordsAsig){
    //Previamente, verificamos que el curso no esté ingresado
    await cursoService.getCursoCicloxCicloxCodigoNombre(ciclo, cc.codigo)
      .then(data => {
        if(data.length === 0){
          console.log("Si ingresa la data");
          const cursoCic ={
            "curso":{
              "id": cc.id
            },
            "ciclo":{
              "id": ciclo
            },
            "cantidad_horarios": 0,
            "estado_tracking": 0
          }
          console.log(cursoCic);
          CursoService.registerCursoCiclo(cursoCic)
        }
        else{ //Ya se ingreso previamente - no se hace nada
          console.log("Se actualiza la data");
        }
    });
  }
}



export default function AsignarCursosCiclo({setOPP}){

    const [recordsBusq, setRecordsBusq] = useState([])
    const [recordsAsig, setRecordsAsig] = useState([])
    const [recordsDelete, setRecordsDelete] = useState([])
    const [recordsBusqChecked, setRecordsBusqChecked]  = useState([])
    const [recordsAsigChecked, setRecordsAsigChecked]  = useState([])

    const setRecordsChecked = (rec, setRec, cursos) => {
        //setRec([])
        for(let i in cursos){
            rec.push(false)
        }
        console.log(rec)
    }
    const setRecordsCheckedAsig = (rec, setRec, cursos) => {
        //setRec([])
        for(let i in cursos){
            rec.push(false)
        }
        console.log(rec)
    }

    const fillCursos = async () => {
        let dataCur = await CursoService.listarCursosNoAsignados(window.localStorage.getItem("ciclo"),"");
        console.log(dataCur) 
        //dataSecc → id, nombre,  fechaFundacion, fechaModificacion,nombreDepartamento
        if(!dataCur) dataCur = []
        const cursos = [];
        dataCur.map(cur => (
          cursos.push({
            id: cur.id.toString(),
            nombre: cur.nombre,
            codigo: cur.codigo,
            creditos: cur.creditos,
            seccion: cur.seccion,
            selected: false
          })
        ));

        setRecordsChecked(recordsBusqChecked, setRecordsBusqChecked, cursos)
        //console.log(cursos);
        return cursos;
      }

    const fillCursosAsignados = async () => {
        let dataCur = await CursoService.getCursoCicloxCicloxCodigoNombre(window.localStorage.getItem("ciclo"),"");
        console.log(dataCur) 
        //dataSecc → id, nombre,  fechaFundacion, fechaModificacion,nombreDepartamento
        if(!dataCur) dataCur = []
        const cursos = [];
        dataCur.map(cur => (
          cursos.push({
            id: cur.curso.id.toString(),
            nombre: cur.curso.nombre,
            codigo: cur.curso.codigo,
            creditos: cur.curso.creditos,
            seccion: cur.curso.seccion,
            selected: false
          })
        ));
        
        setRecordsCheckedAsig(recordsAsigChecked, setRecordsAsigChecked, cursos)
        //console.log(cursos);
        return cursos;
      }

    const handleSubmit = async e => {
        /* e is a "default parameter" */
        e.preventDefault()
        // if (validate())
  
        //console.log(recordsAsig);
        //console.log(horario);
  
        //////////////////////ADECUAR ESTO PARA LA ASIGNACIÓN DE CURSOS/////////////////////////////////////////////////
        //Recorremos toda la persona para realizar la sesion_docente
        // const sesion_docente = [];
        // for(let ses_doc of recordsAsig){
        //   sesion_docente.push({
        //     "docente": {
        //       "id": ses_doc.docente.id,
        //       "cargaDocente": ses_doc.docente.cargaHoraria,
        //       "deuda_docente": ses_doc.docente.deudaHoraria,
        //     },
        //     "horas_dictado_docente_sesion": ses_doc.horas_dictado_docente_sesion,
        //   })
    }

    React.useEffect(() => {
        fillCursos()
        .then (newCurs =>{
          setRecordsBusq(prevRecords => prevRecords.concat(newCurs));
          //console.log(newSeccion);
          
          //console.log(records);
        });
        fillCursosAsignados()
        .then (newCurs =>{
          setRecordsAsig(prevRecords => prevRecords.concat(newCurs));
          //console.log(newSeccion);
          
          //console.log(records);
        });
      }, [])

    return(
        <>
            <Form onSubmit={handleSubmit}>
            <Paper> 
                <ModalCursosCicloAsignados records = {recordsAsig} setRecords = {setRecordsAsig} recordsBusq = {setRecordsBusq} 
                                           setRecordsBusq = {setRecordsBusq} recordsDel = {recordsDelete} setRecordsDel = {setRecordsDelete}/>
                <Grid cointainer align="right" mt={2.5} />   
                <hr color = "#636e9a"/> 
                <Grid cointainer align="right" mt={2.5} />
                <ModalCursosCicloBusqueda records = {recordsBusq} setRecords = {setRecordsBusq} recordsAsig = {setRecordsAsig} 
                                          setRecordsAsig = {setRecordsAsig}/>
            </Paper>
            <Grid cointainer align="right" mt={5}>
                <div>
                    <Controls.Button
                        // variant="contained"
                        // color="primary"
                        // size="large"
                        text="Guardar"
                        type="submit"
                        onClick = {()=> {guardarCursos(recordsAsig, recordsDelete); setOPP(false)}}
                    >
                    </Controls.Button>
                </div>
            </Grid>
            </Form>
        </>
    )
}