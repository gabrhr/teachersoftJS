import React, { useState,useContext } from 'react'
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
import { UserContext } from '../../constants/UserContext'


//Componente de solo la tabla con cada una de las solicitudes
export default function DashboardSoliOrganism(props) {
    const {BoxTbl,TblContainer, TableBody, 
        recordsAfterPagingAndSorting, TblPagination} = props
    const [row, setRow] = useState(false)
    const {user, rol} = useContext(UserContext);
    function getRow({ ...props }) {
        setRow(props)
    }

    function formatoFecha(fecha){
        if(fecha!=null){
            return (fecha.slice(8,10) +'/'
                    +fecha.slice(5,7) +'/'
                    +fecha.slice(0,4) + "\xa0\xa0\xa0"
                    +fecha.slice(11,19)
            )
        }
    }
    return (
        //#region TABLA DE CADA SOLICITUD
        <div>
            <BoxTbl>
                <TblContainer>
                    {/* <TblHead />  */}
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                <TableRow key={item.id}>
                                    <TableCell sx={{maxWidth:"260px"}}  >
                                        <Typography display="inline">
                                            Fecha de Enviado: {'\u00A0'}
                                        </Typography>
                                        <Typography display="inline" sx={{color:"primary.light"}}>
                                            {formatoFecha(item.tracking.fecha_enviado)}
                                        </Typography>
                                        <div/>
                                        <Typography fontWeight='bold' fontSize={18}>
                                            {item.asunto}
                                        </Typography>
                                        <Typography display="inline">
                                            Autor: {'\u00A0'}
                                        </Typography>
                                        <Typography display="inline" sx={{color:"primary.light"}}>
                                            {item.solicitador.fullName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{maxWidth:"250px"}} >
                                        <Typography fontWeight='bold'>
                                            {item.temaTramite} 
                                        </Typography>
                                        <div/>
                                        <Typography display="inline">
                                            Descripción: {'\u00A0'}
                                        </Typography>
                                        <Typography paragraph display="inline" sx={{color:"primary.light"}}>
                                            {item.descripcion}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center" sx={{maxWidth:"200px"}}>

                                        <DT.Etiqueta
                                            type={item.estado == 0 ? "enviado" :
                                                item.estado == 1 ? "enRevision" :
                                                item.estado == 2 ? "delegado" : "atendido"
                                            }
                                            sx={{marginLeft:"70px", marginRight:"10px", marginBottom:"4px"}}
                                        />
                                        <div/>
                                        { item.estado==2? 
                                            <Typography paragraph display="inline" sx={{color:"primary.light", mt:2, ml:"10px"}}>
                                               {item.delegado.fullName}
                                            </Typography> : <> </>

                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Link to ={{
                                            pathname:getTipoDetalle(item,user,rol),
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
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl>
        </div>
        //#endregion
    )
}

function getTipoDetalle(item,user,rol){
    if(rol==6){
        return "/secretaria/mesaPartes/solicitudDetalle"
    } else if(item.solicitadorID== user.id){ //MisSolicitudes
        if(rol==1) return "/doc/solicitudDetalle"
    } else if (item.delegadoID== user.id){ //Delegados
        if(rol==1) return "/doc/misDelegados/solicitudDetalle"
    }
    return "/doc/solicitudDetalle"
}
