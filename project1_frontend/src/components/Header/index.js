import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Header = () => {
  return (
    <div>
      <div className="logo">
        Menu
      </div>
      <div>
        <Link id="login_menu" className="menu" to={'/login'}>Login</Link>
        <Link id="register_menu" className="menu" to={'/register'}>Register</Link>
        <Link id="timeline_menu" className="menu" to={'/timeline'}>Timeline</Link>
        <Link id="chat_menu" className="menu" to={'/chat'}>Chat</Link>
        <Link id="group_menu" className="menu" to={'/group'}>Group</Link>
        <Link id="image_menu" className="menu" to={'/image'}>Image</Link>
        <Link id="profile_menu" className="menu" to={'/profile'}>Profile</Link>
        <Link id="follow_menu" className="menu" to={'/follow'}>Follow</Link>
        <Link id="wall_menu" className="menu" to={'/wall'}>Wall</Link>
        <Link id="dietgrpah_menu" className="menu" to={'/dietgraph/'}>DietGraph</Link>

      </div>
    </div>
  );
};



export default Header;
