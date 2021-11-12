/* Author:
 *
 * Basado en pages/MesaPartes/CargaArchivos.js
 */
import React from 'react'
import { Controls } from '../../components/controls/Controls'
import { StyledTableCell, StyledTableRow } from '../../components/controls/StyledTable';
import useTable from "../../components/useTable"
import { StyledTableCell, StyledTableRow } from '../../components/controls/StyledTable';
import { Box, Paper, TableBody, TableRow, TableCell } from '@mui/material';
import Notification from '../../components/util/Notification'
import { IconButton } from '@mui/material';

// services
import archivoService from '../../services/archivoService';

//icons
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

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

/* download all */
// function download(){
//     for(var i=0;i<records.length;i++){
//         var a = document.createElement("a"); //Create <a>
//         a.href = records[i].base64; //Image Base64 Goes here
//         a.download = records[i].nombre; //File name Here
//         a.click(); //Downloaded file
//     }
// }

/* upload files */
// function upload(){
//     var arr
//     for(var i=0;i<agregados.length;i++){
//         console.log("Subiendo Archivo")
//         /* FIX:  esto se cae si el archivo no contiene extension */
//         arr = agregados[i].nombre.split(".")
//         const data = {
//             nombre: arr[0],
//             extension: arr[1],
//             solicitud: { id: 1 },
//             contenido_b64: agregados[i].base64
//         }
//         archivoService.registerArchivo(data)
//         setNotify({
//             isOpen: true,
//             message: 'Registro de Archivos Añadidos',
//             type: 'success'
//         })
//     }
//     for(var i=0;i<eliminados.length;i++){
//         if(eliminados[i].id != null){
//             archivoService.deleteArchivo(eliminados[i].id)
//         }
//     }
//     setChangeData(true);
// }

// function add(){
//     var arr
//     console.log("G")
//     for(var i=0;i<archivos.length;i++){
        
//         const dataArch = {
//             nombre: nombArch[i],
//             base64: codigos[i]
//         }
//         records.push(dataArch)
//         agregados.push(dataArch)
//     }
//     setAddData(true);
    
// }

export default function FileUpload1(props) {
    const { solicitudID }  = props
    const [archivos, setArchivos] = React.useState([])
    const [records, setRecords] = React.useState([])

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);


    return (
        <div>
            
        </div>
    )
}
