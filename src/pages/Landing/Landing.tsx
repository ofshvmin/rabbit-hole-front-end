//assets
import rabbithole from '../../assets/RabbitHoleTitle.png'

// css
import styles from './Landing.module.css'

//components
import PostingsList from '../../components/Postings/PostingsList';
import LoginPage from '../Login/Login';

// types
import { User, Posting } from '../../types/models'
import { AuthPageProps } from '../../types/props';

interface LandingProps {
  user: User | null;
  handleAuthEvt: () => void;
  postings: Posting[];
  
  handleDeletePosting: (postingId: number) => Promise<void>;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user, postings, handleAuthEvt, handleDeletePosting } = props

  return (
    <main className={styles.container}>

      {user ? 
        <PostingsList
          user={ user }
          postings={ postings }
          handleDeletePosting={ handleDeletePosting }
        />  

      : 
        <>
          <img src={rabbithole} alt="" />
          <LoginPage handleAuthEvt={handleAuthEvt}/>

        </>

      }
    </main>
  )
}

export default Landing
