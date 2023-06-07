// services
import * as tokenService from './tokenService'

//types
import { Posting } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/postings`

async function getAllPostings(): Promise<Posting[]> {
  const res = await fetch(BASE_URL, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}`},
  })
  console.log(res.json);
    
  return await res.json() as Posting[]
}

async function create(formData): Promise {
  
    const res = await fetch(BASE_URL, {
      method: 'POST', 
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    return res.json()
  
}

export { getAllPostings, create }

