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
        <Link id="login_menu" className="menu" to={'/login'}>마이페이지</Link>
        <Link id="timeline_menu" className="menu" to={'/timeline'}>타임라인</Link>
        <Link id="wall_menu" className="menu" to={'/wall'}>담벼락</Link>
        <Link id="group_menu" className="menu" to={'/group'}>그룹</Link>
        <Link id="image_menu" className="menu" to={'/image'}>갤러리</Link>
        <Link id="follow_menu" className="menu" to={'/follow'}>팔로우</Link>
        <Link id="dietgrpah_menu" className="menu" to={'/dietgraph/'}>그래프</Link>
        <Link id="map_menu" className="menu" to={'/map/'}>지도</Link>

      </div>
    </div>
  );
};



export default Header;
