/* Author: Mitsuo
 * 
 * Email templates for Mesa Partes.
 */

/* copycat of PUCP email html format.  (Header + Footer + style) */
function pucpformat(actualcontent) {
    return `<!DOCTYPE html>
<head>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500,700&display=swap"
/>
<style>

body {
}

.mailbody {
    /*box-sizing: border-box;*/
    margin: auto;   /* Center Align Element */
    width: 650px;
    border: 1px solid lightgray;
}

p, a {
    font-family: Quicksand, sans-serif;
}

.header, .footer {
    background-color: #042354;      /* azul oscuro PUCP */
}

.header {
    height: 52px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
}

.footer {
    height: 24px;
}

.content {
    margin: 30px;
}

a:link, a:visited, a:hover, a:active {
  color: #042354;
  background-color: transparent;
  text-decoration: underline;
  font-weight: 600;
}

</style>
</head>
<body>
    <div class="mailbody">
        <div class="header">
            <img style="height:100%" src="https://raw.githubusercontent.com/gabrhr/teachersoftJS/develop/src/assets/images/LogoPUCP.png" />
        </div>
        <div class="content">
            ${actualcontent}
        </div>
        <div class="footer"></div>
    </div>
</body>
`
}

export function soliDelegada(s) {
    let actualcontent = `<p>
            Estimado:<br/>
            ${s.delegado.fullName}
        </p>
        <p>Se le ha delegado la siguiente solicitud:</p>
        <p>
            Solicitud Original: <b>${s.asunto}</b>
        </p>
        <blockquote>
            <p style="white-space:pre-wrap;">${s.descripcion}</p>
        </blockquote>
        <p>
            Solicitador: ${s.solicitador.fullName}
        </p>
        <p>
            Por favor atienda esta solicitud ingresando a nuestro sistema
            <a href="http://front.teachersoft.solutions">TeacherSoft</a>.
        </p>
Cordialmente,<br/>
<b>Departamento Académico de Ciencias</b>
        </p>
`
    return pucpformat(actualcontent)
}

export function soliAtendidaMP(s) {
    let resultado = ""
    let color = "black"
    if (s.resultado === 1) {
        resultado = "Aceptado"
        color = "green"
    } else if (s.resultado === 2) {
        resultado = "Rechazado"
        color = "red"
    }
    let actualcontent = `<p>
            Estimado:<br/>
            ${s.solicitador.fullName}
        </p>
        <p>Su solicitud fue atendida.</p>
        <p>
            Solicitud Original: <b>${s.asunto}</b>
        </p>
        <blockquote>
            <p style="white-space:pre-wrap;">${s.descripcion}</p>
        </blockquote>
        <p>
            Respuesta: 
                <span style="color: ${color};">
                    <b>${resultado}</b>
                </span>
        </p>
        <blockquote>
            <p style="white-space:pre-wrap;">${s.observacion}</p>
        </blockquote>
        <p>
Cordialmente,<br/>
<b>Departamento Académico de Ciencias</b>
        </p>
`
    return pucpformat(actualcontent)
}
