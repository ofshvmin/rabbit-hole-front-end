import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineHome, AiOutlineCompass, AiOutlineUser } from 'react-icons/ai'
import { RiUserFollowLine } from 'react-icons/ri'
import { FiSearch } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'

import logo from '../../assets/RabbitHoleTitle.png'
import styles from './Sidebar.module.css'

import { User } from '../../types/models'

interface SidebarProps {
  user: User | null
  handleLogout: () => void
  onLoginClick: () => void
  isLoginModalOpen: boolean
}

const Sidebar = (props: SidebarProps): JSX.Element => {
  const { user, handleLogout, onLoginClick, isLoginModalOpen } = props
  const [profileClicked, setProfileClicked] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  useEffect(() => {
    if (!isLoginModalOpen) setProfileClicked(false)
  }, [isLoginModalOpen])

  const handleProfileClick = () => {
    setProfileClicked(true)
    onLoginClick()
  }

  const isProfileActive = profileClicked && isLoginModalOpen

  const handleSearchKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && searchQuery.trim()) {
      setIsSearchModalOpen(true)
    }
  }

  return (
    <>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navItem} ${isActive && !isProfileActive ? styles.active : ''}`
            }
          >
            <AiOutlineHome className={styles.navIcon} />
            <span>For You</span>
          </NavLink>

          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive && !isProfileActive ? styles.active : ''}`
            }
          >
            <AiOutlineCompass className={styles.navIcon} />
            <span>Explore</span>
          </NavLink>

          <NavLink
            to="/following"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive && !isProfileActive ? styles.active : ''}`
            }
          >
            <RiUserFollowLine className={styles.navIcon} />
            <span>Following</span>
          </NavLink>

          {user ? (
            <NavLink
              to="/profiles"
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
            >
              <AiOutlineUser className={styles.navIcon} />
              <span>Profile</span>
            </NavLink>
          ) : (
            <button
              className={`${styles.navItem} ${profileClicked && isLoginModalOpen ? styles.active : ''}`}
              onClick={handleProfileClick}
            >
              <AiOutlineUser className={styles.navIcon} />
              <span>Profile</span>
            </button>
          )}

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

    {isSearchModalOpen && (
      <div
        className={styles.searchOverlay}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsSearchModalOpen(false)
            setSearchQuery('')
          }
        }}
      >
        <div className={styles.searchModal}>
          <button
            className={styles.searchCloseBtn}
            onClick={() => { setIsSearchModalOpen(false); setSearchQuery('') }}
          >
            <IoClose />
          </button>
          <p className={styles.searchModalText}>
            Congratulations! You've discovered yet-to-be-implemented functionality. Thank you for exploring my app.
          </p>
        </div>
      </div>
    )}
    </>
  )
}

export default Sidebar
