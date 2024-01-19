import Link from 'next/link'

export default function BtnSecondary({ children, href }) {
    return (
        <button className='bg-transparent hover:bg-skin-button-accent font-semibold hover:text-skin-btn-text py-2 px-4 border border-blue-500 hover:border-transparent rounded duration-500'>
            <Link href={href || "/"}>{children}</Link>
        </button>
    )
}