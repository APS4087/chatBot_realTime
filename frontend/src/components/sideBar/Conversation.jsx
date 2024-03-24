import React from 'react'

const Conversation = () => {
  return (
    <>
    <div className='flex gap-2 items-center hover:bg-primary rounded p-2 py-1 cursor-pointer'>
        <div className='avatar online'>
            <div className='w-12 rounded-full'>
                <img src='https://api.multiavatar.com/Binx Bond.png' alt='User pfp'></img>
                
            </div>
        </div>

        <div className=' flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className='font-bold text-gray-200'>Bill Zhang</p>
                <span className='text-x1'>🤌</span>
            </div>
        </div>
    </div>
    <div className='divider my-0 py-0 h-1' />
    </>
  );
};

export default Conversation