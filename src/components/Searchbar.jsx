import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useThemeContext } from '../context/ThemeContext';
const Searchbar = ({value}) => {
    const {darkmode}=useThemeContext();

  return (
    <>
    <div className={`${darkmode?"dark":""}  ` }>

    <div className='    items-center  flex shadow-sm  p-1   border-b-2  border-[#5941C6]  relative '>
        <input type="text" name="" id="" placeholder='Search your blog' className='w-full text-base   rounded-full outline-none bg-transparent dark:text-white' />
        <SearchIcon fontSize='medium' className='absolute right-2 dark:text-white'/>
    </div>
    </div>
    
    </>
  )
}

export default Searchbar
