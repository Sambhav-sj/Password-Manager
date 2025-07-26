import React from 'react'

const Footer = () => {
  return (
    <div className='bg-cyan-950 text-white py-2 sm:h-10 h-16 md:mt-5 w-full'>
      <div className="flex justify-around items-center">
        <p className='text-sm gap-4 mx-4'>© 2025 IronVault. All rights reserved.</p>
        <div className="socials flex gap-4">
          <a href="#" className='hover:font-bold'>Privacy Policy</a>
          <a href="#" className='hover:font-bold'>Terms of Service</a>
        </div>
      </div>
    </div>
  )
}

export default Footer
