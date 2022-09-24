import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function SimpleBackdrop({open}) {
  const backdrop = (theme) => ({ 
    backgroundColor:'#fff',
    color: '#FFDC39', 
    zIndex: (theme) => theme.zIndex.drawer + 1 
  });

  return (
    <div>
      <Backdrop
        sx={backdrop}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
