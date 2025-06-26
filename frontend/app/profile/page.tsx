"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { User, Bot, Plus, Link, Tags, Trash2, Edit, Camera, Save } from 'lucide-react'
import { useAuthContext } from "@/components/AuthProvider"
import { useAgents, CreateAgentData } from "@/hooks/useAgents"
import { useProfile, UpdateProfileData } from "@/hooks/useProfile"
import Header from '@/components/Header'

const Profile = () => {
  const { user, isAuthenticated } = useAuthContext()
  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState("profile")
  const [isAddingAgent, setIsAddingAgent] = useState(false)
  const [isEditingAgent, setIsEditingAgent] = useState(false)
  const [editingAgent, setEditingAgent] = useState<CreateAgentData & { id: string } | null>(null)
  const [newSkill, setNewSkill] = useState('')

  const { agents, isLoading: agentsLoading, createAgent, deleteAgent, updateAgent, isCreating, isDeleting } = useAgents()
  const { updateProfile, isUpdating } = useProfile()

  const [newAgent, setNewAgent] = useState<CreateAgentData>({
    name: '',
    description: '',
    tags: [],
    link: ''
  })

  const [profile, setProfile] = useState<UpdateProfileData>({
    fullname: '',
    bio: '',
    isServiceProvider: false,
    pricePerDay: 0,
    skills: []
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (user) {
      setProfile({
        fullname: user.fullname || '',
        bio: user.bio || '',
        isServiceProvider: user.isServiceProvider || false,
        pricePerDay: user.pricePerDay || 0,
        skills: user?.skills || []
      })
    }
  }, [user])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-serenity-light py-6 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-serenity-blue mx-auto mb-4"></div>
          <p className="text-serenity-navy font-varela">Redirection...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-serenity-light py-6 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-serenity-blue mx-auto mb-4"></div>
          <p className="text-serenity-navy font-varela">Chargement du profil...</p>
        </div>
      </div>
    )
  }

  const handleAddAgent = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newAgent.name || !newAgent.description || !newAgent.link) {
      return
    }

    createAgent(newAgent)
    setNewAgent({ name: '', description: '', tags: [], link: '' })
    setIsAddingAgent(false)
  }

  const handleRemoveAgent = (id: string) => {
    deleteAgent(id)
  }

  const handleEditAgent = (agent: any) => {
    setEditingAgent({
      id: agent.id,
      name: agent.name,
      description: agent.description || '',
      tags: agent.tags || [],
      link: agent.link
    })
    setIsEditingAgent(true)
  }

  const handleUpdateAgent = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editingAgent || !editingAgent.name || !editingAgent.description || !editingAgent.link) {
      return
    }

    const { id, ...agentData } = editingAgent
    updateAgent({ agentId: id, data: agentData })
    setIsEditingAgent(false)
    setEditingAgent(null)
  }

  const addSkill = () => {
    if (newSkill && profile.skills && !profile.skills.includes(newSkill)) {
      setProfile(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill]
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills?.filter(skill => skill !== skillToRemove) || []
    }))
  }

  const handleSaveProfile = () => {
    if (!user?.id) return
    
    updateProfile({
      userId: user.id,
      data: profile
    })
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-serenity-light py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-oswald font-bold text-serenity-navy mb-2">
              Mon Profil
            </h1>
            <p className="text-base font-lato text-serenity-navy/70">
              Gérez votre profil et vos agents IA
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md bg-white border border-serenity-lavender/30">
              <TabsTrigger 
                value="profile"
                className="font-lato font-medium data-[state=active]:bg-serenity-blue data-[state=active]:text-white"
              >
                <User className="w-4 h-4 mr-2" />
                Mon Profil
              </TabsTrigger>
              <TabsTrigger 
                value="agents"
                className="font-lato font-medium data-[state=active]:bg-serenity-blue data-[state=active]:text-white"
              >
                <Bot className="w-4 h-4 mr-2" />
                Mes Agents IA
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card className="glass-effect border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-oswald font-semibold text-serenity-navy">
                    Profil Utilisateur
                  </CardTitle>
                  <CardDescription className="font-varela">
                    Présentez-vous aux autres utilisateurs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-serenity-accent to-purple-500 rounded-2xl flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <Button variant="outline" className="border-serenity-blue text-serenity-blue hover:bg-serenity-blue hover:text-white mb-2">
                        <Camera className="w-4 h-4 mr-2" />
                        Changer la photo
                      </Button>
                      <p className="text-sm text-serenity-navy/60 font-varela">
                        Formats acceptés: JPG, PNG (max. 5MB)
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-serenity-navy font-lato font-medium">Nom complet</Label>
                      <Input
                        value={profile.fullname}
                        onChange={(e) => setProfile({...profile, fullname: e.target.value})}
                        className="border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-serenity-navy font-lato font-medium">Email</Label>
                      <Input
                        value={user?.email}
                        disabled
                        className="border-serenity-lavender/50 bg-gray-50 font-varela"
                      />
                      <p className="text-xs text-serenity-navy/60">L'email ne peut pas être modifié</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-serenity-navy font-lato font-medium">Statut prestataire</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isServiceProvider"
                          checked={profile.isServiceProvider}
                          onChange={(e) => setProfile({...profile, isServiceProvider: e.target.checked})}
                          className="rounded border-serenity-lavender/50"
                        />
                        <Label htmlFor="isServiceProvider" className="text-sm font-varela">
                          Je suis un prestataire de services
                        </Label>
                      </div>
                    </div>
                    
                    {profile.isServiceProvider && (
                      <div className="space-y-2">
                        <Label className="text-serenity-navy font-lato font-medium">Prix par jour (€)</Label>
                        <Input
                          type="number"
                          value={profile.pricePerDay}
                          onChange={(e) => setProfile({...profile, pricePerDay: parseInt(e.target.value) || 0})}
                          className="border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                          min="0"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-serenity-navy font-lato font-medium">Compétences</Label>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {(profile.skills || []).map((skill, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="bg-serenity-lavender text-serenity-navy group cursor-pointer"
                            onClick={() => removeSkill(skill)}
                          >
                            {skill}
                            <Trash2 className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Nouvelle compétence"
                          className="border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        />
                        <Button onClick={addSkill} size="sm" variant="outline">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-serenity-navy font-lato font-medium">Biographie</Label>
                    <Textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="min-h-24 border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                      placeholder="Présentez votre expertise et votre expérience..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 p-4 bg-serenity-lavender/20 rounded-lg">
                    <div className="space-y-2">
                      <Label className="text-serenity-navy font-lato font-medium">Tokens disponibles</Label>
                      <p className="text-lg font-oswald font-semibold text-serenity-blue">
                        {user?.availableToken}
                      </p>
                    </div>
                    <div className="space-y-2 flex gap-2 items-baseline">
                      <Label className="text-serenity-navy font-lato font-medium">Statut du compte</Label>
                      <Badge 
                        variant={user?.isVerified ? "default" : "secondary"}
                        className={user?.isVerified ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}
                      >
                        {user?.isVerified ? 'Vérifié' : 'En attente de vérification'}
                      </Badge>
                    </div>
                  </div>

                  <Button 
                    onClick={handleSaveProfile}
                    disabled={isUpdating}
                    className="bg-serenity-blue hover:bg-serenity-blue/90 text-white font-lato font-semibold"
                  >
                    {isUpdating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sauvegarde...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder le profil
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agents" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-oswald font-semibold text-serenity-navy">
                    Mes Agents IA
                  </h2>
                  <p className="text-serenity-navy/70 font-varela">
                    Ajoutez et gérez vos agents IA personnalisés
                  </p>
                </div>
                
                <Dialog open={isAddingAgent} onOpenChange={setIsAddingAgent}>
                  <DialogTrigger asChild>
                    <Button 
                      disabled={isCreating}
                      className="bg-serenity-blue hover:bg-serenity-blue/90 text-white font-lato font-semibold"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {isCreating ? 'Création...' : 'Ajouter un Agent IA'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-white border border-serenity-lavender/30 shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-oswald font-semibold text-serenity-navy">
                        Nouvel Agent IA
                      </DialogTitle>
                      <DialogDescription className="font-varela text-serenity-navy/70">
                        Configurez votre agent IA pour qu'il soit accessible aux clients
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleAddAgent} className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-serenity-navy font-lato font-medium">
                          Nom de l'agent *
                        </Label>
                        <Input
                          value={newAgent.name}
                          onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                          placeholder="Ex: Assistant Marketing IA"
                          className="border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-serenity-navy font-lato font-medium">
                          Description *
                        </Label>
                        <Textarea
                          value={newAgent.description}
                          onChange={(e) => setNewAgent({...newAgent, description: e.target.value})}
                          placeholder="Décrivez les capacités et spécialités de votre agent..."
                          className="min-h-20 border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-serenity-navy font-lato font-medium">
                          Tags (séparés par des virgules ou points-virgules)
                        </Label>
                        <Input
                          value={newAgent.tags.join(', ')}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const tags = inputValue
                              .split(/[,;]/)
                              .map(tag => tag.trim())
                              .filter(tag => tag.length > 0);
                            setNewAgent({...newAgent, tags});
                          }}
                          onBlur={(e) => {
                            const inputValue = e.target.value;
                            const tags = inputValue
                              .split(/[,;]/)
                              .map(tag => tag.trim())
                              .filter(tag => tag.length > 0);
                            setNewAgent({...newAgent, tags});
                          }}
                          placeholder="Marketing, Stratégie; IA, Automatisation"
                          className="border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-serenity-navy font-lato font-medium">
                          Lien d'intégration *
                        </Label>
                        <Input
                          value={newAgent.link}
                          onChange={(e) => setNewAgent({...newAgent, link: e.target.value})}
                          placeholder="https://mon-agent.com ou API endpoint"
                          className="border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                          required
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isCreating}
                          onClick={() => setIsAddingAgent(false)}
                          className="border-serenity-lavender/50 text-serenity-navy hover:bg-serenity-lavender/20"
                        >
                          Annuler
                        </Button>
                        <Button
                          type="submit"
                          disabled={isCreating}
                          className="bg-serenity-blue hover:bg-serenity-blue/90 text-white"
                        >
                          {isCreating ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Création...
                            </>
                          ) : (
                            'Créer l\'agent'
                          )}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-6">
                {agentsLoading ? (
                  <Card className="glass-effect border-0 shadow-lg">
                    <CardContent className="text-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-serenity-blue mx-auto mb-4"></div>
                      <p className="text-serenity-navy/60 font-varela">Chargement des agents...</p>
                    </CardContent>
                  </Card>
                ) : agents.length === 0 ? (
                  <Card className="glass-effect border-0 shadow-lg">
                    <CardContent className="text-center py-12">
                      <Bot className="w-16 h-16 text-serenity-navy/40 mx-auto mb-4" />
                      <h3 className="text-xl font-oswald font-semibold text-serenity-navy mb-2">
                        Aucun agent IA
                      </h3>
                      <p className="text-serenity-navy/60 font-varela mb-6">
                        Commencez par ajouter votre premier agent IA
                      </p>
                      <Button 
                        onClick={() => setIsAddingAgent(true)}
                        disabled={isCreating}
                        className="bg-serenity-blue hover:bg-serenity-blue/90 text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {isCreating ? 'Création...' : 'Ajouter un Agent IA'}
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  agents.map((agent) => (
                    <Card key={agent.id} className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-serenity-blue to-serenity-accent rounded-xl flex items-center justify-center ai-glow flex-shrink-0">
                              <Bot className="w-6 h-6 text-white" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-oswald font-semibold text-serenity-navy mb-2">
                                {agent.name}
                              </h3>
                              <p className="text-serenity-navy/70 font-varela mb-3 leading-relaxed">
                                {agent.description}
                              </p>
                              
                              {agent.tags && agent.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {agent.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="bg-serenity-lavender text-serenity-navy">
                                      <Tags className="w-3 h-3 mr-1" />
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex items-center space-x-2 text-sm text-serenity-navy/60">
                                <Link className="w-4 h-4 flex-shrink-0" />
                                <span className="font-varela truncate">{agent.link}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 ml-4">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEditAgent(agent)}
                              className="border-serenity-blue text-serenity-blue hover:bg-serenity-blue hover:text-white"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleRemoveAgent(agent.id)}
                              disabled={isDeleting}
                              className="border-red-300 text-red-500 hover:bg-red-500 hover:text-white"
                            >
                              {isDeleting ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              {/* Modal d'édition d'agent */}
              <Dialog open={isEditingAgent} onOpenChange={setIsEditingAgent}>
                <DialogContent className="max-w-2xl bg-white border border-serenity-lavender/30 shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-oswald font-semibold text-serenity-navy">
                      Modifier l'Agent IA
                    </DialogTitle>
                    <DialogDescription className="font-varela text-serenity-navy/70">
                      Modifiez les informations de votre agent IA
                    </DialogDescription>
                  </DialogHeader>
                  
                  {editingAgent && (
                    <form onSubmit={handleUpdateAgent} className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-serenity-navy font-lato font-medium">
                          Nom de l'agent *
                        </Label>
                        <Input
                          value={editingAgent.name}
                          onChange={(e) => setEditingAgent({...editingAgent, name: e.target.value})}
                          placeholder="Ex: Assistant Marketing IA"
                          className="border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-serenity-navy font-lato font-medium">
                          Description *
                        </Label>
                        <Textarea
                          value={editingAgent.description}
                          onChange={(e) => setEditingAgent({...editingAgent, description: e.target.value})}
                          placeholder="Décrivez les capacités et spécialités de votre agent..."
                          className="min-h-20 border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-serenity-navy font-lato font-medium">
                          Tags (séparés par des virgules ou points-virgules)
                        </Label>
                        <Input
                          value={editingAgent.tags.join(', ')}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const tags = inputValue
                              .split(/[,;]/)
                              .map(tag => tag.trim())
                              .filter(tag => tag.length > 0);
                            setEditingAgent({...editingAgent, tags});
                          }}
                          onBlur={(e) => {
                            const inputValue = e.target.value;
                            const tags = inputValue
                              .split(/[,;]/)
                              .map(tag => tag.trim())
                              .filter(tag => tag.length > 0);
                            setEditingAgent({...editingAgent, tags});
                          }}
                          placeholder="Marketing, Stratégie; IA, Automatisation"
                          className="border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-serenity-navy font-lato font-medium">
                          Lien d'intégration *
                        </Label>
                        <Input
                          value={editingAgent.link}
                          onChange={(e) => setEditingAgent({...editingAgent, link: e.target.value})}
                          placeholder="https://mon-agent.com ou API endpoint"
                          className="border-serenity-lavender/50 focus:border-serenity-blue font-varela"
                          required
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsEditingAgent(false)
                            setEditingAgent(null)
                          }}
                          className="border-serenity-lavender/50 text-serenity-navy hover:bg-serenity-lavender/20"
                        >
                          Annuler
                        </Button>
                        <Button
                          type="submit"
                          className="bg-serenity-blue hover:bg-serenity-blue/90 text-white"
                        >
                          Mettre à jour
                        </Button>
                      </div>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Profile; 