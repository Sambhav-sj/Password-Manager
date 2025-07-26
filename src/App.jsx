// import { useState } from 'react' 
import './App.css'
import Footer from './Components/Footer.jsx'
import Manager from './Components/Manager.jsx'
import Navbar from './Components/Navbar.jsx'

function App() {


  return (
    <>
      <Navbar/>
      <div className="inset-0 -z-10 h-full w-full bg-cyan-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-teal-300 opacity-20 blur-[100px]"></div>
      <Manager/>
      </div>
      <Footer/>
    </>
  )
}

export default App
