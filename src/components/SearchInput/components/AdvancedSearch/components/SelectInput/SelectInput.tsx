import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  disableScrollLock: true,
  anchorOrigin: {
    vertical: 'bottom' as const, // Add type assertion
    horizontal: 'left' as const, // Add type assertion
  },
  transformOrigin: {
    vertical: 'top' as const, // Add type assertion
    horizontal: 'left' as const, // Add type assertion
  },
};



function getStyles(name: string, selectedNumber: string | number | undefined, theme: Theme) {
  return {
    fontWeight: selectedNumber !== undefined && String(selectedNumber) === name
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

interface ISelectInputProps {
    itemName: string
    value?: string | number
    onChange?: (value: string | number) => void
    options?: string[] | number[]
}


export const SelectInput:FC <ISelectInputProps> = ({
  itemName,
  value,
  onChange,
  options
}) => {
    const theme = useTheme();
    const [selectedNumber, setSelectedNumber] = useState<string>('');

    useEffect(() => {
      if (value !== undefined) {
        setSelectedNumber(String(value));
      }
    }, [value]);
  
    const handleChange = (event: SelectChangeEvent) => {
      const {
        target: { value: newValue },
      } = event;
      
      setSelectedNumber(newValue);
      
      // Call the onChange prop if provided
      if (onChange) {
        onChange(newValue);
      }
    };
  
    return (
      <div className="">
        <FormControl sx={{ m: 1, width: 250 }}>
          <InputLabel id="demo-multiple-chip-label">{itemName}</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            sx={{ 
                borderRadius: '35px', 
                borderWidth: '1px', 
                outline: 'none',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderWidth: '1px !important', // Force 1px border width always
                  borderColor: 'inherit'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderWidth: '1px !important', // Prevent border thickness increase on focus
                  borderColor: 'gray'  // or whatever color you want
                }
              }}
            value={selectedNumber}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            MenuProps={MenuProps}
            
          >
            {options?.map((option) => (
              <MenuItem
                key={itemName}
                value={option}
                style={getStyles(String(option), selectedNumber, theme)}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
}

