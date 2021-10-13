import React from 'react'
import { Alert, Snackbar } from '@mui/material';

export default function Notification(props) {

    const { notify, setNotify } = props;

    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={3000} // 3s
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            sx={{
                top: 20
            }}
        >
            <Alert
                severity={notify.type}      // error, info, success, warning
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}
