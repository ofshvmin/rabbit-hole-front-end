// css
import styles from './Landing.module.css'

//components
import Postings from '../../components/Postings/Postings';

// types
import { User } from '../../types/models'
import { Posting } from '../../types/models';


interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <main className={styles.container}>

      {user ? 
        <Postings 
          user={ user}
        />  

      : 
        <h1>"please log in"</h1> 
      }
    </main>
  )
}

export default Landing
