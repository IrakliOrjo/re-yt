import Checkbox from '@mui/material/Checkbox';
import { FC } from 'react';

interface ICheckboxProps {
   amenitie: string;
   onClick?: () => void;
}

export const SearchCheckbox:FC<ICheckboxProps> = ({amenitie,onClick}) => {

  const label = {
    // Input props for the underlying input element
    inputProps: { 
      'aria-label': `Checkbox for ${amenitie}`,
      name: amenitie,
    },
    sx: { 
      margin: '0px',  
      padding: '4px',
       // Target unchecked state border
    '& .MuiSvgIcon-root:first-of-type path': {
      strokeWidth: '0px',
      stroke: '#757575'
    },
    // Target checked state if needed
    '& .MuiSvgIcon-root:last-child path': {
      strokeWidth: '0'
    }
    }
  };

  return (
    <div className='flex items-center'>
      <Checkbox onClick={onClick} {...label} />
      <span className='text-[16px] text-gray-800'>{amenitie}</span>
    </div>
  )
}
 

