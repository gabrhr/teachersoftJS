/* Author: Gabriela
 * 
 * Listado de las solicitudes + boton para abrir detalle
 */
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
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es');

//Componente de solo la tabla con cada una de las solicitudes
export default function DashboardSoliOrganism(props) {
    const {BoxTbl,TblContainer, 
        recordsAfterPagingAndSorting, TblPagination, delegado} = props
    const [row, setRow] = useState(false)
    const {user, rol} = useContext(UserContext);
    function getRow({ ...props }) {
        setRow(props)
    }

    function formatoFecha(fecha){
        if(fecha!=null){
            return (moment.utc(fecha).format('DD MMM YYYY [-] h:mm a'))
        }
    }

    function verificarExterno(rolName){
        if(rolName==="Usuario Externo"){
            return "- Usuario Externo"
        }
        return " "
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
                                    <TableCell sx={{maxWidth:"280px"}}  >
                                        <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                                            Fecha: {'\u00A0'}
                                        </Typography>
                                        <Typography display="inline" sx={{color:"primary.light"}}>
                                            {formatoFecha(item.tracking.fecha_enviado)}
                                        </Typography>
                                        <div/>
                                        <Typography fontWeight='bold' fontSize={18}>
                                            {item.asunto}
                                        </Typography>
                                        <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                                            Autor: {'\u00A0'} 
                                        </Typography>
                                        <Typography display="inline" sx={{color:"primary.light"}}>
                                            {item.solicitador.fullName} 
                                        </Typography>
                                        <Typography display="inline" fontWeight="530"  sx={{color:"primary.light"}}>
                                            {verificarExterno(item.solicitador.rolName)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{maxWidth:"200px"}} >
                                        <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                                            Tema de trámite: {'\u00A0'}
                                        </Typography>
                                        <Typography display="inline" sx={{color:"primary.light"}}>
                                            {item.temaTramite} 
                                        </Typography >
                                    </TableCell>
                                    <TableCell align="center" sx={{maxWidth:"250px"}}>

                                        <DT.Etiqueta
                                            type={item.estado == 0 ? "enviado" :
                                                item.estado == 1 ? "enRevision" :
                                                item.estado == 2 ? "delegado" : "atendido"
                                            }
                                            sx={{marginLeft:"20%", marginRight:"10px", marginBottom:"4px"}}
                                        />
                                        <div/>
                                        { item.estado==2 && !delegado && rol!=6? 
                                            <Typography paragraph display="inline" sx={{color:"primary.light", mt:2, ml:"10px"}}>
                                               {item.delegado.fullName}
                                            </Typography> : <> </>

                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Link to ={{
                                            pathname:getTipoDetalle(item,user,rol),
                                            state:{
                                                solicitudinit: item
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
    } else if (item.delegadoID== user.persona.id){ //Delegados
        /* ejecutar esta primero por si se la delegan a si mismo */
        if(rol==1) return "/doc/misDelegados/solicitudDetalle"
    } else if(item.solicitadorID== user.persona.id){ //MisSolicitudes
        if(rol==1) return "/doc/solicitudDetalle"
        else if(rol==7) return "/invitado/mesaPartes/solicitudDetalle" 
    }
    return "/doc/solicitudDetalle"
}
