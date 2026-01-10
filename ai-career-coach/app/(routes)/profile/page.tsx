import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const Profile = () => {
  return (
    <div className='ml-48'>
      <UserProfile />
    </div>
  )
}

export default Profile
