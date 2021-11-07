/* Author: Mitsuo
 */
import { Paper, Typography } from '@mui/material';
import React from 'react'
import { Controls } from '../../components/controls/Controls'
import ConfirmDialog from '../../components/util/ConfirmDialog';
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
        window.alert("ConfirmDialog: confirmado")
    }

    /* abrir modal */
    function onClickButtonConfirmDialog() {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            title: 'Dialogo de Confirmacion',
            subTitle: 'Desea confirmar?',
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

export default function UtilPage() {
    return (
        <>
            <Typography children="ConfirmDialog" />
            <EjemploConfirmDialog />

            <Typography pt={1} children="Popup" />
            <EjemploPopup />

            <Typography pt={1} children="Notificacion" />

            <Typography pt={1} children="MessageBoxOK" />

            <Typography pt={1} children="MessageBoxYesNo" />

        </>
    )
}
