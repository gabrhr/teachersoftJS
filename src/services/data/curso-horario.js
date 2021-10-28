/* In this case this is better than waste time running a "local server",
 * because the data is fixed.  It's only test data. */

export const data =
  [
    {
      "id": 2,
      "fecha_creacion": "2021-10-06T21:18:56.000+00:00",
      "fecha_modificacion": "2021-10-06T21:18:56.000+00:00",
      "codigo": "881",
      "horas_semanales": 0,
      "ciclo": {
        "id": 9,
        "fecha_creacion": "2021-09-30T00:00:00.000+00:00",
        "fecha_modificacion": "2021-09-30T00:00:00.000+00:00",
        "anho": 2019,
        "periodo": 0,
        "fecha_inicio": "2019-03-02",
        "fecha_fin": "2019-01-21"
      },
      "curso": {
        "id": 2,
        "fecha_creacion": "2021-09-30T01:50:39.000+00:00",
        "fecha_modificacion": "2021-09-30T01:50:39.000+00:00",
        "seccion": {
          "id": 2,
          "fecha_creacion": "2021-09-30T01:15:40.000+00:00",
          "fecha_modificacion": "2021-09-30T01:15:40.000+00:00",
          "departamento": {
            "id": 1,
            "fecha_creacion": "2021-09-30T01:14:32.000+00:00",
            "fecha_modificacion": "2021-09-30T01:14:32.000+00:00",
            "nombre": "Facultad De Ciencias e Ingeniería",
            "correo": "fci@pucp.edu.pe",
            "foto": null,
            "fecha_fundacion": "2021-09-30T01:14:32.000+00:00"
          },
          "nombre": "Telecomunicaciones",
          "foto": null,
          "fecha_fundacion": "2021-09-30T01:15:40.000+00:00"
        },
        "nombre": "Técnicas de programación",
        "codigo": "INF144",
        "creditos": 5.0
      },
      "profesores": [
        {
          "id": 1,
          "fecha_creacion": "2021-09-30T01:09:19.000+00:00",
          "fecha_modificacion": "2021-09-30T01:09:19.000+00:00",
          "tipo_persona": 0,
          "codigo_pucp": "20172665",
          "correo_pucp": "a20172665@pucp.edu.pe",
          "nombres": "Christian Andre",
          "apellido_paterno": "Carhuancho",
          "apellido_materno": null,
          "fechaNac": null,
          "sexo": 0,
          "tipo_documento": 0,
          "numero_documento": null,
          "telefono": null,
          "foto": null,
          "seccion": {
            "id": 2,
            "fecha_creacion": "2021-09-30T01:15:40.000+00:00",
            "fecha_modificacion": "2021-09-30T01:15:40.000+00:00",
            "departamento": {
              "id": 1,
              "fecha_creacion": "2021-09-30T01:14:32.000+00:00",
              "fecha_modificacion": "2021-09-30T01:14:32.000+00:00",
              "nombre": "Facultad De Ciencias e Ingeniería",
              "correo": "fci@pucp.edu.pe",
              "foto": null,
              "fecha_fundacion": "2021-09-30T01:14:32.000+00:00"
            },
            "nombre": "Telecomunicaciones",
            "foto": null,
            "fecha_fundacion": "2021-09-30T01:15:40.000+00:00"
          },
          "departamento": {
            "id": 1,
            "fecha_creacion": "2021-09-30T01:14:32.000+00:00",
            "fecha_modificacion": "2021-09-30T01:14:32.000+00:00",
            "nombre": "Facultad De Ciencias e Ingeniería",
            "correo": "fci@pucp.edu.pe",
            "foto": null,
            "fecha_fundacion": "2021-09-30T01:14:32.000+00:00"
          }
        }
      ],
      "sesiones": []
    }
  ]