import React from 'react'
import { BiSearchAlt } from "react-icons/bi";

const Search = () => {
  return (
    <form className='flex items-center gap-2'>
        <input type="text" placeholder="Search..." className="input input-bordered input-primary rounded-full max-w-xs" />
        <button type="submit" className="btn btn-circle input-primary text-white">
            <BiSearchAlt className='w-6 h-6 outline-none'/>
        </button>
    </form>
    
  )
}

export default Search