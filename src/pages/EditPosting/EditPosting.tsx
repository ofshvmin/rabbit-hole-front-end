// npm moduesl
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

// css
import styles from './EditPosting.module.css'

//components
// import Postings from '../../components/Postings/Postings';

// types
// import { User } from '../../types/models'
// import { Posting } from '../../types/models';


// interface EditPostingProps {
//   // user: User | null;
// }

// props: EditPostingProps

const EditPosting = (): JSX.Element => {
  const location = useLocation()
  const [formData, setFormData] = useState(location.state)

  console.log(location);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({...FormData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    console.log('submit the form data');
    
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
