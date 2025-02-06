import React from 'react'
import { useThemeContext } from '../context/ThemeContext'
import { useLocation } from 'react-router-dom'
import { Input } from './ui/input'
import { Button } from './ui/button'

const NewsLatter = () => {
  const {darkmode}=useThemeContext()
  const {pathname}=useLocation()
  return (
  <div className={`${darkmode?"dark":""} ${["/profile","/admin/allblog","/admin/alluser","/addblog","/login","/signup"].includes(pathname)?"hidden":"block"}`}>


    <section className='p-4 cmn-parent-bg'>
        <div className='w-full lg:w-1/2 mx-auto p-2 flex flex-col gap-1  items-center'>
        <span className='font-semibold  sm:text-xl cmn-text ubuntu-medium'>NewsLatter</span>
            <h1 className='text-2xl text-white sm:text-3xl dark:text-white lg:text-4xl font-semibold ubuntu-bold'>Stories and interviews</h1>
            <p className='cmn-text sm:text-lg text-center ubuntu-regular'>Subscribe to learn about new features , the latest in technology solutions and updates</p>
            <div className='flex flex-col items-start w-full justify-center '>
                <div  className='p-2 flex  flex-col justify-center sm:flex-row gap-2 items-center w-full'>
                <input className="cmn-input  p-2" type="text" placeholder='Enter your email' name="" id="" />
                {/* <span className='text-sm px-2 text-[#1c1e22] ubuntu-light'>We care about your data in our privacy policy</span> */}
                <button className='  main-text cmn-btn '>Subscribe</button>
                </div>
          
            </div>


        </div>
     
    </section>
  </div>
  )
}

export default NewsLatter
