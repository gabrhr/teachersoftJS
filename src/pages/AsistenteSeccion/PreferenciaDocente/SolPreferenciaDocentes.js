import { useState } from "react"
import ContentHeader from "../../../components/AppMain/ContentHeader"
import AccordionPreferenciaProfesor from './AccordionPreferenciaProfesor'
import { Controls } from "../../../components/controls/Controls"
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material'

export default function SolPreferenciaDocentes(){

    const [profesores, setProfesores] = useState([
        {
            foto_URL: '',
            nombres: 'holo',
            apellidos: 'k',
            codigo_pucp: '1',
            seccion: {
                nombre: 'Ingeniería Informática'
            },
            tipo_docente: 1,
            preferencia: [
                {
                    clave: '22',
                    nombre_curso: 'MATES'
                }, 
                {
                    clave: '222',
                    nombre_curso: 'MATES 5'
                }
            ]
        },
        {
            foto_URL: '',
            nombres: 'asdasdas',
            apellidos: 'kd',
            codigo_pucp: '13',
            seccion: {
                nombre: 'Ingeniería Informática'
            },
            tipo_docente: 2,
            preferencia: [
                {
                    clave: '22',
                    nombre_curso: 'MATES'
                }, 
                {
                    clave: '222',
                    nombre_curso: 'MATES 5'
                },
                {
                    clave: '22342',
                    nombre_curso: 'TUTORÍA'
                }
            ]
        }
    ])

    const [profesoresMostrar, setProfesoresMostrar] = useState(profesores)


    const handleSearch = e => {
        const nuevosProfesores = profesores.filter(x => x.nombres.toLowerCase().includes(e.target.value.toLowerCase()))
        setProfesoresMostrar(nuevosProfesores)
    }
       

    return(
        <>
            <ContentHeader
            text="Solicitud de preferencias de docentes"
            cbo={true}
            />
            <Controls.Input
            label="Buscar Docente por Nombre"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{ width: .3, paddingBottom: '1.6%'}}
            onChange={handleSearch}
            type="search"
          />
            <AccordionPreferenciaProfesor profesores = {profesoresMostrar}/>
        </>
    )
}