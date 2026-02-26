import { useState, useRef } from 'react'
import { FaFacebook, FaApple } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { IoClose, IoArrowBack } from 'react-icons/io5'

import * as authService from '../../services/authService'
import styles from './SignupModal.module.css'

import { SignupFormData, PhotoFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  handleAuthEvt: () => void
  onSwitchToLogin: () => void
}

const SignupModal = (props: SignupModalProps): JSX.Element | null => {
  const { isOpen, onClose, handleAuthEvt, onSwitchToLogin } = props
  const imgInputRef = useRef<HTMLInputElement | null>(null)

  const [step, setStep] = useState(1)
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  })
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null,
  })

  const resetState = () => {
    setStep(1)
    setMessage('')
    setIsSubmitted(false)
    setFormData({ name: '', email: '', password: '', passwordConf: '' })
    setPhotoData({ photo: null })
    if (imgInputRef.current) imgInputRef.current.value = ''
  }

  const handleClose = () => {
    resetState()
    onClose()
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return
    const file = evt.target.files[0]
    let isFileInvalid = false
    let errMsg = ''
    const validFormats = ['gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']
    const photoFormat = file.name.split('.').at(-1)

    if (file.size >= 10485760) {
      errMsg = 'Image must be smaller than 10.4MB'
      isFileInvalid = true
    }
    if (photoFormat && !validFormats.includes(photoFormat)) {
      errMsg = 'Image must be in gif, jpeg/jpg, png, svg, or webp format'
      isFileInvalid = true
    }

    setMessage(errMsg)

    if (isFileInvalid && imgInputRef.current) {
      imgInputRef.current.value = ''
      return
    }

    setPhotoData({ photo: evt.target.files[0] })
  }

  const handleSubmit = async (): Promise<void> => {
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      setIsSubmitted(true)
      await authService.signup(formData, photoData)
      handleAuthEvt()
      handleClose()
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
      setIsSubmitted(false)
    }
  }

  const handleSkip = async (): Promise<void> => {
    setPhotoData({ photo: null })
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      setIsSubmitted(true)
      await authService.signup(formData, { photo: null })
      handleAuthEvt()
      handleClose()
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
      setIsSubmitted(false)
    }
  }

  const handleOverlayClick = (evt: React.MouseEvent<HTMLDivElement>): void => {
    if (evt.target === evt.currentTarget) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={handleClose}>
          <IoClose />
        </button>

        {step > 1 && (
          <button
            className={styles.backBtn}
            onClick={() => { setMessage(''); setStep(step - 1) }}
          >
            <IoArrowBack />
          </button>
        )}

        {message && <p className={styles.message}>{message}</p>}

        {step === 1 && (
          <>
            <h2 className={styles.title}>Sign up for RabbitHole</h2>
            <div className={styles.methodButtons}>
              <button
                className={styles.methodBtn}
                onClick={() => setStep(2)}
              >
                Use email / username
              </button>
            </div>
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
              Already have an account?{' '}
              <span
                className={styles.switchLink}
                onClick={() => { resetState(); onSwitchToLogin() }}
              >
                Log in
              </span>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className={styles.title}>Create your account</h2>
            <div className={styles.form}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
              <button
                className={styles.submitBtn}
                disabled={!(formData.name && formData.email)}
                onClick={() => { setMessage(''); setStep(3) }}
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className={styles.title}>Create a password</h2>
            <div className={styles.form}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="password"
                name="passwordConf"
                placeholder="Confirm password"
                value={formData.passwordConf}
                onChange={handleChange}
                className={styles.input}
              />
              <button
                className={styles.submitBtn}
                disabled={!(formData.password && formData.password === formData.passwordConf)}
                onClick={() => { setMessage(''); setStep(4) }}
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className={styles.title}>Add a profile photo</h2>
            <div className={styles.form}>
              <input
                type="file"
                name="photo"
                onChange={handleChangePhoto}
                ref={imgInputRef}
                className={styles.fileInput}
              />
              <button
                className={styles.submitBtn}
                disabled={isSubmitted}
                onClick={handleSubmit}
              >
                {!isSubmitted ? 'Sign up' : 'Sending...'}
              </button>
              <span
                className={styles.skipLink}
                onClick={!isSubmitted ? handleSkip : undefined}
              >
                Skip
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SignupModal
