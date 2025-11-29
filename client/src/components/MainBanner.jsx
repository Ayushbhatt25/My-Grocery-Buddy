import React from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router-dom'

function MainBanner() {
  return (
    <div className='relative'>
      <img src={assets.main_banner_bg} alt="Main Banner" className='w-full hidden md:block' />
      <img src={assets.main_banner_bg_sm} alt="Main Banner" className='w-full md:hidden' />
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15 animate-shadow-dance'>
          Freshness you can trust, Savings you will love!
        </h1>
        <div className='flex items-center mt-6 font-medium'>
          <Link to={"/products"} className='group flex items-center gap-2 px-8 md:px-10 py-3.5 bg-gray-900 hover:bg-pink-500 transition-all duration-300 rounded-full text-white font-semibold shadow-lg shadow-black/20 hover:shadow-black/40 hover:-translate-y-0.5'>
            <div className="relative h-6 overflow-hidden">
              <span className="block transition-transform duration-300 group-hover:-translate-y-full">Shop Now</span>
              <span className="absolute top-full left-0 w-full block transition-transform duration-300 group-hover:-translate-y-full">Shop Now</span>
            </div>
            <img className='w-4 h-4 transition group-hover:translate-x-1 invert brightness-0' src={assets.white_arrow_icon} alt='arrow' />
          </Link>
          <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-8 py-3.5 cursor-pointer text-gray-900 font-bold hover:text-primary transition-colors text-lg'>
            <div className="relative h-6 overflow-hidden">
              <span className="block transition-transform duration-300 group-hover:-translate-y-full">Explore Deals</span>
              <span className="absolute top-full left-0 w-full block transition-transform duration-300 group-hover:-translate-y-full">Explore Deals</span>
            </div>
            <img className='w-4 h-4 transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt='arrow' />
          </Link>
        </div>
      </div>


    </div>

  )
}

export default MainBanner
