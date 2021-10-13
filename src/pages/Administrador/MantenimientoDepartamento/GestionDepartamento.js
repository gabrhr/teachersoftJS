import React, {useState} from 'react'
import { Controls } from '../../../components/controls/Controls'
import Popup from '../../../components/util/Popup'
import GestionUsuariosForm from '../GestionUsuarios/GestionUsuariosForm'
import AgregarEditarDepartamento from './AgregarEditarDepartamento'


export default function GestionDepartamento() {
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
                title="Nuevo Departamentos"
            >
               <AgregarEditarDepartamento />
              {/*  <GestionUsuariosForm/> */}
            </Popup>  
        </>
    )
}
