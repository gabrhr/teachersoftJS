import * as React from 'react';
import Stack from '@mui/material/Stack';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import { styled } from '@mui/system';

const CustomButtonRoot = styled('button')(`
  background-color: #fff;
  padding: 5px;
  border-radius: 10px;
  color: #fff;
  font-family: Noto Sans;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  border: none;
    
  &:hover {
    background-color: #0059b2;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: #042354;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
  &.login{
    font-family: Noto Serif;
    font-size: 14px;
  }
`);

const DTButton = (props) => {

    return (
        <ButtonUnstyled {...props} component={CustomButtonRoot} />
    );
};

export default DTButton;