import { FC } from "react"
import { PaginationBullet } from "./components"

interface IPaginationBulletsProps {
    totalPages: number
    currentPage: number
    onBulletClick: (idx:number) => void
}

export const PaginationBullets:FC <IPaginationBulletsProps> = ({totalPages, onBulletClick,currentPage}) => {
  console.log('currentPage', currentPage)
  return (
    <div className="flex gap-2">
      {Array.from({length:totalPages}, (_,idx) => {
                return (
                    <PaginationBullet isActive={idx === currentPage-1} onClick={() => onBulletClick(idx)} key={idx} />
                )
            })}
    </div>
  )
}

 