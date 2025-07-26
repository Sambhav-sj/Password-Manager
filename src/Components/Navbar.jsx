import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-cyan-950 text-white'>
            <div className="mycontainer flex justify-between items-center px-2 h-14 py-5">

                <div className="logo font-bold text-2xl">
                    <span className="text-cyan-600">&lt;</span>
                    Iron
                    <span className="text-cyan-600">Vault/&gt;</span>
                </div>
                {/* <ul className=''>
                    <li className='flex gap-4'>
                        <a href="#" className='hover:font-bold'>Home</a>
                        <a href="#" className='hover:font-bold'>About</a>
                        <a href="#" className='hover:font-bold'>Contact</a>
                    </li>
                </ul> */}
                <button className='text-white bg-cyan-700 my-5 flex rounded-full justify-between items-center ring-1 ring-cyan-100'>
                    <img className='invert w-10 p-1' src="/image/github.svg" alt="github logo" />
                    <span className="px-2 font-bold">GitHub</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
