import React from 'react'
import { Grid, Stack, Typography } from '@mui/material';
import { DT } from '../../components/DreamTeam/DT'
import { Controls } from '../../components/controls/Controls'
import { useForm, Form } from '../../components/useForm';
import SearchIcon from '@mui/icons-material/Search';

const initialFieldValues = {
    searchText: ''
}

export default function HorarioCursos() {
    const {
        values,
        // setValues,
        handleInputChange
    } = useForm(initialFieldValues);

    return (
        <Form>
            <Typography variant="h4"
                color="primary"
            >
                Horario de Cursos
            </Typography>
            <Grid container>
                <Grid item xs={8}>
                    <Stack direction="row" alignContent="left" spacing={0}>
                        <Controls.Input
                            name="searchText"
                            label="codigo o nombre del curso"
                            onChange={handleInputChange}
                            type="search"
                            size="small"
                            sx = {{
                                maxWidth: .7
                            }}
                        />
                        <Controls.Button  
                            text={<SearchIcon/>}
                            size="small"
                            sx = {{
                                // display: "inline",
                                maxWidth: .05
                            }}
                        />
                    </Stack>
                </Grid>
                {/* FIX:  left align */}
                <Grid item xs={4} alignContent="right">
                    {/* FIX:  DT IconButton */}
                    <Controls.IconButton 
                        aria-label="add"
                        text="Agregar Curso-Horario"
                    />
                </Grid>
            </Grid>
        </Form>
    )
}
