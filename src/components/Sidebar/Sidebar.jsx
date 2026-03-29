import React, { useContext } from 'react'
import logo from '../../assets/logo.svg';
import moon from '../../assets/icon-moon.svg'
import user from '../../assets/image-avatar.jpg'
import './Sidebar.css'
import { InvoiceContext } from '../../context/InvoiceContext';
const Sidebar = () => {
    const { toggleTheme } = useContext(InvoiceContext);
    return (
        <div className='sidebar'>
            <div className='sidebar-logo'>
                <img src={logo} alt='logo' className='logo' />
            </div>
            <div className='sidebar-bottom'>
                <img src={moon} alt='Toggle theme' className='theme' onClick={toggleTheme}></img>
                <hr />

                <img src={user} alt='user' className='user'></img>
            </div>
        </div>
    )
}

export default Sidebar