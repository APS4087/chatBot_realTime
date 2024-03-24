import React from 'react'
import Search from './Search'
import Conversations from './Conversations'
import LogoutBtn from './LogoutBtn'

const SideBar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <Search />
        <div className='divider px-3'></div>
        <Conversations />
        <LogoutBtn />
    </div>
    
  )
}

export default SideBar