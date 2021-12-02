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

 export function populateYearList(){
    const thisYear = new Date().getFullYear();
    const yearList = [];
    
    for (let i = 50; i >= 0; i--){
        yearList.push({id: (thisYear - i) , nombre: (thisYear - i).toString()});
    }
    return yearList;
}

export function populateCountryList(){
    
    const countryList = [];
    countryList.push({id: 'Perú' , nombre: 'Perú'});
    countryList.push({id: 'Afganistán' , nombre: 'Afganistán'});
    countryList.push({id: 'Albania' , nombre: 'Albania'});
    countryList.push({id: 'Alemania' , nombre: 'Alemania'});
    countryList.push({id: 'Andorra' , nombre: 'Andorra'});
    countryList.push({id: 'Angola' , nombre: 'Angola'});
    countryList.push({id: 'Antigua y Barbuda' , nombre: 'Antigua y Barbuda'});
    countryList.push({id: 'Arabia Saudita' , nombre: 'Arabia Saudita'});
    countryList.push({id: 'Argelia' , nombre: 'Argelia'});
    countryList.push({id: 'Argentina' , nombre: 'Argentina'});
    countryList.push({id: 'Australia' , nombre: 'Australia'});
    countryList.push({id: 'Austria' , nombre: 'Austria'});
    countryList.push({id: 'Azerbaiyán' , nombre: 'Azerbaiyán'});
    countryList.push({id: 'Bahamas' , nombre: 'Bahamas'});
    countryList.push({id: 'Bangladés' , nombre: 'Bangladés'});
    countryList.push({id: 'Barbados' , nombre: 'Barbados'});
    countryList.push({id: 'Baréin' , nombre: 'Baréin'});
    countryList.push({id: 'Bélgica' , nombre: 'Bélgica'});
    countryList.push({id: 'Belice' , nombre: 'Belice'});
    countryList.push({id: 'Benín' , nombre: 'Benín'});
    countryList.push({id: 'Bielorrusia' , nombre: 'Bielorrusia'});
    
    
  
    return countryList;
}