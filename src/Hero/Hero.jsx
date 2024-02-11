import React from 'react'
import logo from '../assets/logo.svg'

const Hero = () => {
  return (
    <header>
      <div className='w-full py-2 px-10 h-auto flex justify-between items-center text-black mb-10 bg-transparent backdrop-blur-sm shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] max-[450px]:px-2 transition-all'>
        <div>
          <img src={logo} alt="Summarizer logo" className='h-20 w-20' />
        </div>
        <div>
          <button className='bg-black text-white rounded-xl px-5 py-2 hover:bg-white hover:text-black transition-all'>GitHub</button>
        </div>
      </div>
      <div className='text-center text-5xl font-bold'>
        <div className='max-[360px]:text-3xl'>
          <h1 className='mb-3'>
            AI-Powered Article Summarizer<br />
          </h1>
          <p className='from-orange-600 via-yellow-600 to-orange-600 bg-gradient-to-r bg-clip-text text-transparent mb-5'>GPT-4 Unleashed!</p>
        </div>
        <p className='text-lg font-normal w-4/6 mx-auto max-[360px]:text-sm'>Discover seamless article reading with our innovative product. Simplifying the process, it efficiently summarizes content, offering concise insights and saving you valuable time. Experience effortless consumption of complex articles, making knowledge acquisition a breeze.</p>
      </div>
    </header>
  )
}

export default Hero;