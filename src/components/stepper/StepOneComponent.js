import { Paper, Typography } from '@mui/material';
import React from 'react';
import './stepper.css';

const StepOneComponent = ({ title, children }) => {
  return (
    <div className='stepper_component_conatiner'>
      <Typography variant='h2'>{title}</Typography>
      <div>{children}</div>
    </div>
  );
};

export default StepOneComponent;
