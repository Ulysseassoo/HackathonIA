"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Users, Zap, ArrowRight, Bot, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

const Landing = () => {
  const router = useRouter();

  const features = [
    {
      icon: MessageCircle,
      title: 'IA Conversationnelle',
      description: 'Assistance intelligente 24/7',
      color: 'from-serenity-blue to-serenity-accent'
    },
    {
      icon: Users,
      title: 'Experts Humains',
      description: 'Prestataires qualifiés',
      color: 'from-serenity-accent to-purple-500'
    },
    {
      icon: Zap,
      title: 'Solutions Rapides',
      description: 'Résultats garantis',
      color: 'from-gray-500 to-gray-600'
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Décrivez votre besoin",
      description: "Expliquez votre projet ou problème business en quelques mots"
    },
    {
      step: "02", 
      title: "Obtenez des solutions",
      description: "Notre IA analyse et propose des experts ou agents adaptés"
    },
    {
      step: "03",
      title: "Lancez votre projet",
      description: "Collaborez avec les prestataires sélectionnés et atteignez vos objectifs"
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 px-4 gradient-bg overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-serenity-blue rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-serenity-accent rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-oswald font-bold mb-6 leading-tight text-white">
              Bienvenue sur{' '}
              <span className="bg-gradient-to-r from-serenity-blue to-serenity-accent bg-clip-text text-transparent">
                Sérénité
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl font-lato text-white/80 mb-4 leading-relaxed">
              La plateforme intelligente qui connecte vos besoins business avec des
            </p>
            <p className="text-xl md:text-2xl font-lato mb-12 leading-relaxed text-white">
              <span className="text-serenity-blue font-semibold">prestataires experts</span> et des{' '}
              <span className="text-serenity-accent font-semibold">agents IA avancés</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                size="lg"
                onClick={() => router.push('/chat')}
                className="bg-serenity-blue hover:bg-serenity-blue/90 text-white px-8 py-4 rounded-2xl font-lato font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Commencer maintenant
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push('/prestataire')}
                className="border-2 border-serenity-accent text-serenity-accent hover:bg-serenity-accent hover:text-white px-8 py-4 rounded-2xl font-lato font-semibold text-lg transition-all duration-300 bg-white/10 backdrop-blur-sm"
              >
                <User className="w-5 h-5 mr-2" />
                Devenir prestataire
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-oswald font-semibold mb-2 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 font-varela">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-oswald font-bold mb-6 text-serenity-navy">
              Comment ça marche
            </h2>
            <p className="text-xl font-lato text-serenity-navy/70 max-w-2xl mx-auto">
              Trois étapes simples pour transformer vos idées en réalité
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-serenity-blue to-serenity-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ai-glow">
                    <span className="text-2xl font-oswald font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-serenity-blue/30 to-transparent transform translate-x-4"></div>
                  )}
                </div>
                <h3 className="text-2xl font-oswald font-semibold mb-4 text-serenity-navy">
                  {step.title}
                </h3>
                <p className="text-serenity-navy/70 font-varela leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-serenity-navy to-serenity-blue text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-oswald font-bold mb-6">
            Prêt à transformer vos idées ?
          </h2>
          <p className="text-xl font-lato mb-12 opacity-90 max-w-2xl mx-auto">
            Rejoignez des milliers d'entrepreneurs qui font confiance à Sérénité pour leurs projets
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => router.push('/chat')}
              className="bg-white text-serenity-navy hover:bg-serenity-light px-8 py-4 rounded-2xl font-lato font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Bot className="w-5 h-5 mr-2" />
              Essayer l'IA gratuitement
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing; 