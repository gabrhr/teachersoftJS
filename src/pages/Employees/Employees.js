import React, { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import AdbIcon from '@mui/icons-material/Adb';
import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@mui/material';
import useTable from "../../components/useTable"
import * as employeeService from '../../services/employeeService'
import { Controls } from "../../components/controls/Controls"
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import EmployeeForm from './EmployeeForm'
import Popup from '../../components/util/Popup'

const tableHeaders = [
  {
    id: 'id',
    label: 'EmployeeID',
    numeric: true,
    sortable: true
  },
  {
    id: 'fullName',
    label: 'Employee Name',
    numeric: false,
    sortable: true
  },
  {
    id: 'email',
    label: 'Email Address (Personal)',
    numeric: false,
    sortable: true
  },
  {
    id: 'mobile',
    label: 'Mobile Number',
    numeric: false,
    sortable: false
  },
  {
    id: 'department',
    label: 'Department',
    numeric: false,
    sortable: true
  }
]

export default function Employees() {
  const [records, setRecords] = useState(employeeService.getAllEmployees())
  /* no filter function initially */
  const [filterFn, setFilterFn] = useState({fn: items => { return items; }})
  const [openPopup, setOpenPopup] = useState(false)

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(records, tableHeaders, filterFn);

  const handleSearch = e => {
    let target = e.target;
    /* React "state object" (useState()) doens't allow functions, only
     * objects.  Thus the function needs to be inside an object. */
    setFilterFn({
      fn: items => {
        if (target.value == "")
          /* no search text */
          return items
        else
          return items.filter(x => x.fullName.toLowerCase()
              .includes(target.value))
      }
    })
  }

  return (
    <>
      <PageHeader
        title="New Employee"
        subtitle="Form design with validation"
        icon={<AdbIcon fontSize="large" />}
      />
      <Paper sx={{ borderRadius: '20px' }}>
        <Toolbar>
          <Controls.Input 
            label="Search Employees by Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{ width: .75 }}
            onChange={handleSearch}
            type="search"
          />
          <Box sx={{width: .25, display: "flex", justifyContent: 'flex-end'}}>
            <Controls.Button 
              text="Add New"
              variant="outlined"
              startIcon={<AddIcon/>}
              sx={{justifySelf:"flex-end"}}
              /* NO FUNCA */
              // sx={{
              //   align:'right',
              //   // position: 'absolute',
              //   right: "10px",
              //   width: .1,
              //   m: 2
              // }}
              onClick = {() => setOpenPopup(true)}
            />
          </Box>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {
              recordsAfterPagingAndSorting().map(item => (
                <TableRow key={item.id}>
                  <TableCell
                    align="right"
                  >
                    {item.id}
                  </TableCell>
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
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Add an Employee"
      >
        <EmployeeForm />
      </Popup>
    </>
  )
}
