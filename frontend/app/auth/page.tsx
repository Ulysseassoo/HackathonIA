"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { setToken } from "@/lib/auth"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3200';

const Auth = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  const [signupForm, setSignupForm] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      })
      if (!res.ok) {
        const err = await res.json()
        alert(err.message || 'Erreur de connexion')
        setIsLoading(false)
        return
      }
      const data = await res.json()
      setToken(data.access_token)
      queryClient.invalidateQueries({ queryKey: ['user'] })
      router.push('/chat')
    } catch (err) {
      alert('Erreur réseau')
    }
    setIsLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('Les mots de passe ne correspondent pas')
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname: signupForm.fullname,
          email: signupForm.email,
          password: signupForm.password,
        }),
      })
      if (!res.ok) {
        const err = await res.json()
        alert(err.message || 'Erreur lors de l\'inscription')
        setIsLoading(false)
        return
      }
      router.push('/auth')
    } catch (err) {
      alert('Erreur réseau')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 gradient-bg">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-serenity-blue to-serenity-accent rounded-xl flex items-center justify-center absolute top-4 left-4">
              <span className="text-white font-oswald font-bold text-xl">C</span>
            </div>
          </div>
        </div>
        <Card className="glass-effect border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-oswald font-semibold text-serenity-navy">
              Bienvenue
            </CardTitle>
            <CardDescription className="font-varela text-serenity-navy/60">
              Connectez-vous pour utiliser nos services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-serenity-lavender/50">
                <TabsTrigger 
                  value="login"
                  className="font-lato font-medium data-[state=active]:bg-white data-[state=active]:text-serenity-navy"
                >
                  Se connecter
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="font-lato font-medium data-[state=active]:bg-white data-[state=active]:text-serenity-navy"
                >
                  Créer un compte
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-serenity-navy font-lato font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-serenity-navy/40" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="votre@email.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="pl-10 border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-serenity-navy font-lato font-medium">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-serenity-navy/40" />
                      <Input
                        id="login-password"
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Votre mot de passe"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        className="pl-10 pr-10 border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute right-3 top-3 text-serenity-navy/40 hover:text-serenity-navy"
                      >
                        {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-serenity-blue hover:bg-serenity-blue/90 text-white font-lato font-semibold py-3 rounded-xl transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Connexion...' : 'Se connecter'}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-serenity-navy font-lato font-medium">
                      Nom complet
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-serenity-navy/40" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Votre nom complet"
                        value={signupForm.fullname}
                        onChange={(e) => setSignupForm({ ...signupForm, fullname: e.target.value })}
                        className="pl-10 border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-serenity-navy font-lato font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-serenity-navy/40" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="votre@email.com"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                        className="pl-10 border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-serenity-navy font-lato font-medium">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-serenity-navy/40" />
                      <Input
                        id="signup-password"
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Choisissez un mot de passe"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                        className="pl-10 pr-10 border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute right-3 top-3 text-serenity-navy/40 hover:text-serenity-navy"
                      >
                        {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm" className="text-serenity-navy font-lato font-medium">
                      Confirmer le mot de passe
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-serenity-navy/40" />
                      <Input
                        id="signup-confirm"
                        type="password"
                        placeholder="Confirmez votre mot de passe"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                        className="pl-10 border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-serenity-accent hover:bg-serenity-accent/90 text-white font-lato font-semibold py-3 rounded-xl transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Création...' : 'Créer mon compte'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            <div className="mt-6 text-center">
              <p className="text-sm text-serenity-navy/60 font-varela">
                En vous connectant, vous acceptez nos conditions d'utilisation
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Auth 