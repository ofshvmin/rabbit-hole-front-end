// css
import styles from './PostingsList.module.css'

//components
import PostingCard from '../PostingCard/PostingCard';

// types
import { Posting, User } from '../../types/models'


interface PostingsProps {
  user: User;
  postings: Posting[];
  handleDeletePosting: (postingId: number) => Promise<void>;
}

const PostingsList = (props: PostingsProps): JSX.Element => {
  const { user, postings, handleDeletePosting } = props

  if (!postings.length) {
    return <main className={styles.container}><h1>Loading...</h1></main>
  }

  return (
    <section className={styles.container}>
      <h1>Postings</h1>
      {postings.map((posting: Posting) => (
        <PostingCard           
          key={posting.id}
          posting={posting}
          user={user}
          handleDeletePosting={handleDeletePosting}
        />
      ))}
    </section>
  )
}

export default PostingsList 
