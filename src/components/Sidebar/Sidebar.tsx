import { NavLink } from 'react-router-dom'
import { AiOutlineHome, AiOutlineCompass, AiOutlineUser } from 'react-icons/ai'
import { RiUserFollowLine } from 'react-icons/ri'
import { FiSearch } from 'react-icons/fi'

import logo from '../../assets/RabbitHoleTitle.png'
import styles from './Sidebar.module.css'

import { User } from '../../types/models'

interface SidebarProps {
  user: User | null
  handleLogout: () => void
  onLoginClick: () => void
}

const Sidebar = (props: SidebarProps): JSX.Element => {
  const { user, handleLogout, onLoginClick } = props

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <NavLink to="/">
          <img src={logo} alt="RabbitHole" className={styles.logo} />
        </NavLink>

        <div className={styles.searchBar}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
            readOnly
          />
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <AiOutlineHome className={styles.navIcon} />
            <span>For You</span>
          </NavLink>

          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <AiOutlineCompass className={styles.navIcon} />
            <span>Explore</span>
          </NavLink>

          <NavLink
            to="/following"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <RiUserFollowLine className={styles.navIcon} />
            <span>Following</span>
          </NavLink>

          <NavLink
            to="/profiles"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <AiOutlineUser className={styles.navIcon} />
            <span>Profile</span>
          </NavLink>

          {user ? (
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <button className={styles.loginBtn} onClick={onLoginClick}>
              Log in
            </button>
          )}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
