import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('fra_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (username, password) => {
    // Mock authentication - replace with actual API call
    const mockUsers = {
      'admin': { id: 1, username: 'admin', role: 'admin', name: 'Administrator' },
      'officer': { id: 2, username: 'officer', role: 'district_officer', name: 'District Officer' },
      'ngo': { id: 3, username: 'ngo', role: 'ngo', name: 'NGO Representative' },
      'viewer': { id: 4, username: 'viewer', role: 'viewer', name: 'Viewer' }
    }

    if (mockUsers[username] && password === 'password') {
      const userData = mockUsers[username]
      setUser(userData)
      localStorage.setItem('fra_user', JSON.stringify(userData))
      return { success: true, user: userData }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('fra_user')
  }

  const value = {
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuthContext = () => useContext(AuthContext)
