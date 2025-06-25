"use client"

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Bonjour ! Je suis votre assistant IA Sérénité. Décrivez-moi votre besoin business et je vais vous aider à trouver les meilleures solutions et prestataires adaptés. Que puis-je faire pour vous aujourd'hui ?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Je comprends votre besoin concernant "${inputMessage}". Laissez-moi analyser cela et vous proposer les meilleures solutions disponibles. Je peux vous connecter avec des experts spécialisés ou des agents IA adaptés à votre demande. Souhaitez-vous que je vous présente quelques options ?`,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-serenity-cream via-white to-serenity-lavender/30">
        <Header />
        
        <div className="border-b border-serenity-lavender/30 bg-white/80 backdrop-blur-sm px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-serenity-blue to-serenity-accent rounded-xl flex items-center justify-center ai-glow">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-oswald font-semibold text-serenity-navy">
                Assistant IA Sérénité
              </h1>
              <p className="text-sm text-serenity-navy/60 font-varela">
                En ligne - Prêt à vous aider
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`flex space-x-3 max-w-2xl ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    message.isUser 
                      ? 'bg-gradient-to-br from-serenity-accent to-purple-500' 
                      : 'bg-gradient-to-br from-serenity-blue to-serenity-accent ai-glow'
                  }`}>
                    {message.isUser ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>

                  <div className={`chat-bubble ${
                    message.isUser 
                      ? 'bg-serenity-blue text-white' 
                      : 'bg-white border border-serenity-lavender/50 text-serenity-navy'
                  }`}>
                    <p className="font-varela leading-relaxed">
                      {message.content}
                    </p>
                    <p className={`text-xs mt-2 ${
                      message.isUser ? 'text-white/70' : 'text-serenity-navy/50'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="flex space-x-3 max-w-2xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-serenity-blue to-serenity-accent rounded-xl flex items-center justify-center ai-glow">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="chat-bubble bg-white border border-serenity-lavender/50">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-serenity-blue rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-serenity-blue rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-serenity-blue rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-serenity-lavender/30 bg-white/80 backdrop-blur-sm px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Décrivez votre besoin business..."
                  className="pr-12 py-3 border-serenity-lavender/50 focus:border-serenity-blue rounded-2xl font-varela bg-white"
                  disabled={isTyping}
                />
                <Sparkles className="absolute right-3 top-3 w-5 h-5 text-serenity-blue/40" />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={!inputMessage.trim() || isTyping}
                className="bg-serenity-blue hover:bg-serenity-blue/90 text-white px-6 rounded-2xl transition-all duration-200 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </form>
            
            <p className="text-xs text-serenity-navy/50 mt-2 text-center font-varela">
              L'IA analyse vos besoins et vous connecte avec les meilleurs experts
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ChatPage; 