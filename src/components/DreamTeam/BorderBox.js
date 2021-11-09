import { styled } from '@mui/material/styles'
import { Box } from '@mui/system';

/* Bordes que rodean contenido */
const BorderBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    paddingLeft: 1,
    paddingRight: 1,
    border: "1px solid", 
    borderRadius:"5px", 
    borderColor: theme.palette.grey[300],
    bgcolor:"#ffffff"
}));

export default BorderBox;
