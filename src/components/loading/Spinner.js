import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = () => {
  const mystyle = {
    margin: 'auto',
  };

  return (
    <div
      className='spinner'
      style={mystyle}
    >
      <CircularProgress color='secondary' />
    </div>
  );
};

export default Spinner;
