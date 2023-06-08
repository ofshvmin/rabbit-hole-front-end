import { useEffect, useState } from 'react';

// css
import styles from './PostingsList.module.css'

//components
import PostingCard from '../PostingCard/PostingCard';


import * as postingService from '../../services/postingService'


// types
import { Posting, User } from '../../types/models'
import { json } from 'react-router-dom'


interface PostingsProps {
  user: User;
  postings: Posting[];
  handleDeletePosting: (postingId: number) => Promise<void>;
}

const PostingsList = (props: PostingsProps): JSX.Element => {
  const { user, postings, handleDeletePosting } = props
  // const [postings, setPostings] = useState<Posting[]>([])

  // useEffect((): void => {
  //   const fetchPostings = async (): Promise<void> => {
  //     try {
  //       const postingData: Posting[] = await postingService.getAllPostings()
  //       setPostings(postingData)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   user ? fetchPostings() : setPostings([])
  // }, [user])

  // const handleDeletePosting = (postingId: number): void => {
  //   postingService.delete(postingId)
  //   setPostings(postings.filter(posting => posting.id !== postingId))
  // }

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
          user={user}
          handleDeletePosting={handleDeletePosting}
        />
      ))}
    </section>
  )
}

export default PostingsList 
