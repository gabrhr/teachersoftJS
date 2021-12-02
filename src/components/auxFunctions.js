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
    countryList.push({id: 'Birmania' , nombre: 'Birmania'});
    countryList.push({id: 'Bolivia' , nombre: 'Bolivia'});
    countryList.push({id: 'Bosnia' , nombre: 'Bosnia'});
    countryList.push({id: 'Botsuana' , nombre: 'Botsuana'});
    countryList.push({id: 'Brasil' , nombre: 'Brasil'});
    countryList.push({id: 'Brunéi' , nombre: 'Brunéi'});
    countryList.push({id: 'Bulgaria' , nombre: 'Bulgaria'});
    countryList.push({id: 'Burkina Faso' , nombre: 'Burkina Faso'});
    countryList.push({id: 'Burundi' , nombre: 'Burundi'});
    countryList.push({id: 'Bután' , nombre: 'Bután'}); //.
    countryList.push({id: 'Cabo Verde' , nombre: 'Cabo Verde'}); //.
    countryList.push({id: 'Camboya' , nombre: 'Camboya'});
    countryList.push({id: 'Camerún' , nombre: 'Camerún'}); //.
    countryList.push({id: 'Canadá' , nombre: 'Canadá'}); //.
    countryList.push({id: 'Catar' , nombre: 'Catar'});
    countryList.push({id: 'Chad' , nombre: 'Chad'});
    countryList.push({id: 'Chile' , nombre: 'Chile'});
    countryList.push({id: 'China' , nombre: 'China'});
    countryList.push({id: 'Chipre' , nombre: 'Chipre'});
    countryList.push({id: 'Ciudad del Vaticano' , nombre: 'Ciudad del Vaticano'}); //.
    countryList.push({id: 'Colombia' , nombre: 'Colombia'});
    countryList.push({id: 'Comoras' , nombre: 'Comoras'});
    countryList.push({id: 'Corea del Norte' , nombre: 'Corea del Norte'}); //.
    countryList.push({id: 'Corea del Sur' , nombre: 'Corea del Sur'}); //.
    countryList.push({id: 'Costa de Marfil' , nombre: 'Costa de Marfil'}); //.
    countryList.push({id: 'Costa Rica' , nombre: 'Costa Rica'}); //.
    countryList.push({id: 'Croacia' , nombre: 'Croacia'});
    countryList.push({id: 'Cuba' , nombre: 'Cuba'});
    countryList.push({id: 'Dinamarca' , nombre: 'Dinamarca'});
    countryList.push({id: 'Dominica' , nombre: 'Dominica'});
    countryList.push({id: 'Ecuador' , nombre: 'Ecuador'});
    countryList.push({id: 'Egipto' , nombre: 'Egipto'});
    countryList.push({id: 'El Salvador' , nombre: 'El Salvador'}); //.
    countryList.push({id: 'Emiratos Árabes Unidos' , nombre: 'Emiratos Árabes Unidos'}); //.
    countryList.push({id: 'Eritrea' , nombre: 'Eritrea'});
    countryList.push({id: 'Eslovaquia' , nombre: 'Eslovaquia'});
    countryList.push({id: 'España' , nombre: 'España'}); //.
    countryList.push({id: 'Estados Unidos' , nombre: 'Estados Unidos'}); //.
    countryList.push({id: 'Estoniaa' , nombre: 'Estonia'});
    countryList.push({id: 'Etiopía' , nombre: 'Etiopía'}); //.
    countryList.push({id: 'Filipinas' , nombre: 'Filipinas'});
    countryList.push({id: 'Finlandia' , nombre: 'Finlandia'});
    countryList.push({id: 'Fiyi' , nombre: 'Fiyi'});
    countryList.push({id: 'Francia' , nombre: 'Francia'});
    countryList.push({id: 'Gabón' , nombre: 'Gabón'}); //.
    countryList.push({id: 'Gambia' , nombre: 'Gambia'});
    countryList.push({id: 'Georgia' , nombre: 'Georgia'});
    countryList.push({id: 'Ghana' , nombre: 'Ghana'});
    countryList.push({id: 'Granada' , nombre: 'Granada'});
    countryList.push({id: 'Grecia' , nombre: 'Grecia'});
    countryList.push({id: 'Guatemala' , nombre: 'Guatemala'});
    countryList.push({id: 'Guyana' , nombre: 'Guyana'});
    countryList.push({id: 'Guinea' , nombre: 'Guinea'});
    countryList.push({id: 'Guinea ecuatorial' , nombre: 'Guinea ecuatorial'}); //.
    countryList.push({id: 'Guinea-Bisáu' , nombre: 'Guinea-Bisáu'}); //.
    countryList.push({id: 'Haití' , nombre: 'Haití'}); //.
    countryList.push({id: 'Honduras' , nombre: 'Honduras'});
    countryList.push({id: 'Hungría' , nombre: 'Hungría'}); //.
    countryList.push({id: 'India' , nombre: 'India'});
    countryList.push({id: 'Indonesia' , nombre: 'Indonesia'});
    countryList.push({id: 'Irak' , nombre: 'Irak'});
    countryList.push({id: 'Irán' , nombre: 'Irán'}); //.
    countryList.push({id: 'Irlanda' , nombre: 'Irlanda'});
    countryList.push({id: 'Islandia' , nombre: 'Islandia'});
    countryList.push({id: 'Islas Marshall' , nombre: 'Islas Marshall'}); //.
    countryList.push({id: 'Islas Salomón' , nombre: 'Islas Salomón'}); //.
    countryList.push({id: 'Israel' , nombre: 'Israel'});
    countryList.push({id: 'Italia' , nombre: 'Italia'});
    countryList.push({id: 'Jamaica' , nombre: 'Jamaica'});
    countryList.push({id: 'Japón' , nombre: 'Japón'}); //.
    countryList.push({id: 'Jordania' , nombre: 'Jordania'});
    countryList.push({id: 'Kazajistán' , nombre: 'Kazajistán'}); //.
    countryList.push({id: 'Kenia' , nombre: 'Kenia'});
    countryList.push({id: 'Kirguistán' , nombre: 'Kirguistán'}); //.
    countryList.push({id: 'Kiribati' , nombre: 'Kiribati'});
    countryList.push({id: 'Kuwait' , nombre: 'Kuwait'});
    countryList.push({id: 'Laos' , nombre: 'Laos'});
    countryList.push({id: 'Lesoto' , nombre: 'Lesoto'});
    countryList.push({id: 'Letonia' , nombre: 'Letonia'});
    countryList.push({id: 'Líbano' , nombre: 'Líbano'}); //.
    countryList.push({id: 'Liberia' , nombre: 'Liberia'});
    countryList.push({id: 'Libia' , nombre: 'Libia'});
    countryList.push({id: 'Liechtenstein' , nombre: 'Liechtenstein'});
    countryList.push({id: 'Lituania' , nombre: 'Lituania'});
    countryList.push({id: 'Luxemburgo' , nombre: 'Luxemburgo'});
    countryList.push({id: 'Macedonia del Norte' , nombre: 'Macedonia del Norte'}); //.
    countryList.push({id: 'Madagascar' , nombre: 'Madagascar'});
    countryList.push({id: 'Malasia' , nombre: 'Malasia'});
    countryList.push({id: 'Malaui' , nombre: 'Malaui'});
    countryList.push({id: 'Maldivas' , nombre: 'Maldivas'});
    countryList.push({id: 'Malí' , nombre: 'Malí'}); //.
    countryList.push({id: 'Malta' , nombre: 'Malta'});
    countryList.push({id: 'Marruecos' , nombre: 'Marruecos'});
    countryList.push({id: 'Mauricio' , nombre: 'Mauricio'});
    countryList.push({id: 'Mauritania' , nombre: 'Mauritania'});
    countryList.push({id: 'México' , nombre: 'México'}); //.
    countryList.push({id: 'Micronesia' , nombre: 'Micronesia'});
    countryList.push({id: 'Moldavia' , nombre: 'Moldavia'});
    countryList.push({id: 'Mónaco' , nombre: 'Mónaco'}); //.
    countryList.push({id: 'Mongolia' , nombre: 'Mongolia'});
    countryList.push({id: 'Montenegro' , nombre: 'Montenegro'});
    countryList.push({id: 'Mozambique' , nombre: 'Mozambique'});
    countryList.push({id: 'Namibia' , nombre: 'Namibia'}); //.
    countryList.push({id: 'Nauru' , nombre: 'Nauru'});
    countryList.push({id: 'Nepal' , nombre: 'Nepal'});
    countryList.push({id: 'Nicaragua' , nombre: 'Nicaragua'});
    countryList.push({id: 'Níger' , nombre: 'Níger'}); //.
    countryList.push({id: 'Nigeria' , nombre: 'Nigeria'});
    countryList.push({id: 'Noruega' , nombre: 'Noruega'});
    countryList.push({id: 'Nueva Zelanda' , nombre: 'Nueva Zelanda'}); //.
    countryList.push({id: 'Omán' , nombre: 'Omán'}); //.
    countryList.push({id: 'Países Bajos' , nombre: 'Países Bajos'}); //.
    countryList.push({id: 'Pakistán' , nombre: 'Pakistán'}); //.
    countryList.push({id: 'Palaos' , nombre: 'Palaos'});
    countryList.push({id: 'Panamá' , nombre: 'Panamá'}); //.
    countryList.push({id: 'Papúa Nueva Guinea' , nombre: 'Papúa Nueva Guinea'}); //.
    countryList.push({id: 'Paraguay' , nombre: 'Paraguay'});
    countryList.push({id: 'Polonia' , nombre: 'Polonia'});
    countryList.push({id: 'Portugal' , nombre: 'Portugal'});
    countryList.push({id: 'Reino Unido' , nombre: 'Reino Unido'}); //.
    countryList.push({id: 'República Centroafricana' , nombre: 'República Centroafricana'}); //.
    countryList.push({id: 'República Checa' , nombre: 'República Checa'}); //.
    countryList.push({id: 'República del Congo' , nombre: 'República del Congo'}); //.
    countryList.push({id: 'República Democrática del Congo' , nombre: 'República Democrática del Congo'}); //.
    countryList.push({id: 'República Dominicana' , nombre: 'República Dominicana'}); //.
    countryList.push({id: 'República Sudafricana' , nombre: 'República Sudafricana'}); //.
    countryList.push({id: 'Ruanda' , nombre: 'Ruanda'});
    countryList.push({id: 'Rumanía' , nombre: 'Rumanía'}); //.
    countryList.push({id: 'Rusia' , nombre: 'Rusia'});
    countryList.push({id: 'Samoa' , nombre: 'Samoa'});
    countryList.push({id: 'San Cristóbal y Nieves' , nombre: 'San Cristóbal y Nieves'}); //.
    countryList.push({id: 'San Marino' , nombre: 'San Marino'}); //.
    countryList.push({id: 'San Vicente y las Granadinas' , nombre: 'San Vicente y las Granadinas'}); //.
    countryList.push({id: 'Santa Lucía' , nombre: 'Santa Lucía'}); //.
    countryList.push({id: 'Santo Tomé y Príncipe' , nombre: 'Santo Tomé y Príncipe'}); //.
    countryList.push({id: 'Senegal' , nombre: 'Senegal'});
    countryList.push({id: 'Serbia' , nombre: 'Serbia'});
    countryList.push({id: 'Seychelles' , nombre: 'Seychelles'});
    countryList.push({id: 'Sierra Leona' , nombre: 'Sierra Leona'}); //.
    countryList.push({id: 'Singapur' , nombre: 'Singapur'});
    countryList.push({id: 'Siria' , nombre: 'Siria'});
    countryList.push({id: 'Somalia' , nombre: 'Somalia'});
    countryList.push({id: 'Sri Lanka' , nombre: 'Sri Lanka'}); //.
    countryList.push({id: 'Suazilandia' , nombre: 'Suazilandia'});
    countryList.push({id: 'Sudán' , nombre: 'Sudán'}); //.
    countryList.push({id: 'Sudán del Sur' , nombre: 'Sudán del Sur'}); //.
    countryList.push({id: 'Suecia' , nombre: 'Suecia'});
    countryList.push({id: 'Suiza' , nombre: 'Suiza'});
    countryList.push({id: 'Surinam' , nombre: 'Surinam'});
    countryList.push({id: 'Tailandia' , nombre: 'Tailandia'});
    countryList.push({id: 'Tanzania' , nombre: 'Tanzania'});
    countryList.push({id: 'Tayikistán' , nombre: 'Tayikistán'}); //.
    countryList.push({id: 'Timor Oriental' , nombre: 'Timor Oriental'}); //.
    countryList.push({id: 'Togo' , nombre: 'Togo'});
    countryList.push({id: 'Tonga' , nombre: 'Tonga'});
    countryList.push({id: 'Trinidad y Tobago' , nombre: 'Trinidad y Tobago'}); //.
    countryList.push({id: 'Túnez' , nombre: 'Túnez'}); //.
    countryList.push({id: 'Turkmenistán' , nombre: 'Turkmenistán'}); //.
    countryList.push({id: 'Turquía' , nombre: 'Turquía'}); //.
    countryList.push({id: 'Tuvalu' , nombre: 'Tuvalu'});
    countryList.push({id: 'Ucrania' , nombre: 'Ucrania'});
    countryList.push({id: 'Uganda' , nombre: 'Uganda'});
    countryList.push({id: 'Uruguay' , nombre: 'Uruguay'});
    countryList.push({id: 'Uzbekistán' , nombre: 'Uzbekistán'}); //.
    countryList.push({id: 'Vanuatu' , nombre: 'Vanuatu'});
    countryList.push({id: 'Venezuela' , nombre: 'Venezuela'});
    countryList.push({id: 'Vietnam' , nombre: 'Vietnam'});
    countryList.push({id: 'Yemen' , nombre: 'Yemen'});
    countryList.push({id: 'Yibuti' , nombre: 'Yibuti'});
    countryList.push({id: 'Zambia' , nombre: 'Zambia'});
    countryList.push({id: 'Zimbabue' , nombre: 'Zimbabue'});
    return countryList;
}