import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { rooms } from "./consts";



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



function getStyles(name: string, selectedNumber: string[] | string, theme: Theme) {
  return {
    fontWeight: selectedNumber.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

interface ISelectInputProps {
    itemName: string
}


export const SelectInput:FC <ISelectInputProps> = ({itemName}) => {
    const theme = useTheme();
    const [selectedNumber, setSelectedNumber] = useState<string>('');
  
    const handleChange = (event: SelectChangeEvent) => {
      const {
        target: { value },
      } = event;
      setSelectedNumber(
        // On autofill we get a stringified value.
        value as string
      );
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
            {rooms?.map((room) => (
              <MenuItem
                key={itemName}
                value={room}
                style={getStyles(room, selectedNumber, theme)}
              >
                {room}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
}

