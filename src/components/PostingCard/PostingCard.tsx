// npm modules
import { Link } from "react-router-dom"

// assets
// import defaultPic from "../../assets/icons/profile.png"

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
    
    <article>
        <header>
          <AuthorInfo profile={posting.profile}/>
          {/* <img 
            src={profile.photo ? profile.photo : defaultPic} 
            alt={`${profile.name}'s avatar`} 
          /> */}
          
          {/* <VoteManager { ...props } /> */}
        </header>
        <p>{posting.text}</p>
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