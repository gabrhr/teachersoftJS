import React, { useState } from 'react'
import { Avatar, Grid, InputAdornment, Box, TableBody, TableCell, TableRow, Typography, Divider } from '@mui/material'
import { Controls } from '../../components/controls/Controls'
import useTable from '../../components/useTable'
import Notification from '../../components/util/Notification'


/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import { maxWidth } from '@mui/system';
import Popup from '../../components/util/Popup';
import ContentHeader from '../../components/AppMain/ContentHeader';
import NuevaSolicitudForm from './NuevaSolicitudForm';
import { DT } from '../../components/DreamTeam/DT';
import { Form, useForm } from '../../components/useForm';
import * as MesaPartesService from '../../services/mesaPartesService'
//Iconos Mesa de Partes
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Link, Redirect } from 'react-router-dom';


//Componente de solo la tabla con cada uno de las solicitudes
export default function DashboardSoliOrganism(props) {
    const {BoxTbl,TblContainer, TableBody, 
        recordsAfterPagingAndSorting, TblPagination} = props

    const [row, setRow] = useState(false)
    function getRow({ ...props }) {
        setRow(props)
    }
    return (
        <div>
            <BoxTbl>
                <TblContainer>
                    {/* <TblHead />  */}
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                <Item item={item} getRow={getRow}/>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl>
        </div>
    )
}
function Item(props) {
    const { item, getRow } = props

    return (
        <>
            <TableRow key={item.id}>
                <TableCell sx={{ maxWidth: "400px" }}>
                    <div >
                        Fecha de Creación: {item.fecha}
                    </div>
                    <Typography >
                        {item.asunto}
                    </Typography>
                    <div >
                        Autor: {item.solicitador.fullName}
                    </div>

                </TableCell>
                <TableCell sx={{ maxWidth: "200px" }}>
                    <Typography paragraph>
                        Descripcion: {item.descripcion}
                    </Typography>
                </TableCell>
                <TableCell  align="center"  >
                    <DT.Etiqueta
                        type={item.estado == 0 ? "enviado" :
                            item.estado == 1 ? "enRevision" :
                            item.estado == 2 ? "delegado" : "atendido"
                        }
                    />
                </TableCell>
                <TableCell>
                    <Link to ={{
                        pathname:'/doc/solicitudDetalle',
                        state:{
                            solicitud: item
                        }
                    }}  style={{ textDecoration: 'none' }}>
                    <Controls.Button
                        text="Detalle"
                        type="submit"
                        onClick={() => { getRow(item) }}
                    />
                    </Link>
                </TableCell>
            </TableRow>
        </>
    );
}
