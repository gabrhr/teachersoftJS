/* Author:  Angel
 * Modified by: Mitsuo
 *
 * Basado en pages/MesaPartes/CargaArchivos.js
 * 
 * Los archivos estan en un "buffer" llamado archivos.  Una ves que la solicitud
 * se envia y obtenemos su id,  podemos enviar los archivos 1 a 1.
 * 
 * Changes:
 * - remove idle variables
 * - Eliminar no funcionaba consistentemente
 * - Notificaciones y funcion upload() mover a componente externo
 * - Remove annoying paralel arrays
 * - Unify agregados, eliminados, and records into just records
 */
import React from 'react'
import { Controls } from '../../components/controls/Controls'
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

/* get files from DB (downloads content too!) */
const getArchivos = async () => {
  var archivos = await archivoService.getArchivosSolicitud(1);
  archivos = archivos ?? []
  archivos = archivos.map(x => {
    return {
      id: x.id.toString(),
      nombre: x.nombre + '.' + x.extension,
      base64: x.contenido_b64
    }
  })
  return archivos;
}

function upload(records) {
  var arr   // namesplit
  let i
  // arr = file.nombre.split(".")
  const data = {
    nombre: arr[0],
    extension: arr[1],
    solicitud: { id: 1 },
    contenido_b64: records[i].base64
  }
  archivoService.registerArchivo(data)
}

/* download selected file */
/* (no entiendo que es lo que hace) */
function download(records) {
  for (var i = 0; i < records.length; i++) {
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

export default function CargaArchivos() {
  // /* archivos en el FileInputButton */
  // const [archivos, setArchivos] = React.useState([]);
  /* mostrados en la tabla */
  const [records, setRecords] = React.useState([]);
  // /* agregados (pero aun no a BD) */
  // const [agregados, setAgregados] = React.useState([]);
  // /* eliminados (pero aun no en BD) */
  // const [eliminados, setEliminados] = React.useState([]);
  /* arreglos "paralelos" nombre y data */
  const [nombArch, setNombArch] = React.useState([]);
  const [codigos, setCodigos] = React.useState([]);

  const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    BoxTbl
  } = useTable(records, tableHeaders, filterFn);

  /* agregar archivo desde el inputFileButton a la tabla (aun no lo sube) */
  function add(file) {
    file.id = file.nombre
    records.push(file)
    console.log(records)
    setRecords(records)
  }

  React.useEffect(() => {
    getArchivos()
      .then(files => {
        setRecords(files);
      });
  }, [])

  const onDelete = (obj) => {
    setRecords(records.filter(item => item.nombre != obj.nombre))
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
          // console.log("input file button: ", files)
          if (files) {
            for (var i = 0; i < files.length; i++) {
              var reader = new FileReader();
              let newFile = { 
                nombre: files[i].name, base64: null 
              }
              reader.onload = function (e) {
                /* data from file loaded (base64) */
                newFile.base64 = e.target.result
                /* add new file to "buffer" table */
                add(newFile)
              };
              /* read (load) data as base64 + mimetype prefix */
              reader.readAsDataURL(files[i]);
            }
          }
        }} />
        {/* <Controls.Button
          text="Descargar Archivos"
          size="medium"
          onClick={() => { download() }}
        /> */}
        {/* <Controls.Button
          text="Enviar Archivos"
          size="medium"
          onClick={() => { upload(records) }}
        /> */}
        <Controls.Button
          text="Añadir"
          size="medium"
          onClick={() => { add() }}
        />
        <Controls.Button
          text="refresh"
          size="medium"
          onClick={() => { setRecords(records); console.log(records) }}
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
                      <PictureAsPdfIcon />
                    </IconButton>

                    {item.nombre}
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton aria-label="delete">
                      <DeleteIcon
                        color="warning"
                        onClick={() => {
                          onDelete(item)
                        }} />
                    </IconButton>
                    <IconButton aria-label="descargar">
                      <DownloadIcon
                        color="warning"
                        onClick={() => {
                          onDownload(item)
                        }} />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
      </BoxTbl>
    </>
  )

}