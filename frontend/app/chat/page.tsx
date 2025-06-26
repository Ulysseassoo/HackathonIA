"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import ReactMarkdown from "react-markdown";

interface Message {
    id: string;
    content: string;
    isUser: boolean;
    timestamp: Date;
}

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content:
                "Bonjour ! Je suis votre assistant IA Sérénité. Décrivez-moi votre besoin business et je vais vous aider à trouver les meilleures solutions et prestataires adaptés. Que puis-je faire pour vous aujourd'hui ?",
            isUser: false,
            timestamp: new Date(),
        },
    ]);

    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const conversationId = useRef(`web-${crypto.randomUUID()}`);

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
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");
        setIsTyping(true);

        try {
            const response = await fetch("/api/chat/stream", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    agentId: "myAgent",
                    message: {
                        message: inputMessage,
                        conversation_id: conversationId.current,
                        context: {
                            configurable: {
                                __bearer_token: process.env.NEXT_PUBLIC_BEARER,
                            },
                        },
                    },
                }),
            });

            if (!response.body) throw new Error("Pas de stream reçu");

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let aiMessage = "";
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                for (const line of lines) {
                    if (line.startsWith("data:")) {
                        try {
                            const jsonStr = line.replace(/^data:\s*/, "");
                            const parsed = JSON.parse(jsonStr);
                            if (parsed.token) {
                                const token = parsed.token;

                                if (token.length === 10) {
                                    aiMessage += token;
                                } else {
                                    aiMessage += token + "\n";
                                }

                                setMessages((prev) => [
                                    ...prev.filter(
                                        (msg) => msg.id !== "streaming"
                                    ),
                                    {
                                        id: "streaming",
                                        content: aiMessage,
                                        isUser: false,
                                        timestamp: new Date(),
                                    },
                                ]);
                            }
                        } catch (err) {
                            console.warn("Erreur de parsing JSON:", err);
                        }
                    }
                }
            }

            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === "streaming"
                        ? { ...msg, id: Date.now().toString() }
                        : msg
                )
            );
        } catch (err) {
            console.error("Erreur IA:", err);
        } finally {
            setIsTyping(false);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="h-screen flex flex-col bg-serenity-light">
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
                            className={`flex ${
                                message.isUser ? "justify-end" : "justify-start"
                            } animate-fade-in`}
                        >
                            <div
                                className={`flex space-x-3 max-w-2xl ${
                                    message.isUser
                                        ? "flex-row-reverse space-x-reverse"
                                        : ""
                                }`}
                            >
                                <div
                                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                        message.isUser
                                            ? "bg-gradient-to-br from-serenity-accent to-purple-500"
                                            : "bg-gradient-to-br from-serenity-blue to-serenity-accent ai-glow"
                                    }`}
                                >
                                    {message.isUser ? (
                                        <User className="w-4 h-4 text-white" />
                                    ) : (
                                        <Bot className="w-4 h-4 text-white" />
                                    )}
                                </div>

                                <div
                                    className={`chat-bubble ${
                                        message.isUser
                                            ? "bg-serenity-blue text-white"
                                            : "bg-white border border-serenity-lavender/50 text-serenity-navy"
                                    }`}
                                >
                                    <div className="prose font-varela leading-relaxed max-w-full">
                                        <ReactMarkdown>
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>
                                    <p
                                        className={`text-xs mt-2 ${
                                            message.isUser
                                                ? "text-white/70"
                                                : "text-serenity-navy/50"
                                        }`}
                                    >
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
                                        <div
                                            className="w-2 h-2 bg-serenity-blue rounded-full animate-bounce"
                                            style={{ animationDelay: "0.1s" }}
                                        ></div>
                                        <div
                                            className="w-2 h-2 bg-serenity-blue rounded-full animate-bounce"
                                            style={{ animationDelay: "0.2s" }}
                                        ></div>
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
                    <form
                        onSubmit={handleSendMessage}
                        className="flex space-x-3"
                    >
                        <div className="flex-1 relative">
                            <Input
                                value={inputMessage}
                                onChange={(e) =>
                                    setInputMessage(e.target.value)
                                }
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
                        L'IA analyse vos besoins et vous connecte avec les
                        meilleurs experts
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Chat;
