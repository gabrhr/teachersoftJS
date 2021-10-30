/*Aquí colocar funciones auxiliares o variables estáticas que podrían se reutilizados*/

export function formatHorarioCursos(matrix) {

    let horarioList = [];
    for (let i = 0; i < matrix.length; i++){
        horarioList.push(formatHorario(matrix[i]))
    }
    return horarioList;
}



export function formatHorario(id, claveCurso, nombreCurso, cargaHoraria,
    horario, tipoSesion, horaSesion) {
   return {
       id, claveCurso, nombreCurso, cargaHoraria,
       horario, tipoSesion, horaSesion
   }
 }
