import React from 'react'
import logo from '../assets/logo.svg';
import moon from '../assets/icon-moon.svg'
import user from '../assets/image-avatar.jpg'
import '../components/Sidebar.css'
const Sidebar = () => {
  return (
      <div className='sidebar'>
          <div className='sidebar-logo'>
              <img src={logo} alt='logo' className='logo' />
          </div>
          <div className='sidebar-bottom'>
              <img src={moon} alt='theme' className='theme'></img>
              <hr/>
              <img src={user} alt='user' className='user'></img>
          </div>
      </div>
  )
}

export default Sidebar