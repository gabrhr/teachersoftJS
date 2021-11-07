import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import {Grid, Typography, TextField } from '@mui/material';
import { makeStyles } from "@mui/styles";
import SendIcon from '@mui/icons-material/Send';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const useStyles = makeStyles(theme => ({
    contentRoot: {
        borderColor: 'red',
      },
      connectorLine: {
        borderColor: 'red',
        orientation: 'vertical'
      }
    
}))

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
 
 
  [`& .${stepConnectorClasses.line}`]: {
 
    width: '50',
    height: '50',
    display: 'flex',
    borderRadius: '2',
    marginLeft: '11px',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    textAlign: 'center',
  },
 // .css-1pe7n21-MuiStepConnector-root

}));


/*Solamente esto es estilo*/
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState, number}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  
  
  ...( (ownerState.active )&& {
    backgroundImage:
    'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
 
  }),
  ...((number==1  ) &&{
    backgroundImage:  'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
 
  }),
  ...((ownerState.active || ownerState.completed ) && number==2&&{
    backgroundImage:
    'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
 
  }),
  ...((ownerState.active || ownerState.completed ) && number==3 &&{
    backgroundImage:
    'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, index } = props;

  const icons = {
    1: <SendIcon sx={{}}/>,
    2: <AccessTimeIcon />,
    3: <PersonAddAltIcon/>,
    4: <PersonAddAltIcon/>
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} number={index} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
 
 
};

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad', 'IDK'];

export default function CustomizedSteppers() {
 





  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
 
      <Stepper   activeStep={2} connector={ <ColorlibConnector />} orientation="vertical" direction="vertical">
        {steps.map((label, index) => (
          <Step key={label, index}>
            <StepLabel StepIconComponent={() => <ColorlibStepIcon index={index}/>}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}