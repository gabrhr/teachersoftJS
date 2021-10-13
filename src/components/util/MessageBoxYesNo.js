import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'
import { Controls } from '../controls/Controls';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles (theme =>( {

  dialog: {
    position: 'absolute',
    padding: theme.spacing(2),
    top : theme.spacing(5),
    width : '500px'
  },
  dialogContent:{
    textAlign: 'center'

  },
  dialogAction:{
    justifyContent: 'left'
  },
  dialogButton:{
    padding: theme.spacing(10),
    width : '100px'
  }

}))

export default function MessageBoxYesNo(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes =useStyles();
  return (
    // Outer invisible box
    <Dialog open={confirmDialog.isOpen} classes = {{paper: classes.dialog}}
    >
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" style={{flexGrow:1}} >
            {confirmDialog.title}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent className={classes.dialogContent} dividers>

          <Typography variant="subtitle-2" >
            {confirmDialog.message}
          </Typography>
      </DialogContent>
      <div style={{ display: 'flex' }}>
        <Typography variant="h3" style={{flexGrow:1}}>
        </Typography>
        <Controls.Button
            className= {classes.dialogButton} 
            variant = "outlined"
            color="primary"
            text= "Cancelar"
            onClick={()=> setConfirmDialog({...confirmDialog, isOpen:false})}

          />
        <Controls.Button
            className= {classes.dialogButton} 
            color="primary"
            text= "Aceptar"
            onClick={confirmDialog.onConfirm}

          />
      </div>


    </Dialog>
  )
  }
  