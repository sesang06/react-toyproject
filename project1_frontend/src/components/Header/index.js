import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Header = () => {
  return (
    <div>
      <div className="logo">
        SWPP - 8조
      </div>
      <div>
        <Link id="login_menu" className="menu" to={'/login'}>Login</Link>
        <Link id="timeline_menu" className="menu" to={'/timeline'}>Timeline</Link>
        <Link id="wall_menu" className="menu" to={'/wall'}>Wall</Link>
        <Link id="group_menu" className="menu" to={'/group'}>Group</Link>
        <Link id="image_menu" className="menu" to={'/image'}>Image</Link>
        <Link id="follow_menu" className="menu" to={'/follow'}>Follow</Link>
        <Link id="dietgrpah_menu" className="menu" to={'/dietgraph/'}>DietGraph</Link>
        <Link id="map_menu" className="menu" to={'/map/'}>Map</Link>

      </div>
    </div>
  );
};



export default Header;
