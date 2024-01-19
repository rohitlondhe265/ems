
export default function BtnDisabled({ children, href }) {
    return (
        <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'>{children}
        </button>
    )
}