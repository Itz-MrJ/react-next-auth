import React, { useState } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import styles from '../../styles/navbar.module.css';

const Menu = () => (
  <>
    <p><a href="/home">Home</a></p>
    {/* <p><a href="#cart">Cart</a></p> */}
  </>
)

const AuthBtn = () => (
  <>
    <p onClick={() => {
      localStorage.setItem('username', null);
      localStorage.setItem('exp', null);
      localStorage.setItem('userToken', null);
      location.replace('/authentication');
    }}>Log out</p>
    {/* <button type='button'>Sign Up</button> */}
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className={styles.navbar__main}>
      <div className={styles.navbar__main_links}>
        <div className={styles.navbar__main_logo}>
          <h1>Trixie</h1>
        </div>
        <div className={styles.navbar__main_links_container}>
          <Menu />
        </div>
      </div>
      <div className={styles.navbar__main_sign}>
        <AuthBtn />
      </div>
      <div className={styles.navbar__main_menu}>
        {toggleMenu
          ? <RiCloseLine color='#fff' size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color='#fff' size={27} onClick={() => setToggleMenu(true)} />
        }

        {toggleMenu && (
          <div className={[styles.navbar__main_menu_container, styles.scale_up_center].join(" ")}>
            <div className={styles.navbar__main_menu_container_links}>
              <Menu />
              <div className={styles.navbar__main_menu_container_links_sign}>
                <AuthBtn />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar