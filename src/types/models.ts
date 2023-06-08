/* ---------===== custom models ====--------- */

export interface Posting {
  id: number;
  creatorId: number;
  numOfLikes: number;
  text: string;
  profile: {
    id: number;
    name: string;
    photo: string;
  }
}


/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}
