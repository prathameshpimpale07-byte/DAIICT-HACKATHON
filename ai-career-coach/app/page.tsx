"use client"

import Image from 'next/image'
import { SignInButton, UserButton, useUser  } from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image src={'/logo1.png'} alt="logo" width={180} height={180} className="h-10 w-auto" />
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium">
                How it Works
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium">
                Pricing
              </a>
            </div>

            <div className="flex items-center gap-4">
              {!user ? (
                <SignInButton mode='modal' signUpForceRedirectUrl={'/dashboard'}>
                  <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Get Started Free
                  </button>
                </SignInButton>
              ) : (
                <div className="flex items-center gap-3">
                  <a href="/dashboard" className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
                    Dashboard
                  </a>
                  <UserButton />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    
    
    </div>

  )


};