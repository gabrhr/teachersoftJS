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
    return (
        <div>
            <BoxTbl>
                <TblContainer>
                    {/* <TblHead />  */}
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                <TableRow key={item.id}>
                                    <TableCell >
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
                                    <TableCell sx={{maxWidth:"300px"}} >
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
    )
}

function getTipoDetalle(item,user,rol){
    if(rol==6){
        return "/secretaria/mesaPartes/solicitudDetalle"
    } else if(item.solicitadorID== user.id){
        return "/doc/solicitudDetalle"
    } else if (item.delegadoID== user.id){
        return "/jd/mesaPartes/solicitudDetalle"
    }
    return "/doc/solicitudDetalle"
}
