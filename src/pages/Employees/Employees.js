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
import Notification from '../../components/util/Notification'
import ConfirmDialog from '../../components/util/ConfirmDialog'
import * as DTLocalServices from '../../services/DTLocalServices';
/* ICONS */
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';

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
  },
  {
    id: 'actions',
    label: 'Actions',
    numeric: false,
    sortable: false
  }
]

export default function Employees() {
  const [records, setRecords] = useState(employeeService.getAllEmployees())
  /* no filter function initially */
  const [filterFn, setFilterFn] = useState({fn: items => { return items; }})
  const [searchText, setSearchText] = useState('')
  const [openPopup, setOpenPopup] = useState(false)
  /* stores values of record to then edit in the Dialog/Popup */
  const [recordForEdit, setRecordForEdit] = useState(null)
  /* notification snackbar */
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  /* confirm dialog */
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subtitle: ''
  })

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(records, tableHeaders, filterFn);

  const handleSearch = e => {
    /* React "state object" (useState()) doens't allow functions, only
     * objects.  Thus the function needs to be inside an object. */
    setFilterFn({
      fn: items => {
        if (searchText == "")
          /* no search text */
          return items
        else {
          //return DTLocalServices.filter(items, 'fullName', searchText)
        }
      }
    })
  }

  const addOrEdit = (employee, resetForm) => {
    if (employee.id == 0)
      employeeService.insertEmployee(employee)
    else
      employeeService.updateEmployee(employee)
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
    setRecords(employeeService.getAllEmployees())

    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      type: 'success'
    })
  }

  /* open object in a pop up (for edit) */
  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  const onDelete = id => {
    // if (!window.confirm('Are you sure to delete this record?'))
    //   return
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })

    employeeService.deleteEmployee(id)
    setRecords(employeeService.getAllEmployees())
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error'
    })
  }

  const handleChange = event => {
    setSearchText(event.target.value)
  }

  return (
    <>
      <PageHeader
        title="All Employees"
        subtitle="List of employees with CRUD operations."
        icon={<AdbIcon fontSize="large" />}
      />
      {/* SEARCH BAR */}
      <Toolbar mt={2}>
          <Controls.Input
            label="Search Employees by Name"
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <SearchIcon />
            //     </InputAdornment>
            //   )
            // }}
            sx={{ width: .75 }}
            type="search"
            value={searchText}
            onChange={handleChange}
          />
          <Controls.Button
              text={<SearchIcon />}
              onClick={handleSearch}
              // onClick = {() => setOpenPopup(true)}
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
              onClick = {() => {setOpenPopup(true); setRecordForEdit(null)}}
            />
          </Box>
      </Toolbar>
      <Paper sx={{ borderRadius: '20px', padding:5 }}>
        <TblContainer>
          <colgroup>
            <col style={{width: '10%'}}/>
            <col style={{width: '30%'}}/>
            <col style={{width: '30%'}}/>
            <col style={{width: '10%'}}/>
            <col style={{width: '10%'}}/>
            <col style={{width: '10%'}}/>
          </colgroup>
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
                  <TableCell>
                    <Controls.ActionButton
                      color="warning"
                      onClick={ () => {openInPopup(item)}}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="error"
                      onClick={() => {
                        // onDelete(item.id)
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Are you sure to delete this record?',
                          subTitle: 'You can\'t undo this operation',
                          onConfirm: () => {onDelete(item.id)}
                        })
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      {/* POP UPS */}
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Add an Employee"
      >
        <EmployeeForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
        />
      </Popup>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  )
}
