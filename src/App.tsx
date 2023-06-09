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
import NavBar from './components/NavBar/NavBar'
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
  const navigate = useNavigate()
  
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



  // return (
  //   <main className={styles.container}>

  //     {user ? 
  //       <PostingsList
  //         user={ user }
  //         postings={ postings }
  //         handleDeletePosting={ handleDeletePosting }
  //       />  

  //     : 
  //       <>
  //         <img src={rabbithole} alt="" />
  //       </>

  //     }
  //   </main>
  return (
    <>
        {user ?
    <NavBar user={user} handleLogout={handleLogout} />

        :
        // <Landing />
        <h1></h1>
    
  }
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

    </>
  )
}

export default App
