import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { openSignIn } = useClerk()

  return (
    <div className='fixed z-50 w-full backdrop-blur-2xl bg-white/70 flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 shadow-md'>
      <img
        className='w-32 sm:w-44 cursor-pointer'
        src={assets.logo}
        alt="logo"
        onClick={() => navigate('/')}
      />

      {user ? (
        <UserButton />
      ) : (
        <button
          onClick={() => openSignIn()}
          className='flex items-center gap-2 rounded-full text-sm bg-primary text-white px-10 py-2.5 hover:bg-primary/90 transition'
        >
          Get Started <ArrowRight className='w-4 h-4' />
        </button>
      )}
    </div>
  )
}

export default Navbar
