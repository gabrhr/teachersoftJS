import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, useTheme } from '@mui/material'
import { Controls } from '../../components/controls/Controls'

export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props
    
    const theme = useTheme();
    const styles = {
        dialog: {
            padding: theme.spacing(2),
            top: theme.spacing(0)
        },
        // dialogContent: {
        //     textAlign: 'center'
        // },
        // dialogAction: {
        //     justifyContent: 'center'
        // },
        // dialogTitle: {
        //     padding: theme.spacing(0)
        // },
        titleIcon: {
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.secondary.main,
            '&:hover': {
                backgroundColor: theme.palette.secondary.light,
                cursor: 'default'
            },
            '& .MuiSvgIcon-root': {
                fontSize: '8rem'
            }
        }
    }

    /* 
        <div style={styles.div}
    */

    return (
        // <Dialog open={confirmDialog.isOpen} style={styles.dialog}>
        <Dialog open={confirmDialog.isOpen} sx={styles.dialog}>
            <DialogTitle>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
            </DialogTitle>
            <DialogContent >
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>

            <DialogActions>
                <Controls.Button 
                    text="No"
                    variant="outlined"
                    onClick={() => {
                        setConfirmDialog({ ...confirmDialog, isOpen: false })
                    }}
                />
                <Controls.Button 
                    text="Yes"
                    color="primary"
                    onClick={() => {
                        setConfirmDialog({ ...confirmDialog, isOpen: false })
                        confirmDialog.onConfirm()
                    }}
                />
            </DialogActions>
        </Dialog>
    )
}
