// css
import styles from './Postings.module.css'

//components
//postingCard

// types
import { Posting } from '../../types/models'

interface PostingsProps {
  postings: Posting[];
  // handleVote: (formData: VoteManagerFormData) => Promise<void>;
}

const Postings = (props: PostingsProps): JSX.Element => {
  const { postings } = props

  if (!postings.length) {
    return <main className={styles.container}><h1>Loading...</h1></main>
  }

  return (
    <main className={styles.container}>
      {postings.map((posting: Posting) => (
        <PostingCard 
          key={...}
          posting={posting}
        />
      ))}
    </main>
  )
}

export default Postings
