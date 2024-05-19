import React from 'react'

const Navbar = () => {
  return (
   <nav className='bg-slate-900 text-white'>
    <div className="my-container flex justify-between items-center px-4 py-8 h-[3vh] my-container mx-auto">

    <div className='logo font-bold text-2xl'>
      <span className='text-green-500'>&lt;</span>
      <span>Pass</span>
      <span className='text-green-500'>OP/&gt;</span>
    </div>
    {/* <ul className='flex gap-4'>
        <li><a className='hover:font-bold' href="#">Home</a></li>
        <li><a className='hover:font-bold' href="#"></a>About</li>
        <li><a className='hover:font-bold' href="#"></a>Contact</li>
    </ul> */}
    <button className='bg-green-500 p-2 rounded-lg'>
    <img className=' ' width={30} src="logo.png" alt="" />
    </button>
    </div>
   </nav>
  )
}

export default Navbar