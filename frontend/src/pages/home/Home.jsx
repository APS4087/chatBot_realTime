import React from 'react'
import SideBar from '../../components/sideBar/SideBar'

const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-green-300 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <SideBar / >
      {/*<MessageSide/>*/}
    </div>
  )
}

export default Home