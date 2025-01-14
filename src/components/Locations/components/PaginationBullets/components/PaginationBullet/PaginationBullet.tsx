 

 

export const PaginationBullet = ({onClick, isActive}: {onClick: () => void, isActive: boolean}) => {

  return (
    <div 
      className={`h-4 w-4 rounded-full  cursor-pointer ${isActive ? 'bg-blue-300' : 'bg-blue-600'}`}
      onClick={onClick}
      >
      
    </div>
  )
}
 