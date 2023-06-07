// css
import styles from './Landing.module.css'

//components
import Posting from '../../components/Postings/Postings';

// types
import { User } from '../../types/models'
import { Postings } from '../../components/Postings/Postings'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <main className={styles.container}>

      {user ? 
        <Postings />  

      : 
        <h1>"please log in"</h1> 
      }
    </main>
  )
}

export default Landing
