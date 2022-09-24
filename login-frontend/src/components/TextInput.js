import * as React from 'react';
import TextField from '@mui/material/TextField';
import './components.css';

export default function TextInput(props) {
    const eventHandler = (event) => {
       props.onChange(event.target.name, event.target.value)
    }

    return (
        <TextField {...props}  
            id="outlined-error-helper-text"
            variant="outlined"
            onChange={eventHandler}
        />
    );
}
