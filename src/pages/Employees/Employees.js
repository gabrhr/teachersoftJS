import React, { useState } from 'react'
import EmployeeForm from './EmployeeForm'
import PageHeader from '../../components/PageHeader'
import AdbIcon from '@mui/icons-material/Adb';
import { Paper, TableBody, TableRow, TableCell } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useTable from "../../components/useTable"
import * as employeeService from '../../services/employeeService'

const useStyles = makeStyles(theme => ({
    pageContent: {
        // margin: theme.spacing(10),
        // padding: theme.spacing(3),
    }
}))

const tableHeaders = [
    {id: 'id', label: 'EmployeeID'},
    {id: 'fullName', label: 'Employee Name'},
    {id: 'email', label: 'Email Address (Personal)'},
    {id: 'mobile', label: 'Mobile Number'},
    {id: 'department', label: 'Department'}
]

export default function Employees() {
    const classes = useStyles()
    const [records, setRecords] = useState(employeeService.getAllEmployees())

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, tableHeaders);


    // comentario inutil

    return (
        <>
            <PageHeader 
                // USELESS,  needs to be passed down or something
                // className={classes.pageContent}
                title="New Employee"
                subtitle="Form design with validation"
                icon={<AdbIcon fontSize="large"/>}
                />
            <Paper className={classes.pageContent} sx={{borderRadius: '20px'}}>
                <EmployeeForm />
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.fullName}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.mobile}</TableCell>
                                        <TableCell>{item.department}</TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
        </>
    )
}
