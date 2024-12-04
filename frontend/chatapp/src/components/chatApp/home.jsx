import React from 'react'

const home = () => {
  return (
    <>
    <div className='bg-white/30 backdrop-blur-lg z-0 sticky top-0 shadow-2xl'>
    <nav>
        <ul className='flex flex-row flex-wrap text-black space-x-4  p-4 cursor-pointer'>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
      </nav>        
    </div>
     
    <div className='flex justify-center items-center mt-40'>
      <div className='bg-green-500 w-[25vw] h-[50vh] flex flex-col items-cente'>
        <h1 className='mt-10 font-serif text-sm'>
          Join Room...
        </h1>
        <input type="text" placeholder='Enter The Room Id'/>
      </div>
    </div>

    </>
  )
}

export default home
