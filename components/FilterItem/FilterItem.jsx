export default function FilterItem({ title, active, onClick }) {
  const styles = `text-13.1 text-black uppercase font-normal text-center flex items-center justify-center cursor-pointer ${active ? 'bg-gray-400' : ''}`

  return (
    <div className={styles} onClick={onClick}>
      {title}
    </div>
  )
}