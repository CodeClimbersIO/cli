declare namespace CodeClimbers {
  export interface User {
    id?: number
    email: string
    firstName?: string
    lastName?: string
    avatarUrl?: string
    createdAt: string
    updatedAt: string
  }
  // same as User but snake case
  export interface UserDB {
    id?: number
    email: string
    first_name?: string
    last_name?: string
    avatar_url?: string
    created_at: string
    updated_at: string
  }
}
