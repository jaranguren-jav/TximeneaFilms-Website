import React from 'react';
import './navigation.scss';
import { Link, withRouter } from 'react-router-dom';

function Navigation({ history }) {
  let menuItems = ['projects', 'contact', 'about'];

  let activePage = history.location.pathname.substring(1) === "" ? "projects" : history.location.pathname.substring(1);

  return (
    <div className="nav">
      {
        menuItems.map(item =>
          <Link
            to={item === "projects" ? "/" : "/" + item}
            className={activePage === item ? 'nav_item nav_item_active' : 'nav_item'}>
            {item.toUpperCase()}
          </Link >)
      }
    </div>
  );
}

export default withRouter(Navigation);
