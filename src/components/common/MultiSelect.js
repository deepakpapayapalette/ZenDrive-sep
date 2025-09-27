import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(value, selectedValues, theme) {
    return {
        fontWeight: selectedValues.includes(value)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

const MultiSelect = ({ label, name, placeholder, options = [], value = [], onChange }) => {
    const theme = useTheme();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        // Send updated value to parent (Formik)
        onChange({
            target: {
                name,
                value: typeof value === 'string' ? value.split(',') : value,
            },
        });
    };

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={name} className="text-base font-semibold">
                    {label}
                </label>
            )}
            <FormControl >
                <Select
                    fullWidth
                    id={name}
                    name={name}
                    size="small"
                    multiple
                    value={value || []}
                    onChange={handleChange}
                    displayEmpty
                    MenuProps={MenuProps}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em>{placeholder}</em>;
                        }
                        const selectedLabels = options
                            .filter((opt) => selected.includes(opt._id))
                            .map((opt) => opt.lookup_value);
                        return selectedLabels.join(', ');
                    }}
                    sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#286578 !important",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#286578 !important",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#286578 !important",
                        },
                    }}
                >
                    {options.map((opt) => (
                        <MenuItem
                            key={opt._id}
                            value={opt._id}
                            style={getStyles(opt._id, value, theme)}
                        >
                            {opt.lookup_value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default MultiSelect;
