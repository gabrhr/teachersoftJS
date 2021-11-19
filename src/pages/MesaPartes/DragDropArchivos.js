/* Author: Sergio
 * 
 */
import React from "react";
import fileService from '../../services/fileService'
import { Controls } from '../../components/controls/Controls'
import url from '../../config'
import { IconButton, InputAdornment, Toolbar } from '@mui/material';
import { Grid, Box } from '@material-ui/core'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

function getBase64(file) {
    return new Promise(function (resolve) {
        var reader = new FileReader();
        reader.onloadend = function () {
            resolve(reader.result)
        }
        reader.readAsDataURL(file);
    })
}

async function setArchivoSinID(archivo, values, setValues){
    var arr = archivo.name.split(".")
    var fileObject = {
        nombre: arr[0],
        extension: arr[1],
        contenido_b64: await getBase64(archivo)
    }
    values.archivos.push(fileObject);
    setValues(values);
}

async function unsetArchivoSinID(archivo, values, setValues){
    var index = (values.archivos).map(function(e) { return e.nombre; }).indexOf((archivo.name.split("."))[0]);
    console.log(index);
    values.archivos.splice(index, 1);
    setValues(values)
}

/* A fin de utilizar solo un boton en el modal principal se omite el Submit de react-dropzone-upload
    y se debe crear una funcion que haga set a cada archivo apenas se dropee o seleccione
    (handleChangeStatus)
    EN DESUSO*/
async function setArchivosSinID(files, values, setValues) {
    var arrNombre = [], arrExtension = [];
    for (var i = 0; i < files.length; i++) {
        var arrArchivo = files[i].file.name.split(".")
        arrNombre.push(arrArchivo[0]);
        arrExtension.push(arrArchivo[1]);
    }
    var arrBase64 = [];
    for (let i = 0; i < files.length; i++) {
        arrBase64.push(await getBase64(files[i].file));
    }
    var arrFileObjects = [];
    for (var j = 0; j < files.length; j++) {
        var data = {
            nombre: arrNombre[j],
            extension: arrExtension[j],
            // solicitud: { id: 1 },
            contenido_b64: arrBase64[j]
        }
        arrFileObjects.push(data);
    }
    setValues({...values, archivos: arrFileObjects})
    /* esto ahora se hace en DashboardSolis */
    // for (var k = 0; k < arrFileObjects.length; k++) {
    //     fileService.registerArchivo(arrFileObjects[k]);
    // }
}

export default function DragDropArchivos(props) {

    /* archivos es un useState que vienen de NuevaSolicitudForm,
     * mientras que files es una variable interna del componente Dropzone */
    const { values, setValues } = props

    /* "meta es como un file comprimido"  No quitar sino muere */
    const getUploadParams = ({ meta }) => {
        console.log(meta);
        return { url: 'https://httpbin.org/post' }
    }

    const handleChangeStatus = ({ meta, file }, status) => {
        /* Notificacion si extension o tamaño incorrecto */
        if(status=="done"){
            setArchivoSinID(file, values, setValues);
            console.log(values.archivos)
        }
        if(status=="removed"){
            unsetArchivoSinID(file, values, setValues);
            console.log(values.archivos)
        }
    }

    const handleSubmit = (files, allFiles) => {
        setArchivosSinID(files, values, setValues);
        allFiles.forEach(f => f.remove())
    }

    const getFilesFromEvent = e => {
        return new Promise(resolve => {
            getDroppedOrSelectedFiles(e).then(chosenFiles => {
                resolve(chosenFiles.map(f => f.fileObject))
            })
        })
    }

    /* button displayed after 1 file has been loaded */
    const InputChooseFile = ({ accept, onFiles, files, getFilesFromEvent }) => {
        const text = files.length > 0 ? 'Agregar más archivos' : 'Seleccionar'

        const buttonStyle = {
            backgroundColor: '#67b0ff',
            color: '#fff',
            cursor: 'pointer',
            padding: 15,
            borderRadius: "20px",
            marginTop:"20px"
        }

        return (
            <>
                {
                    files.length > 0 ?
                    <div marginBottom={"10px"}> </div>:
                    <div align="center">
                        <CloudUploadOutlinedIcon sx={{ fontSize: 60, color:"#BBBBBB", mt:"50px"}}/>
                        <p> Arrastre y suelte los archivos aquí <br/> o</p> 
                    </div>
                }    
                <label style={buttonStyle}>
                    {text}
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        accept={accept}
                        multiple
                        onChange={e => {
                            getFilesFromEvent(e).then(chosenFiles => {
                                onFiles(chosenFiles)
                            })
                        }}
                    />
                </label>
            </>
        )
    }

    const dropzoneStyle = {
        dropzone:{

            width  : "100%",
            height : "350px",
            borderStyle: "dotted",
            borderWidth: "thick",
            overflowX: "hidden",
            marginBottom:"20px",
            margintop:"10px"
        },
        preview:{

        }
    };

    return (
        <Dropzone
            styles={dropzoneStyle}
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            // submitButtonContent={"Subir archivos"}
            // onSubmit={handleSubmit}
            InputComponent={InputChooseFile}
            getFilesFromEvent={getFilesFromEvent}
            classNames
        />
    );
};