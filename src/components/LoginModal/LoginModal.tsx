import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaApple } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { IoClose } from 'react-icons/io5'

import * as authService from '../../services/authService'
import styles from './LoginModal.module.css'

import { LoginFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  handleAuthEvt: () => void
}

const LoginModal = (props: LoginModalProps): JSX.Element | null => {
  const { isOpen, onClose, handleAuthEvt } = props

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
          <button className={styles.socialBtn}>
            <FaFacebook className={styles.fbIcon} />
            <span>Continue with Facebook</span>
          </button>
          <button className={styles.socialBtn}>
            <FcGoogle />
            <span>Continue with Google</span>
          </button>
          <button className={styles.socialBtn}>
            <FaApple />
            <span>Continue with Apple</span>
          </button>
        </div>

        <div className={styles.footer}>
          Don't have an account?{' '}
          <Link to="/auth/signup" className={styles.signupLink} onClick={onClose}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
