// css
import styles from './Landing.module.css'

//components
import PostingsList from '../../components/Postings/PostingsList';

// types
import { User, Posting } from '../../types/models'


interface LandingProps {
  user: User | null;
  postings: Posting[];
  handleDeletePosting: (postingId: number) => Promise<void>;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user, postings, handleDeletePosting } = props

  return (
    <main className={styles.container}>

      {user ? 
        <PostingsList
          user={ user }
          postings={ postings }
          handleDeletePosting={ handleDeletePosting }
        />  

      : 
        <h1>"please log in"</h1> 
      }
    </main>
  )
}

export default Landing
