// npm moduesl
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

// css
import styles from './EditPosting.module.css'

//components
// import Postings from '../../components/Postings/Postings';

// types
import { PostingFormData } from '../../types/forms'


interface EditPostingProps {
  handleUpdatePosting: (postingFormData: PostingFormData) => Promise<void>
}


const EditPosting = (props: EditPostingProps): JSX.Element => {
  const location = useLocation()
  const [formData, setFormData] = useState(location.state)
  const { handleUpdatePosting } = props

  console.log("this is location:", location);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
    console.log("FORM DATA", formData);
  }

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    console.log('submit the form data');
    console.log("FORM DATA", formData);
    handleUpdatePosting(formData)
    
  }



  return (
      <main className={styles.container}>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="title-input">Title</label>
          <input
            required
            type="text"
            name="title"
            id="title-input"
            value={formData.title}
            placeholder="Title"
            onChange={handleChange}
          /> */}
          <label htmlFor="text-input">Text</label>
          <textarea
            required
            name="text"
            id="text-input"
            value={formData.text}
            placeholder="Text"
            onChange={handleChange}
          />
          {/* <label htmlFor="category-input">Category</label>
          <select
            required
            name="category"
            id="category-input"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="News">News</option>
            <option value="Games">Games</option>
            <option value="Music">Music</option>
            <option value="Movies">Movies</option>
            <option value="Sports">Sports</option>
            <option value="Television">Television</option>
          </select> */}
          <button type="submit">SUBMIT</button>
        </form>
      </main>
  )
}

export default EditPosting
