import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'
import { Controls } from '../controls/Controls';
import { DT } from '../DreamTeam/DT'
import CloseIcon from '@mui/icons-material/Close';

export default function Popup(props) {

  const { title, children, openPopup, setOpenPopup, handleClose, size } = props;

  return (
    // Outer invisible box
    <Dialog open={openPopup} onClose={handleClose}
      maxWidth= {size ? `${size}` : "lg"}
      fullWidth
      sx={{
        minHeight: "400px",
        '& .MuiDialog-paper': {
          p: 2,
          // position: 'absolute',
          top: 5
        }
      }}
    >
      <DialogTitle sx={{paddingRight: 0}}>
        <div style={{ display: 'flex', alignItems: "flexStart" }}>
          <DT.Title size="big" text={title} sx={{flexGrow: 1}} />
          {/* <Typography variant="h3" style={{flexGrow:1}}>
            {title}
          </Typography> */}
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
