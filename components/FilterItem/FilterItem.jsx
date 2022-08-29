import { useEffect } from "react"

export default function FilterItem({ title, active, onClick }) {
  return (
    <div
      className={`text-13.1 text-black uppercase font-normal text-center flex items-center justify-center cursor-pointer ${
        active ? 'bg-gray-400' : ''
      }`}
      onClick={onClick}
    >
      {title}
    </div>
  )
}