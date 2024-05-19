import React from 'react'

const Footer = () => {
    return (
        <div className='sticky bottom-0 bg-slate-900 text-white flex justify-between items-center'>
            <div className='logo font-bold text-2xl'>
                <span className='text-green-500'>&lt;</span>
                <span>Pass</span>
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            <div className='flex gap-1 text-sm'>Created with <img className='w-5 h-5' src="heart.png" alt="" /></div>
        </div>
    )
}

export default Footer