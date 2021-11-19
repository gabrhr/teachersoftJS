import React from 'react'
import { Alert, Typography } from '@mui/material'
import IconButton from '../controls/IconButton'
import AddIcon from '@mui/icons-material/Add';
import { Box, typography } from '@mui/system';
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
    if (type === "addFile") { //Para los usuarios que envian solicitud      
        // text="Adjuntar Archivos"
        other.color= "adjuntar"
    }
    
    /* opciones super sercretas */
     return (
        <Alert
            variant="filled"
            severity={type}
            action={
                <IconButton
                    aria-label="close"
                    size="small"
                    onClick={onClick}
                    sx={{
                        mr:.2
                    }}
                >
                    <FileDownloadOutlinedIcon sx={{color:"#fff"}}/>  
                </IconButton>
            }
            sx={{
                pt: 0,
                pb: 0,
                minWidth: "140px",
                maxWidth: "250px",
                height: "40px",
                borderRadius: "20px",
                marginRight: "10px",
                marginY: "5px",
            }}
            {...other}
      >
        <Typography fontWeight="540"  sx={{color:"#fff"}}>
            {text}
        </Typography>
      </Alert>
        
    )
}

