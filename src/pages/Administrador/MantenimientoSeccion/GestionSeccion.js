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
<<<<<<< Updated upstream
=======
            <Paper variant="outlined" sx={PaperStyle}>
                <Typography variant="h4" style={SubtitulosTable}> Secciones</Typography>
                <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
                {/* <Toolbar> */}
                <Controls.Input
                    label="Buscar Secciones por Nombre"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                    }}
                    sx={{ width: .75 }}
                    onChange={handleSearch}
                    type="search"
                />
                <Controls.AddButton 
                  variant="iconoTexto"
                  title = "Nueva Sección"
                  onClick = {() => setOpenPopup(true)}
                />
                {/* </Toolbar> */}
                </div>
                <BoxTbl>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item => (
                        <TableRow key={item.id}>
                            <TableCell
                            align="right"
                            >
                            {item.id}
                            </TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{item.fechaFundacion}</TableCell>
                            <TableCell>{item.fechaModificacion}</TableCell>
                            <TableCell>{item.nombreDepartamento}</TableCell>
                        </TableRow>
                        ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl>
            </Paper>
>>>>>>> Stashed changes
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
