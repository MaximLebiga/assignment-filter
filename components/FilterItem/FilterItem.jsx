export default function FilterItem({ title, active, onClick }) {
  const styles = active
    ? 'text-13.1 text-black uppercase font-normal text-center flex items-center justify-center cursor-pointer bg-gray-400'
    : 'text-13.1 text-black uppercase font-normal text-center flex items-center justify-center cursor-pointer'

  return (
    <div className={styles} onClick={onClick}>
      {title}
    </div>
  )
}