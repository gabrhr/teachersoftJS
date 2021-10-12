import React, { useState } from 'react'
import { Table, TableCell, TableHead, TablePagination, TableRow } from '@mui/material'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles(tableStyle => ({
    table: {
        marginTop: 0,
        '& thead th': {
            fontWeight: '600',
            color: "primary.light"
        },
        '& tbody td': {
            fontWeight: '300',
            border: 32
        },
        '& tbody tr:hover': {
            backgroundColor: '#DEEEFF',
            cursor: 'pointer'
        },

        '&:last-child td, &:last-child th': { border: 32 }
    }
}
))

export default function useTable(records, headers) {
    const classes = useStyles()
    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])

    const TblContainer = props => (
        // FIX:  no funciona style
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const TblHead = props => {
        return (
            <TableHead>
                <TableRow>
                    {
                        headers.map(header => (
                            <TableCell key={header.id}>
                                {header.label}
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        )
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
    }

    const handleRowsPerPageChange = event => {
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
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            />
    )

    const recordsAfterPagingAndSorting = () => {
        return records.slice(page*rowsPerPage, (page+1)*rowsPerPage)
    }

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}
