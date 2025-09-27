import React from 'react'
import { Fixedbox } from './Fixedbox'
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel

} from '@mui/material'

const SelectInput = (
  {
    size ,
    label2='',
    value,
    onChange,
    label,
    MenuItems,
    className,
    fullWidth,
    sx
  }
) => {


  return (
    <>
      <FormControl
        fullWidth
        size={size} >
        <InputLabel>{label2 }</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          label={label}
          MenuProps={Fixedbox}
          className={className}
          sx={sx}
        >
          {
            MenuItems?.map((menu) => {
            return <MenuItem value={menu.value}>{menu.label}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </>
  )
}

export default SelectInput

