// npm modules
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import NewPost from './pages/NewPost/NewPost'
import EditPosting from './pages/EditPosting/EditPosting'

// components
import Sidebar from './components/Sidebar/Sidebar'
import LoginModal from './components/LoginModal/LoginModal'
import SignupModal from './components/SignupModal/SignupModal'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as postingService from './services/postingService'


// styles
import './App.css'

// types
import { User, Posting } from './types/models'
import { PostingFormData } from './types/forms'



function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [postings, setPostings] = useState<Posting[]>([])
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const navigate = useNavigate()

  // Initialize Facebook SDK
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v18.0',
      })
    }
    const fbScript = document.createElement('script')
    fbScript.src = 'https://connect.facebook.net/en_US/sdk.js'
    fbScript.async = true
    fbScript.defer = true
    document.body.appendChild(fbScript)
  }, [])

  // Initialize Apple Sign In SDK
  useEffect(() => {
    const appleScript = document.createElement('script')
    appleScript.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js'
    appleScript.async = true
    appleScript.onload = () => {
      if (window.AppleID && import.meta.env.VITE_APPLE_CLIENT_ID) {
        window.AppleID.auth.init({
          clientId: import.meta.env.VITE_APPLE_CLIENT_ID,
          scope: 'name email',
          redirectURI: import.meta.env.VITE_APPLE_REDIRECT_URI,
          usePopup: true,
        })
      }
    }
    document.head.appendChild(appleScript)
  }, [])

  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }



  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  useEffect((): void => {
    const fetchPostings = async (): Promise<void> => {
      try {
        const postingData: Posting[] = await postingService.getAllPostings()
        setPostings(postingData)
      } catch (error) {
        console.log(error)
      }
    }
    user ? fetchPostings() : setPostings([])
  }, [user])

  const handleDeletePosting = async (postingId: number): Promise<void> => {
    postingService.delete(postingId)
    setPostings(postings.filter(posting => posting.id !== postingId))
  }

  const handleUpdatePosting = async (postingFormData: PostingFormData): Promise<void> => {
    const updatedPosting = await postingService.update(postingFormData)
    setPostings(postings.map(p => postingFormData.id === p.id ? updatedPosting : p))
  }

  const handleModalAuthEvt = (): void => {
    handleAuthEvt()
    setIsLoginModalOpen(false)
    setIsSignupModalOpen(false)
  }

  const switchToSignup = (): void => {
    setIsLoginModalOpen(false)
    setIsSignupModalOpen(true)
  }

  const switchToLogin = (): void => {
    setIsSignupModalOpen(false)
    setIsLoginModalOpen(true)
  }

  return (
    <>
      <Sidebar
        user={user}
        handleLogout={handleLogout}
        onLoginClick={() => setIsLoginModalOpen(true)}
        isLoginModalOpen={isLoginModalOpen}
      />
      <main className="mainContent">
        <Routes>
          <Route
            path="/"
            element={<Landing
              user={user}
              postings={postings}
              handleAuthEvt={handleAuthEvt}
              handleDeletePosting={handleDeletePosting}
            />}
          />
          <Route
            path="/profiles"
            element={
              <ProtectedRoute user={user}>
                <Profiles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/new"
            element={
              <ProtectedRoute user={user}>
                <NewPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:postId/edit"
            element={
              <ProtectedRoute user={user}>
                <EditPosting
                  handleUpdatePosting={handleUpdatePosting}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/signup"
            element={<Signup handleAuthEvt={handleAuthEvt} />}
          />
          <Route
            path="/auth/login"
            element={<Login handleAuthEvt={handleAuthEvt} />}
          />
          <Route
            path="/auth/change-password"
            element={
              <ProtectedRoute user={user}>
                <ChangePassword handleAuthEvt={handleAuthEvt} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        handleAuthEvt={handleModalAuthEvt}
        onSwitchToSignup={switchToSignup}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        handleAuthEvt={handleModalAuthEvt}
        onSwitchToLogin={switchToLogin}
      />
    </>
  )
}

export default App
