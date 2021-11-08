/* Author: Mitsuo
 */
import { Paper, Typography } from '@mui/material';
import React from 'react'
import { Controls } from '../../components/controls/Controls'
import ConfirmDialog from '../../components/util/ConfirmDialog';
import Notification from '../../components/util/Notification';
import Popup from '../../components/util/Popup';

function EjemploConfirmDialog() {
    const [confirmDialog, setConfirmDialog] = React.useState({ 
        isOpen: false, 
        title: '', 
        subTitle: '',
        onConfirm: () => onConfirm()
    })

    /* Executes after Confirm button is pressed,  just before the popup closes */
    const onConfirm = () => {
        window.alert("ConfirmDialog: confirmado.")
    }

    /* abrir modal */
    function onClickButtonConfirmDialog() {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            title: '(ConfirmDialog title)',
            subTitle: '(ConfirmDialog subtitle)',
        })
    }

    return (
        <div>
            <Controls.Button
                text="Open"
                onClick={onClickButtonConfirmDialog}
            />
            {/* modals  */}
            <ConfirmDialog 
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    )
}

function EjemploPopup() {
    const [openPopup, setOpenPopup] = React.useState(false)

    /* open modal */
    function handleOpenPopup() {
        setOpenPopup(true)
    }

    /* Executed on exit */
    function onClose() {
        window.alert("Popup:  onClose()")
    }

    return (
        <>
            <Controls.Button
                text="Open"
                onClick={handleOpenPopup}
            />
            {/* modals  */}
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Popup Title"
                onClose={onClose}
            >
                <div style={{width: "800px", height: "400px"}}>
                    Heeeey,  I'm inside the paper inside the popup.
                </div>
            </Popup>
        </>
    )
}

function EjemploNotificacion() {
    /* notification snackbar */
    const [notify, setNotify] = React.useState({
        isOpen: false, 
        message: '', 
        type: ''
    })

    function handleShowNotification(e) {
        let type = ""

        if (e.target.id === 'notification-error-button')
            type = "error"
        else if (e.target.id === 'notification-info-button')
            type = "info"
        else if (e.target.id === 'notification-success-button')
            type = "success"
        else if (e.target.id === 'notification-warning-button')
            type = "warning"

        setNotify({
            isOpen: true,
            message: '(auto dissapears after 8 seconds)',
            type: type,
        })
        // console.log(e)
    }

    return (
        <>
            <Controls.Button
                id="notification-error-button"
                text="error"
                onClick={handleShowNotification}
            />
            <Controls.Button
                id="notification-info-button"
                text="info"
                onClick={handleShowNotification}
            />
            <Controls.Button
                id="notification-success-button"
                text="success"
                onClick={handleShowNotification}
            />
            <Controls.Button
                id="notification-warning-button"
                text="warning"
                onClick={handleShowNotification}
            />
            {/* "modals" */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}

export default function UtilPage() {
    return (
        <>
            <Typography children="ConfirmDialog" />
            <EjemploConfirmDialog />

            <Typography pt={1} children="Popup" />
            <EjemploPopup />

            <Typography pt={1} children="Notificacion" />
            <EjemploNotificacion />

            <Typography pt={1} children="MessageBoxOK" />

            <Typography pt={1} children="MessageBoxYesNo" />

        </>
    )
}
