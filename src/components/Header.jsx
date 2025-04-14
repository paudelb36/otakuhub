'use client'

import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"

const Header = () => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  // Check if the user is logged in
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login') // Redirect after logout
  }

  return (
    <nav className="bg-purple-500 p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center">
          <img className="w-10 h-10" src="/naruto-favicon.png" alt="logo" />
          <Link href="/" className="text-white text-2xl font-semibold">
          OtakuHub
        </Link>

        </div>
        
        <div className="space-x-6">
          {user ? (
            <>
              <Link href="/dashboard" className="text-white">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white">Login</Link>
              <Link href="/register" className="text-white">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
