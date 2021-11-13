/* Author: Angel
 *
 */

import React, { useEffect, useState } from 'react'
import { Controls } from '../../components/controls/Controls'
import archivoService from '../../services/archivoService';
import { StyledTableCell, StyledTableRow } from '../../components/controls/StyledTable';
import { Box, Paper, TableBody, TableRow, TableCell } from '@mui/material';
import { IconButton, InputAdornment, Toolbar } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import useTable from "../../components/useTable"
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ConfirmDialog from '../../components/util/ConfirmDialog'
import Notification from '../../components/util/Notification'

const tableHeaders = [
    {
    id: 'fullName',
    label: 'Nombre Archivo',
    numeric: false,
    sortable: true
  },
  {
    id: 'actions',
    label: 'Acciones',
    numeric: false,
    sortable: false
  }
]

/* get files from DB (downloads content too!) */
const getArchivos = async () =>{
    var archivo = await archivoService.getArchivos();
    archivo = archivo ?? []
    //console.log(archivo)
    const archs = [];
    archivo.map(arch => (
        archs.push({
          id: arch.id.toString(),
          nombre: arch.nombre + '.' + arch.extension,
          base64: arch.contenido_b64
        })
    ));
    //console.log(archs)
    return archs;
}

export default function CargaArchivos(){
    const [archivos, setArchivos] = React.useState([]);
    const [records, setRecords] = React.useState([]);
    const [agregados, setAgregados] = React.useState([]);
    const [eliminados, setEliminados] = React.useState([]);
    const [cambio, setCambio] = React.useState(false);
    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
    const [changeData, setChangeData] = React.useState(false);
    const [addData, setAddData] = React.useState(false);
    const [deleteData, setDeleteData] = React.useState(false);
    const [nombArch, setNombArch] = React.useState([]);
    const [codigos, setCodigos] = React.useState([]);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);

    /* download selected file */
    function download(){
    
        for(var i=0;i<records.length;i++){
          //console.log(codigos[i])
          var a = document.createElement("a"); //Create <a>
          a.href = records[i].base64; //Image Base64 Goes here
          a.download = records[i].nombre; //File name Here
          a.click(); //Downloaded file
        }
        
        /*var a = document.createElement("a"); //Create <a>
        a.href = "data:application/*;base64," + ImageBase64; //Image Base64 Goes here
        a.download = nombArch; //File name Here
        a.click(); //Downloaded file*/
    }
    
    function upload(){
        var arr
        console.log(records)
        console.log(agregados)
        console.log(eliminados)
        
        for(var i=0;i<agregados.length;i++){
            console.log("Subiendo Archivo")
            arr = agregados[i].nombre.split(".")
            const data = {
                nombre: arr[0],
                extension: arr[1],
                id_solicitud: 200,
                contenido_b64: agregados[i].base64
            }
            archivoService.registerArchivo(data)
            setNotify({
                isOpen: true,
                message: 'Registro de Archivos Añadidos',
                type: 'success'
            })
        }
        for(var i=0;i<eliminados.length;i++){
            if(eliminados[i].id != null){
                archivoService.deleteArchivo(eliminados[i].id)
            }
        }
        setChangeData(true);
    }

    /* agregar archivo a la tabla (aun no lo sube) */
    function add(){
        var arr
        console.log("G")
        for(var i=0;i<archivos.length;i++){
            
            const dataArch = {
                nombre: nombArch[i],
                base64: codigos[i]
            }
            records.push(dataArch)
            agregados.push(dataArch)
        }
        setAddData(true);
        
    }

    useEffect(() => {
        getArchivos()
        .then (newArch =>{
           setRecords(newArch);
           setChangeData(false);
        });
    }, [recordForEdit])

    const onDelete = (obj) => {
        console.log("ELM")
        const filtredData = records.filter(item => item.nombre != obj.nombre);
        setRecords(filtredData);
        eliminados.push(obj)
        const dataFiltrada = agregados.filter(item => item.nombre != obj.nombre);
        setAgregados(dataFiltrada);
        setDeleteData(true);
        setNotify({
            isOpen: true,
            message: 'Borrado Exitoso',
            type: 'success'
        })
    }

    const onDownload = (item) => {
        var a = document.createElement("a"); //Create <a>
        a.href = item.base64; //Image Base64 Goes here
        a.download = item.nombre; //File name Here
        a.click(); //Downloaded file
    }

    return (
        <>
        <label htmlFor="contained-button-file">
            <input type="file" multiple onChange={(event) => {
                  const files = event.target.files

                  console.log(files);
                  setArchivos(files)
                  //setFileFoto(files[0])
                  //setNombArch(files[1].name)
                  setCambio(true)
                  
                  if (files) {
                    for(var i=0;i<files.length;i++){
                      var reader = new FileReader();
                      nombArch.push(files[i].name)
                      reader.onload = function (e) {
                        codigos.push(e.target.result)
                        //console.log(e.target.result)
                      };
                      reader.readAsDataURL(files[i]);
                    }
                  }
                }}/>
            <Controls.Button
                text="Descargar Archivos"
                // type="submit"   // html property (not component)
                //endIcon={<AddAPhotoIcon />} //Opcional con imagen
                size="medium"
                onClick={ () => {download()}}
              />
            <Controls.Button
                text="Enviar Archivos"
                // type="submit"   // html property (not component)
                //endIcon={<AddAPhotoIcon />} //Opcional con imagen
                size="medium"
                onClick={ () => {upload()}}
              />
            <Controls.Button
                text="Agregar Archivos"
                // type="submit"   // html property (not component)
                //endIcon={<AddAPhotoIcon />} //Opcional con imagen
                size="medium"
                onClick={ () => {add()}}
              />
        </label>
        <BoxTbl>
          <TblContainer>
            <TblHead />
            <TableBody>
              {
                // API devuelve [].  map se cae.  Llamar 2 veces.
                // recordsAfterPagingAndSorting() && recordsAfterPagingAndSorting().map(item => (
                recordsAfterPagingAndSorting().map(item => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell>
                        <IconButton aria-label="pdf">
                        <PictureAsPdfIcon/>
                        </IconButton>
                        
                        {item.nombre}
                    </StyledTableCell>
                    <StyledTableCell>
                      <IconButton aria-label="delete">
                        <DeleteIcon
                        color="warning"
                        onClick={() => {
                            onDelete(item)
                        }}/>
                      </IconButton>
                      <IconButton aria-label="descargar">
                        <DownloadIcon
                        color="warning"
                        onClick={() => {
                            onDownload(item)
                        }}/>
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              }
            </TableBody>
          </TblContainer>
          <TblPagination />
        </BoxTbl>
        <Notification
            notify={notify}
            setNotify={setNotify}
        />
        </>
    )

}