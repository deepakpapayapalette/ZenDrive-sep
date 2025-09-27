import React from 'react'
import { TextField } from '@mui/material'

const TextInput = (
  {
    value,
    placeholder,
    onChange,
    InputProps,
    sx,
    size
  }
) => {
  return (
    <>
       <TextField
            size={size}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            InputProps={ InputProps}
            sx={sx}
          />
    </>
  )
}

export default TextInput
