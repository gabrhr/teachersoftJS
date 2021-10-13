import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'
import { Controls } from '../controls/Controls';
import CloseIcon from '@mui/icons-material/Close';

export default function Popup(props) {

  const { title, children, openPopup, setOpenPopup } = props;

  return (
    // Outer invisible box
    <Dialog open={openPopup} maxWidth="lg"
      sx={{
        '& .MuiDialog-paper': {
          p: 2,
          position: 'absolute',
          top: 5
        }
      }}
    >
      <DialogTitle sx={{paddingRight: 0}}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h3" style={{flexGrow:1}}>
            {title}
          </Typography>
          <Controls.ActionButton
            color="secondary"
            onClick={() => setOpenPopup(false)}
          >
            <CloseIcon/>
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  )
}
