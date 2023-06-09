// npm modules
import { Link } from "react-router-dom"

// css
import styles from './PostingCard.module.css'

// components
import AuthorInfo from "../AuthorInfo/AuthorInfo";

// types
import { Posting, User } from "../../types/models"


interface PostingCardProps {
  posting: Posting;
  user: User;
  handleDeletePosting: (postingId: number) => void;
}

const PostingCard = (props: PostingCardProps): JSX.Element => {
  const { posting, user, handleDeletePosting } = props

  
  
  
  return (
    
    <article className={styles.container}>
        <header>
          <AuthorInfo profile={posting.profile}/>
          {/* <img 
            src={profile.photo ? profile.photo : defaultPic} 
            alt={`${profile.name}'s avatar`} 
          /> */}
          
          {/* <VoteManager { ...props } /> */}
        </header>
        <div className={styles.div}>
          <p>{posting.text}</p>
        </div>
      {posting.creatorId === user.id ? 
        <span>
              <Link to={`/posts/${posting.id}/edit`} state={posting}>Edit</Link>
              <button onClick={() => handleDeletePosting(posting.id)}>
                Delete
              </button>
        </span>
        :
        <span></span>
      }
    </article>
    
  )
}

export default PostingCard