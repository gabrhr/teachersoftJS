import * as React from 'react';
 
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
 
import CloseIcon from '@mui/icons-material/Close';


export default function ValidationBox(props) {

    const { open, setOpen, severity, label, color, size, text  } = props;
        
    
    return (
        <>
        <Collapse in={open}>
          <Alert severity={severity ? severity : "error"}
            action={
              <IconButton
                aria-label={label ? label : "close"}
                color={color ? color : "inherit"}
                size={size ? size : "small"}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {text ? text : "Error en la introducción de datos."}
          </Alert>
        </Collapse>
      </>
    );
  }