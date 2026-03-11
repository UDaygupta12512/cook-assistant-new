"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Volume2, VolumeX, ChefHat, Sparkles, Loader2, Send, X } from "lucide-react";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import { motion, AnimatePresence } from "framer-motion";
import { useDietaryStore } from "@/store/useDietaryStore";

// Web Speech API types
interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
    abort: () => void;
}

declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognitionInstance;
        webkitSpeechRecognition: new () => SpeechRecognitionInstance;
    }
}

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export default function VoicePage() {
    const navbarTranslations = useNavbarTranslations();
    const { profile } = useDietaryStore();
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [textInput, setTextInput] = useState("");
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognitionAPI) {
                const recognition = new SpeechRecognitionAPI();
                recognition.continuous = false;
                recognition.interimResults = true;
                recognition.lang = "en-US";

                recognition.onresult = (event) => {
                    const current = event.resultIndex;
                    const result = event.results[current];
                    const transcriptText = result[0].transcript;
                    setTranscript(transcriptText);

                    if (result.isFinal) {
                        handleUserMessage(transcriptText);
                        setTranscript("");
                    }
                };

                recognition.onerror = (event) => {
                    console.error("Speech recognition error:", event.error);
                    setIsListening(false);
                    if (event.error === "not-allowed") {
                        setError("Microphone access denied. Please enable it in your browser settings.");
                    }
                };

                recognition.onend = () => {
                    setIsListening(false);
                };

                recognitionRef.current = recognition;
            }
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
            if (typeof window !== "undefined" && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const handleUserMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: text.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsProcessing(true);
        setError(null);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: text,
                    dietaryGoal: profile?.goal || "Standard",
                }),
            });

            const data = await response.json();

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.reply || "I apologize, but I couldn't process your request. Please try again.",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);

            // Speak the response if voice is enabled
            if (voiceEnabled) {
                speakText(assistantMessage.content);
            }
        } catch (err) {
            console.error("Chat error:", err);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I'm having trouble connecting right now. Please try again in a moment.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsProcessing(false);
        }
    };

    const speakText = (text: string) => {
        if (typeof window === "undefined" || !window.speechSynthesis) return;

        window.speechSynthesis.cancel();
        setIsSpeaking(true);

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.lang = "en-US";

        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(v => v.lang.includes("en-US") || v.lang.includes("en-GB"));
        if (englishVoice) utterance.voice = englishVoice;

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            setError("Speech recognition is not supported in your browser. Try Chrome or Edge.");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            setError(null);
            setTranscript("");
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const stopSpeaking = () => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    const handleTextSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (textInput.trim()) {
            handleUserMessage(textInput);
            setTextInput("");
        }
    };

    const clearChat = () => {
        setMessages([]);
        setTranscript("");
    };

    const suggestedQuestions = [
        "How do I make biryani?",
        "What's a good substitute for eggs?",
        "How long to marinate chicken?",
        "Tips for crispy dosa?",
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NavbarClient translations={navbarTranslations} />
            <main className="flex-1 container mx-auto px-4 py-8 pt-24">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-200 dark:border-orange-800 mb-4">
                            <Mic className="w-4 h-4 text-orange-600" />
                            <span className="text-sm font-bold text-orange-700 dark:text-orange-400">Voice Assistant</span>
                        </div>
                        <h1 className="text-4xl font-black text-foreground mb-2">
                            Your AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Kitchen Companion</span>
                        </h1>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Ask me anything about cooking! Use voice or type your questions. I'll help with recipes, techniques, and substitutions.
                        </p>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Chat Messages */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-border shadow-lg mb-6 overflow-hidden">
                        <div className="h-[400px] overflow-y-auto p-6 space-y-4">
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                                        <ChefHat className="w-10 h-10 text-orange-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">Hello, Chef!</h3>
                                    <p className="text-muted-foreground mb-6 max-w-md">
                                        I'm your AI cooking assistant. Ask me about recipes, cooking techniques, ingredient substitutions, or meal ideas!
                                    </p>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {suggestedQuestions.map((q, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleUserMessage(q)}
                                                className="px-4 py-2 bg-secondary/50 hover:bg-secondary border border-border rounded-full text-sm transition-colors"
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <AnimatePresence>
                                        {messages.map((msg) => (
                                            <motion.div
                                                key={msg.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-[80%] p-4 rounded-2xl ${
                                                        msg.role === "user"
                                                            ? "bg-primary text-primary-foreground"
                                                            : "bg-secondary/50 text-foreground"
                                                    }`}
                                                >
                                                    {msg.role === "assistant" && (
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <ChefHat className="w-4 h-4 text-orange-600" />
                                                            <span className="text-xs font-bold text-orange-600">AI Chef</span>
                                                        </div>
                                                    )}
                                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    {isProcessing && (
                                        <div className="flex justify-start">
                                            <div className="bg-secondary/50 p-4 rounded-2xl">
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
                                                    <span className="text-sm text-muted-foreground">Thinking...</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>

                        {/* Transcript Display */}
                        {isListening && transcript && (
                            <div className="px-6 py-3 bg-orange-50 dark:bg-orange-900/20 border-t border-orange-200 dark:border-orange-800">
                                <p className="text-sm text-orange-700 dark:text-orange-400 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                                    {transcript}
                                </p>
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-4 border-t border-border bg-secondary/20">
                            <form onSubmit={handleTextSubmit} className="flex gap-3">
                                <input
                                    type="text"
                                    value={textInput}
                                    onChange={(e) => setTextInput(e.target.value)}
                                    placeholder="Type your question..."
                                    className="flex-1 px-4 py-3 bg-white dark:bg-zinc-800 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    disabled={isProcessing}
                                />
                                <button
                                    type="submit"
                                    disabled={!textInput.trim() || isProcessing}
                                    className="px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-colors"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Voice Controls */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center gap-4">
                            {/* Main Mic Button */}
                            <button
                                onClick={toggleListening}
                                disabled={isProcessing}
                                className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg ${
                                    isListening
                                        ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                                        : "bg-gradient-to-br from-orange-500 to-red-500 text-white hover:shadow-xl hover:-translate-y-1"
                                } disabled:opacity-50`}
                            >
                                {isListening ? (
                                    <MicOff className="w-8 h-8" />
                                ) : (
                                    <Mic className="w-8 h-8" />
                                )}
                                {isListening && (
                                    <span className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping" />
                                )}
                            </button>

                            {/* Voice Toggle */}
                            <button
                                onClick={() => {
                                    if (isSpeaking) stopSpeaking();
                                    setVoiceEnabled(!voiceEnabled);
                                }}
                                className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${
                                    voiceEnabled
                                        ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-600"
                                        : "bg-secondary border-border text-muted-foreground"
                                }`}
                                title={voiceEnabled ? "Voice responses ON" : "Voice responses OFF"}
                            >
                                {voiceEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                            </button>

                            {/* Stop Speaking */}
                            {isSpeaking && (
                                <button
                                    onClick={stopSpeaking}
                                    className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 text-red-600 flex items-center justify-center transition-all hover:bg-red-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            )}
                        </div>

                        <p className="text-sm text-muted-foreground text-center">
                            {isListening ? (
                                <span className="text-red-500 font-medium">Listening... Speak now</span>
                            ) : (
                                "Tap the microphone to ask a question"
                            )}
                        </p>

                        {messages.length > 0 && (
                            <button
                                onClick={clearChat}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                            >
                                Clear conversation
                            </button>
                        )}
                    </div>

                    {/* Features */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { icon: ChefHat, title: "Recipe Help", desc: "Get step-by-step cooking guidance" },
                            { icon: Sparkles, title: "Smart Substitutions", desc: "Find alternatives for ingredients" },
                            { icon: Volume2, title: "Voice Responses", desc: "Hands-free cooking assistance" },
                        ].map((feature, i) => (
                            <div key={i} className="p-4 bg-secondary/30 rounded-xl border border-border text-center">
                                <feature.icon className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                                <h3 className="font-bold text-foreground">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
