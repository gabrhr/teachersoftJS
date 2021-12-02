/* Author: Mitsuo
 */

/* La tabla es media complicada.  Esto es lo minimo para usarla.
 * 
 * - Headers: tableHeaders
 * - Data: records
 * - filterFn:  objeto que contiene funcion de filtrado (`filterFn.fn`)
 * 
 * Ejemplo completo de CRUD en pages/Employees/
 */
import React from 'react'
import useTable from "../../components/useTable"
import { TableBody} from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../../components/controls/StyledTable';

/* headers and row data */
const tableHeaders = [
    {
        id: 'id',
        label: 'ID',
        numeric: true,      // right align
        sortable: false
    },
    {
        id: 'field1',
        label: 'Field1',
        numeric: false,
        sortable: false
    },
    {
        id: 'field2',
        label: 'Field2',
        numeric: false,
        sortable: false
    },
    {
        id: 'field3',
        label: 'Field3',
        numeric: false,
        sortable: false
    }
]

function generateDataRow(id, field1, field2, field3) {
    return {id, field1, field2, field3}
}

function generateSampleData() {
    let l = []
    for (let i = 0; i < 5; i++) {
        l[i] = generateDataRow(i+1, `aa${i+1}`, 'bbb', 'ccc')
    }
    return l
}

/* Generates a customized row with the data */
function generateRows(records) {
    return (
        records.map(item => (
            <StyledTableRow key={item.id}>
                <StyledTableCell align="right">{item.id}</StyledTableCell>
                <StyledTableCell>{item.field1}</StyledTableCell>
                <StyledTableCell>{item.field2}</StyledTableCell>
                <StyledTableCell>{item.field3}</StyledTableCell>
            </StyledTableRow>
        ))
    )
}

export default function TablePage() {
    const [records, setRecords] = React.useState(
        generateSampleData()
    )
    /* no filter function initially */
    const [filterFn, setFilterFn] = React.useState({ 
        fn: items => { return items; } 
    })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, tableHeaders, filterFn);

    return (
        <>
            <TblContainer>
                <TblHead />
                <colgroup>
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '50%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '20%' }} />
                </colgroup>
                <TableBody>
                    { generateRows(recordsAfterPagingAndSorting()) }
                </TableBody>
            </TblContainer>
            {/* <TblPagination /> */}
        </>
    )
}
