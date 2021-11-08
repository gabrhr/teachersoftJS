import React from 'react'

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';

import { Controls } from '../controls/Controls';
import { propsToClassKey } from '@mui/styles';


export const ExportCSV = ({csvData, fileName, ...props}) => {



    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileExtension = '.xlsx';



    const exportToCSV = (csvData, fileName) => {

        const ws = XLSX.utils.json_to_sheet(csvData);

        const wb = { Sheets: { 'Carga_Horaria': ws }, SheetNames: ['Carga_Horaria'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        const data = new Blob([excelBuffer], {type: fileType});

        FileSaver.saveAs(data, fileName + fileExtension);

    }



    return (

        <Controls.Button onClick={(e) => exportToCSV(csvData,fileName)} {...props}/>

    )

}