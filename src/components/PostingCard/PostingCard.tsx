// assets
// import defaultPic from "../../assets/icons/profile.png"

// components
// import VoteManager from "../VoteManager/VoteManager"

// types
import { Posting } from "../../types/models"
import { VoteManagerFormData } from "../../types/forms"

interface PostingCardProps {
  posting: Posting;
  // handleVote: (formData: VoteManagerFormData) => Promise<void>;
}

const PostingCard = (props: PostingCardProps): JSX.Element => {
  const { posting } = props

  return (

    <article>
      {/* <img 
        src={profile.photo ? profile.photo : defaultPic} 
        alt={`${profile.name}'s avatar`} 
      /> */}
      <h1>{posting.text}</h1>
      {/* <VoteManager { ...props } /> */}
    </article>
  )
}

export default PostingCard