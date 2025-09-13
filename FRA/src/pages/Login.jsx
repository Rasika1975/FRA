import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Map, Shield, Users, Eye } from 'lucide-react'

const LoginPage = () => {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = login(formData.username, formData.password)
    
    if (result.success) {
      // Redirect will be handled by Layout component
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const demoUsers = [
    { username: 'admin', password: 'password', role: 'Administrator', icon: Shield },
    { username: 'officer', password: 'password', role: 'District Officer', icon: Users },
    { username: 'ngo', password: 'password', role: 'NGO Representative', icon: Users },
    { username: 'viewer', password: 'password', role: 'Viewer', icon: Eye }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Branding */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
              <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Map className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">FRA Atlas & DSS</h1>
            </div>
            <p className="text-lg text-gray-600 mb-6">
              Forest Rights Act Atlas & Decision Support System
            </p>
            <p className="text-gray-500">
              A comprehensive platform for managing forest rights claims, 
              providing GIS mapping capabilities, and offering data-driven 
              recommendations for sustainable development.
            </p>
          </div>

          {/* Demo Users */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Users</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {demoUsers.map((user) => (
                <div
                  key={user.username}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors"
                  onClick={() => setFormData({ username: user.username, password: user.password })}
                >
                  <user.icon className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.role}</p>
                    <p className="text-xs text-gray-500">{user.username} / password</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="Enter your username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                  />
                </div>
                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    {error}
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
