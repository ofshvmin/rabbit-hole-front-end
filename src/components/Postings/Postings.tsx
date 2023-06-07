import { useEffect, useState } from 'react';

// css
import styles from './Postings.module.css'

//components
import PostingCard from '../PostingCard/PostingCard';


import * as postingService from '../../services/postingService'


// types
import { Posting, User } from '../../types/models'
import { json } from 'react-router-dom'




interface PostingsProps {
  user: User
  // handleVote: (formData: VoteManagerFormData) => Promise<void>;
}

const Postings = (props: PostingsProps): JSX.Element => {
  const { user } = props
  const [postings, setPostings] = useState<Posting[]>([])

  useEffect((): void => {
    const fetchPostings = async (): Promise<void> => {
      try {
        const postingData: Posting[] = await postingService.getAllPostings()
        setPostings(postingData)
      } catch (error) {
        console.log(error)
      }
    }
    user ? fetchPostings() : setPostings([])
  }, [user])

  if (!postings.length) {
    return <main className={styles.container}><h1>Loading...</h1></main>
  }

  console.log( postings );
  

  return (
    <section className={styles.container}>
      <h1>Postings</h1>
      {postings.map((posting: Posting) => (
        <PostingCard           
          key={posting.id}
          posting={posting}
        />
      ))}
    </section>
  )
}

export default Postings
