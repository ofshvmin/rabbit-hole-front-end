// npm modules
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// css
import styles from './NewPost.module.css'

//services
import * as postingService from '../../services/postingService'

//types
import { PostingFormData } from "../../types/forms"


const NewPost = (): JSX.Element => {
  const [formData, setFormData ] = useState({
    text: '',
  })
  const navigate = useNavigate()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    console.log(formData);
    handleAddPost(formData)
  }

  const handleAddPost = async (postFormData: PostingFormData) => {
    await postingService.create(postFormData)
    navigate('/')
  }

  return (
    <main className={styles.container}>
      <div>
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
      </div>
    </main>
  )
}

export default NewPost