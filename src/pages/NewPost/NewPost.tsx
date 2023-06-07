// npm modules
import { FormEvent, ReactEventHandler, useState } from "react"

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

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    console.log(formData);
    handleAddPost(formData)
  }

  const handleAddPost = async (postFormData: PostingFormData) => {
    const newPost = await postingService.create(postFormData)
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
          type="text"
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

export default NewPost