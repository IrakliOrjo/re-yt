import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material"
import { FC } from "react"

interface IAmountInputProps {
    width?: number
    placeholder?: string
    value?: number | string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void

}


export const AmountInput:FC<IAmountInputProps> = ({width,placeholder,value, onChange}) => {

 

  return (
    <div>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
          <Input
            id="standard-adornment-amount"
            sx={{ width: width }}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          
        </FormControl>
    </div>
  )
}

