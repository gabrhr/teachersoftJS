import React, {useState} from 'react'
import { Controls } from '../../../components/controls/Controls'
import Popup from '../../../components/util/Popup'
import AgregarEditarSeccion from './AgregarEditarSeccion'

export default function GestionSeccion() {
    const [openPopup, setOpenPopup] = useState(false)
    return (
        <>
            <Controls.Button 
              text="Add New"
              variant="outlined"
              sx={{justifySelf:"flex-end"}}
              onClick = {() => setOpenPopup(true)}
            />
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Nueva Sección"
            >
               <AgregarEditarSeccion />
              {/*  <AgregarEditarSeccion/> */}
            </Popup>  
        </>
    )
}
