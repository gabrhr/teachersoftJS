import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
export const StyledTableRow = styled(TableRow)(({ theme, backCl = '#E9ECF8' }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: backCl,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    /*'&:hover': {
      backgroundColor: '#DEEEFF',
    },*/
  }));