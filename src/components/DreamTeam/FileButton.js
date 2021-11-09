import React from 'react'
import { Alert, Typography } from '@mui/material'
import IconButton from '../controls/IconButton'
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import { makeStyles } from "@mui/styles";
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

export default function FileButton(props) {
    /* "strasdkjfls? syntax from JS" */
    let {text, type, onClick, sx, ...other} = props
    if (type === "donwload") {
        other.icon = (<InsertDriveFileOutlinedIcon/>)
        other.color= "file"
    }
    else if (type === "upload") { //Para los usuarios que envian solicitud
        other.icon = (<InsertDriveFileOutlinedIcon/>)
        other.color= "file"
    }
    else if (type === "addFile") { //Para los usuarios que envian solicitud      
        text="Adjuntar Archivos"
        other.color= "adjuntar"
    }

    function obtenerIcono(type){
        return(
            type==="upload"?<FileUploadOutlinedIcon/>:
                type==="download"? <FileDownloadOutlinedIcon/>:
                <AttachFileOutlinedIcon/>
        )
    }
    
    /* opciones super sercretas */
     return (
        <Alert
            severity={type}
            action={
                <IconButton
                    aria-label="close"
                    size="small"
                    onClick={onClick}
                >
                   {obtenerIcono(type)} 
                </IconButton>
            }
            sx={{
                pt: 0,
                pb: 0,
                minWidth: "140px",
                maxWidth: "250px",
                height: "40px",
                borderRadius: "20px",
                transform: "scale(.90)"
            }}
            {...other}
      >
        {text}
      </Alert>
        
    )
}

