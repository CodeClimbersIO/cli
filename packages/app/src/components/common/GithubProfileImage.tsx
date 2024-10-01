import { useState, useEffect } from 'react'
import { Avatar, Skeleton, Typography } from '@mui/material'

interface Props {
  url: string
  size?: number
}

interface Profile {
  avatar_url: string
  login: string
}

export const GitHubProfileImage = ({ url, size = 60 }: Props) => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Extract username from URL
        const username = url.split('/').pop()
        const response = await fetch(`https://api.github.com/users/${username}`)
        if (!response.ok) {
          throw new Error('Failed to fetch profile')
        }
        const data = await response.json()
        setProfile(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      }
    }

    fetchProfile()
  }, [url])

  if (error) {
    return <Typography color="error">Error: {error}</Typography>
  }

  if (!profile) {
    return <Skeleton variant="circular" width={size} height={size} />
  }

  return (
    <Avatar
      src={profile.avatar_url}
      alt={profile.login}
      sx={{ width: size, height: size }}
    />
  )
}
