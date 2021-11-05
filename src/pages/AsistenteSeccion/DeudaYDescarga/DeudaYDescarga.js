import * as React from 'react'
import { styled } from '@mui/material/styles';
import {Box, Tabs, Tab, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@emotion/react';

import DeudaForm from './DeudaForm'
import DescargaForm from './DescargaForm'
import ContentHeader from '../../../components/AppMain/ContentHeader';

const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#0089B2',
    },
  });
  
  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      /* marginRight: theme.spacing(1), */
      color: '#3B4A81',
      width: '200px',
      height: '50px',
      backgroundColor: '#41B9E447',
      borderRadius: "25px 25px 0px 0 ",
      '&.Mui-selected': {
        color: '#fff',
        backgroundColor: '#0089B2'
      },
      '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
      },
    }),
  );
  
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3,  borderStyle: 'solid',borderWidth: '2px', borderColor: '#D4D9EC'}}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

export default function DeudaYDescarga() {
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
      };
    return (
        <>
        <ContentHeader
                text="Gestión de Deudas y Descargas Horarias"
                cbo={false}
            />
        <Box sx={{ bgcolor: '#fff', marginTop:2}}>
            <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
            >
            <StyledTab label="DEUDAS"  {...a11yProps(0)}/>
            {/* <StyledTab label="DESCARGAS"  {...a11yProps(1)}/> */}
            </StyledTabs>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
            <TabPanel value={value} index={0}>
                <DeudaForm/>
            </TabPanel>
            {/* <TabPanel value={value} index={1}>
               <DescargaForm/>
            </TabPanel> */}
            </SwipeableViews>
            <Box sx={{ p: 3 }} />
        </Box>
        </>
    )
}
