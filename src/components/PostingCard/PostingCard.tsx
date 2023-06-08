// npm modules
import { Link } from "react-router-dom"

// assets
// import defaultPic from "../../assets/icons/profile.png"

// components
// import VoteManager from "../VoteManager/VoteManager"

// types
import { Posting, User } from "../../types/models"


interface PostingCardProps {
  posting: Posting;
  user: User;
  handleDeletePosting: (postingId: number) => void;
}

const PostingCard = (props: PostingCardProps): JSX.Element => {
  const { posting, user, handleDeletePosting } = props
  console.log("USER", user);
  console.log(posting);
  console.log(posting.creatorId === user.profile.id);
  
  
  return (
    
    <article>
        <header>
          {/* <img 
            src={profile.photo ? profile.photo : defaultPic} 
            alt={`${profile.name}'s avatar`} 
          /> */}
          
          {/* <VoteManager { ...props } /> */}
        </header>
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
        <p>{posting.text}</p>
    </article>
    
  )
}

export default PostingCard