/* Author: Mitsuo
 */
import React from 'react'
import { Controls } from '../../components/controls/Controls'
import ConfirmDialog from '../../components/util/ConfirmDialog';

/* try moving it to separate function.  ConfirmDialog alone is quite big. */

export default function UtilPage() {
    /* ConfirmDialog */
    const [confirmDialog, setConfirmDialog] = React.useState({ 
        isOpen: false, 
        title: '', 
        subTitle: '',
        onConfirm: () => onConfirm()
    })

    const onConfirm = () => {
        setConfirmDialog({
            ...confirmDialog,       // BUG: algo raro pasa aqui
            subTitle: 'confirmado :O'
        })
    }

    /* MessageBoxOK (Manuel) */

    /* TODO */

    /* MessageBoxYesNo (Manuel) */

    /* TODO */

    /* Notification */

    /* TODO */

    /* Popup */

    /* TODO */

    return (
        <div>
            <Controls.Button
                text="ConfirmDialog"
                onClick={() => {
                    setConfirmDialog({
                        ...confirmDialog,
                        isOpen: true,
                        title: 'Dialogo de Confirmacion',
                        subTitle: 'Desea confirmar?',
                    })
                }}
            />
            <ConfirmDialog 
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    )
}
