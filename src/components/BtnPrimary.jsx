import Link from 'next/link'

export default function BtnPrimary ({ children, href, onClick }) {
  const click = () => {
    console.log("btn clicked")
  }
  return (
    <button className='bg-primary text-white py-2 px-6 rounded md:ml-8 hover:bg-opacity-75 duration-500'
      onClick={onClick || click}>
      <Link href={href || "/"}>{children}</Link>
    </button>
  )
}
