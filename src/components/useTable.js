import React, { useState } from 'react'
import { Typography, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { PrecisionManufacturingRounded } from '@mui/icons-material'
import { Box } from '@mui/system'


const useStyles = makeStyles(theme => ({
  table: {   
    // '& .MuiTable-root': {
    '& .MuiTableCell-head': {
      // fontWeight: '600',
      // color: "primary.dark",
      // backgroundColor: '#fff',
      // borderColor: "primary.main",
      fontFamily: "Quicksand",
      fontStyle: "normal",
      fontWeight: '500',
      fontSize: '20px',
      lineHeight: "115%,"
    },
    /* All of these work to different degrees */
    // '& tbody td': {
    // '& .MuiTableRow-root': {
    // '& .MuiTableCell-root': {
    '& .MuiTableCell-body': {
      // fontWeight: '300',
      // backgroundColor: "#00ff00"
    },
    '& tbody tr:hover': {
      //backgroundColor: '#E9ECF8',
      // cursor: 'pointer'
    }
  },
  // typography: {
  //   fontFamily: "Quicksand",
  //   fontStyle: "normal",
  //   fontWeight: '500',
  //   fontSize: '20px',
  //   lineHeight: "115%,"
  // }
}
))

export default function useTable(records, headCells, filterFn) {
  const classes = useStyles()
  const pages = [5, 10, 25, 50]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[1])
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()

  const BoxTbl = props => (
        <Box border={1} color="#D4D9EC" borderRadius="15px" overflow="hidden" mt={4}>
          {props.children}
        </Box>
  )

  const TblContainer = props => (
    // FIX:  no funciona style
    <Table className={classes.table}>
      {props.children}
    </Table>
  )

  const TblHead = props => {

    const handleSortRequest = cellID => {
      const isAsc = orderBy === cellID && order === "asc"
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(cellID)
    }

    return (
      <TableHead>
        <TableRow > 
          {
            headCells.map(headCell => (
              <TableCell 
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                sortDirection={orderBy === headCell.id
                  ? order : false}
              >
                {
                  headCell.sortable
                    ? <TableSortLabel 
                        className={classes.typography}
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id
                          ? order : 'asc'}
                        onClick={() => {
                          handleSortRequest(headCell.id)
                        }}
                      >
                        {headCell.label}
                      </TableSortLabel> 
                    : 
                      headCell.label
                  }
              </TableCell>
            ))
          }
        </TableRow>
      </TableHead>
    )
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      /* labelRowsPerPage = {"Filas por página:"} */
    />
  )

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  // const recordsAfterPagingAndSorting = () => {
  //   return stableSort(records, getComparator(order, orderBy))
  //     .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  // }

  /* records after Filtering -> Sorting -> Paging */
  const recordsAfterPagingAndSorting = () => {
    return stableSort(filterFn.fn(records), getComparator(order, orderBy))
      .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  }

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    BoxTbl
  }
}
