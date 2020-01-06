import React from 'react';
import styles from './navbar.module.css';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className={styles.navBar}>
      <NavLink
        className={styles.link}
        activeClassName={styles.active}
        exact
        to='/'>
        Inicio
      </NavLink>
      <NavLink
        className={styles.link}
        activeClassName={styles.active}
        to='/favs'>
        Favoritos
      </NavLink>
      <NavLink
        className={styles.link}
        activeClassName={styles.active}
        to='/login'>
        Login
      </NavLink>
    </div>
  );
};
