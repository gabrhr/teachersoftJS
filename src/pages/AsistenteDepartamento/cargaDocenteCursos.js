import ContentHeader from "../../components/AppMain/ContentHeader"
import { Controls } from "../../components/controls/Controls"
import { useForm, Form } from "../../components/useForm" 

const getEstadoCollection = [
    { id: '1', title: 'Todas las secciones' },
    { id: '2', title: 'Informática' },
    { id: '3', title: 'Industrial' },
  ]

export default function cargaDocenteCursos(){
    const {
        values,
        // setValues,
        handleInputChange
      // eslint-disable-next-line react-hooks/rules-of-hooks
      } = useForm(getEstadoCollection[0]);

    return(
        <Form>
            <ContentHeader text="Carga Docente" cbo={false}/>
            <Controls.Select
              name="id"
              label="Secciones"
              value={values.id}
              onChange={handleInputChange}
              options={getEstadoCollection}
              type="contained"
            // displayNoneOpt
            />
        </Form>
    )
}