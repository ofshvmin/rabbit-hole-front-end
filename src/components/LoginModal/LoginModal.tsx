import { useState } from 'react'
import jwt_decode from 'jwt-decode'
import { FaFacebook, FaApple } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { GoogleLogin } from '@react-oauth/google'

import * as authService from '../../services/authService'
import styles from './LoginModal.module.css'

import { LoginFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  handleAuthEvt: () => void
  onSwitchToSignup: () => void
}

const LoginModal = (props: LoginModalProps): JSX.Element | null => {
  const { isOpen, onClose, handleAuthEvt, onSwitchToSignup } = props

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      await authService.login(formData)
      handleAuthEvt()
      onClose()
      setFormData({ email: '', password: '' })
      setMessage('')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
    }
  }

  const isFormInvalid = (): boolean => {
    return !(formData.email && formData.password)
  }

  const handleOverlayClick = (evt: React.MouseEvent<HTMLDivElement>): void => {
    if (evt.target === evt.currentTarget) {
      onClose()
    }
  }

  // Facebook OAuth
  const handleFacebookLogin = (): void => {
    if (!window.FB) {
      setMessage('Facebook SDK not loaded. Please try again.')
      return
    }
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          authService
            .facebookOAuth({ accessToken: response.authResponse.accessToken })
            .then(() => {
              handleAuthEvt()
              onClose()
              setFormData({ email: '', password: '' })
              setMessage('')
            })
            .catch((err) => handleErrMsg(err, setMessage))
        } else {
          setMessage('Facebook sign-in was cancelled or failed.')
        }
      },
      { scope: 'email,public_profile' },
    )
  }

  // Apple Sign In
  const handleAppleLogin = async (): Promise<void> => {
    try {
      if (!window.AppleID) {
        setMessage('Apple Sign In not loaded. Please try again.')
        return
      }
      const data = await window.AppleID.auth.signIn()
      await authService.appleOAuth({
        idToken: data.authorization.id_token,
        code: data.authorization.code,
      })
      handleAuthEvt()
      onClose()
      setFormData({ email: '', password: '' })
      setMessage('')
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'error' in err && err.error === 'popup_closed_by_user') {
        return
      }
      console.log(err)
      handleErrMsg(err, setMessage)
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <IoClose />
        </button>

        <h2 className={styles.title}>Log in to RabbitHole</h2>

        {message && <p className={styles.message}>{message}</p>}

        <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isFormInvalid()}
          >
            Log in
          </button>
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <div className={styles.socialButtons}>
          <button className={styles.socialBtn} onClick={handleFacebookLogin}>
            <FaFacebook className={styles.fbIcon} />
            <span>Continue with Facebook</span>
          </button>
          <GoogleLogin
            useOneTap={false}
            text="continue_with"
            onSuccess={async (credentialResponse) => {
              try {
                if (!credentialResponse.credential) throw new Error('No credential')
                const { name, email } = jwt_decode<{ name: string; email: string }>(credentialResponse.credential)
                await authService.googleOAuth({ idToken: credentialResponse.credential, name, email })
                handleAuthEvt()
                onClose()
                setFormData({ email: '', password: '' })
                setMessage('')
              } catch (err) {
                console.log(err)
                handleErrMsg(err, setMessage)
              }
            }}
            onError={() => setMessage('Google sign-in failed.')}
          />
          <button className={styles.socialBtn} onClick={handleAppleLogin}>
            <FaApple />
            <span>Continue with Apple</span>
          </button>
        </div>

        <div className={styles.footer}>
          Don't have an account?{' '}
          <span className={styles.signupLink} onClick={onSwitchToSignup}>
            Sign up
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
