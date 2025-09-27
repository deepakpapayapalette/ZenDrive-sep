import React from 'react'
import { Button } from '@mui/material'

const ThemeButton = ({ className,  variant, sx, onClick, value, endIcon }) => {
  return (
    <>
      <Button
        className={className}
        variant={variant}
        sx={sx}
        onClick={onClick}
        endIcon={endIcon}
      >
        {value}
      </Button>
    </>
  )
}

export default ThemeButton

