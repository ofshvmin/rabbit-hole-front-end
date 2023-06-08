//css
import styles from './AuthorInfo.module.css'

interface AuthorInfoProps {
  profile: {
    id: number;
    name: string;
    photo: string;
  }
}


const AuthorInfo = (props: AuthorInfoProps) => {
  const { profile } = props

console.log(props);


  return (
    <div className={styles.container}>
      <p></p>
      <img src={profile.photo} alt="The user's profile photo" />
      <section>
        <h4> {profile.name} </h4>
      </section>

    </div>
  )
}

export default AuthorInfo

{/* <img 
            src={profile.photo ? profile.photo : defaultPic} 
            alt={`${profile.name}'s avatar`} 
          /> */}