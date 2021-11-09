import * as React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; 
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


export default function InfoHelper (props) {
 const {text} = props
  return (
    <div style={{marginTop:"6px"}}>

        <Tooltip title={text}
          arrow
          placement="left-start"
        >
        <IconButton
            size="small"
            color="DTButton"
        >
            <InfoOutlinedIcon/>
        </IconButton>
        </Tooltip>
            </div>
  );
}
