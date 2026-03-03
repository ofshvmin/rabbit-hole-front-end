//css
import styles from './AuthorInfo.module.css'
import default_user_image from '../../assets/default_user_image.png'

interface AuthorInfoProps {
  profile: {
    id: number;
    name: string;
    photo: string;
  }
}


const AuthorInfo = (props: AuthorInfoProps) => {
  const { profile } = props

  return (
    <div className={styles.container}>
      <p></p>
      {/* <img src={profile.photo} alt="The user's profile photo" /> */}
      <img 
                  src={profile.photo ? profile.photo : default_user_image} 
                  alt={`${profile.name}'s avatar`} 
                /> 
      <section>
        <h4> {profile.name} </h4>
      </section>

    </div>
  )
}

export default AuthorInfo
