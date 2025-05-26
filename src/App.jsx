import React from 'react'
import Hero from './components/Hero'
import SmoothScrollProvider from './components/SmoothScrollProvider'
import MouseTrail from './components/MouseTrail'
import Service from './components/Service'
import Navbar from './components/Navbar'
import About from './components/About'
import Footer from './components/Footer'
import { Lightbulb } from 'lucide-react'
import About2 from './components/About2'
import About4 from './components/About4'

import About3 from './components/About3'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer2 from './components/Footer2'
import Flip from './components/Flip'
import { useState,useEffect } from 'react'
import Welcome from './components/Welcome'
import { useTopLayer } from './components/Dlayers'
import CustomScrollbar from './components/CustomScrollbar'
const App = () => {
  const [anidone, setAnidone] = useState(false)
  


  return (
    <div  className='relative !overflow-x-hidden'>
      <a href='#Contact' className='fixed bottom-0 left-0  text-xs lg:text-sm flex items-center gap-2 pr-4 group z-[100] cursor-pointer text-white   font-Raleway font-normal bg-black p-2 px- rounded-tr-3xl hover:text-black hover:bg-white transition-all duration-700 ease-in-out '><Lightbulb className='group-hover:text-black ' />  Let's Discuss Your Idea</a>
      <Welcome setAnidone={setAnidone}/>
    {/* <Flip/> */}
      <Navbar />
      <div className='hidden lg:block'>
      <MouseTrail />
      </div>
      {/* <CustomScrollbar /> */}

      <SmoothScrollProvider>


        <div  className=' text-white '>
          
          <Hero  anidone={anidone}/>
          <Service />

          <div id='AboutUs' className="">
            <About />
            <About2 />
            {/* <About3 /> */}
            <About4/>
            <Reviews/>
          </div>
          {/* <Test/> */}
          {/* <div className='h-screen flex items-center justify-center bg-white '>dumy</div> */}

          {/* <div id='Contact' className='h-screen flex items-center justify-center'>Service</div> */}

          <div id='Contact'>

        <Footer />
          <Contact/>
          <Footer2 />

          </div>
        </div>
      </SmoothScrollProvider>
          
      
      
    </div>
  )
}

export default App
