"use client";

import { useState, useRef, useEffect } from "react";
import { ChefHat, MessageSquare, X, Send, Utensils, Loader2, Sparkles, Zap, ChevronRight, User, Mic, Square } from "lucide-react";
import { ALL_RECIPES } from "@/lib/recipe-data";
import { findBestRecipeByDishName, findBestRecipesByIngredients, generateHowToCookRecipe, type GeneratedHowToCookRecipe } from "@/lib/culinary-engine";
import { motion, AnimatePresence } from "framer-motion";
import { useDietaryStore } from "@/store/useDietaryStore";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'chef';
    timestamp: Date;
};

const COLORS = ['#f97316', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

export const ChefChatbot = () => {
    const { profile } = useDietaryStore();
    const [isOpen, setIsOpen] = useState(false);
    const [lastRecipe, setLastRecipe] = useState<
        | { kind: "db"; recipeId: number }
        | { kind: "generated"; recipe: GeneratedHowToCookRecipe }
        | null
    >(null);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm Chef AI. Ask me for recipes, nutrition comparisons, or use the microphone to talk hands-free!",
            sender: 'chef',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    // Voice state
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<BlobPart[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const isAffirmative = (text: string) => {
        const t = text.toLowerCase().trim();
        return ["yes", "y", "yep", "yeah", "sure", "ok", "okay", "please", "show", "full", "steps", "instructions"].some(k => t === k || t.includes(k));
    };

    const extractIngredientList = (text: string): string[] => {
        const lower = text.toLowerCase();
        const afterHave = lower.includes("i have") ? lower.split("i have")[1] : "";
        const afterWith = lower.includes("with") ? lower.split("with")[1] : "";
        const candidate = (afterHave || afterWith || text).trim();
        const parts = candidate
            .replace(/[^a-z0-9,\s]/gi, " ")
            .split(/,| and | & |\+/gi)
            .map(p => p.trim())
            .filter(p => p.length >= 2)
            .slice(0, 12);
        if (parts.length <= 1) return [];
        return parts;
    };

    const formatDbRecipeBrief = (r: (typeof ALL_RECIPES)[number]) => {
        const top = r.ingredients.slice(0, 4).map(i => i.name).join(", ");
        return `I found: "${r.title}" (${r.totalTime}, ${r.difficulty}). Key ingredients: ${top}. Want the full steps?`;
    };

    const formatGeneratedBrief = (r: GeneratedHowToCookRecipe) => {
        const top = r.ingredients.slice(0, 4).join(", ");
        return `Here's a ${profile.goal} way to make "${r.name}". Time: ~${parseInt(r.prepTime) + parseInt(r.cookTime)} min. Key ingredients: ${top}. Want the full steps?`;
    };

    const formatFullRecipe = (r: GeneratedHowToCookRecipe) => {
        const ing = r.ingredients.map((x) => `- ${x}`).join("\n");
        const steps = r.steps.map((s) => `${s.step}. ${s.english}`).join("\n");
        const tips = r.tips?.length ? `\n\nChef tips:\n${r.tips.slice(0, 3).map(t => `- ${t}`).join("\n")}` : "";
        const safety = r.safetyNotes?.length ? `\n\nSafety:\n${r.safetyNotes.map(n => `- ${n}`).join("\n")}` : "";
        return `Recipe: ${r.name}\n\nIngredients:\n${ing}\n\nSteps:\n${steps}${tips}${safety}`;
    };

    const buildConversationHistory = () => {
        return messages.slice(-6).map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
        }));
    };

    const getChefResponse = async (query: string): Promise<string> => {
        const lowerQuery = query.toLowerCase().trim();

        if (lastRecipe && isAffirmative(lowerQuery)) {
            if (lastRecipe.kind === "db") {
                const r = ALL_RECIPES.find(x => x.id === lastRecipe.recipeId);
                if (r) {
                    const full = generateHowToCookRecipe(r.title, "Standard", profile);
                    return formatFullRecipe(full);
                }
            }
            if (lastRecipe.kind === "generated") {
                return formatFullRecipe(lastRecipe.recipe);
            }
        }

        const extractedIngredients = extractIngredientList(query);
        if (extractedIngredients.length >= 2) {
            const matches = findBestRecipesByIngredients(extractedIngredients, { profile, limit: 3, minMatchRatio: 0.15 });
            if (matches.length > 0) {
                setLastRecipe({ kind: "db", recipeId: matches[0].id });
                return `With those ingredients, best matches are: ${matches.map(m => `"${m.title}"`).join(", ")}.\n\n${formatDbRecipeBrief(matches[0])}`;
            }

            const generated = generateHowToCookRecipe(extractedIngredients.join(" "), profile.goal, profile);
            setLastRecipe({ kind: "generated", recipe: generated });
            return `I've crafted a custom recipe using your ingredients!\n\n${formatGeneratedBrief(generated)}`;
        }

        if (query.split(" ").length <= 4) {
            const best = findBestRecipeByDishName(query, { profile, limit: 1 })[0];
            if (best) {
                setLastRecipe({ kind: "db", recipeId: best.id });
                return formatDbRecipeBrief(best);
            }
        }

        try {
            const conversationHistory = buildConversationHistory();
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: query,
                    dietaryGoal: profile?.goal || 'Standard',
                    conversationHistory: conversationHistory
                })
            });

            if (res.ok) {
                const data = await res.json();
                if (data.reply) return data.reply;
            }
        } catch (error) {
            console.error("Chat API error", error);
        }

        return "I'm having a little trouble thinking of a recipe right now. Could you ask me something else?";
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user', timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 650));
            const responseText = await getChefResponse(userMessage.text);
            const chefResponse: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: 'chef', timestamp: new Date() };
            setMessages(prev => [...prev, chefResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    // --- Audio Logic ---
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            audioChunksRef.current = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            recorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                stream.getTracks().forEach(track => track.stop());
                await sendAudioToBackend(audioBlob);
            };

            recorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Mic access denied or error:", err);
            alert("Microphone access is required for Voice Chef.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsTyping(true);
        }
    };

    const sendAudioToBackend = async (blob: Blob) => {
        try {
            const formData = new FormData();
            formData.append("audio", blob, "voice.webm");
            formData.append("dietaryGoal", profile?.goal || 'Standard');

            const res = await fetch("/api/voice-chat", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const transcription = decodeURIComponent(res.headers.get("X-Transcription") || "");
                const replyText = decodeURIComponent(res.headers.get("X-Reply-Text") || "Voice response received.");
                
                if (transcription) {
                     setMessages(prev => [...prev, { id: Date.now().toString(), text: `🎤 ${transcription}`, sender: 'user', timestamp: new Date() }]);
                }
                
                setMessages(prev => [...prev, { id: (Date.now()+1).toString(), text: replyText, sender: 'chef', timestamp: new Date() }]);

                const audioBlob = await res.blob();
                if (audioBlob.size > 0) {
                    const audioUrl = URL.createObjectURL(audioBlob);
                    if (!audioRef.current) {
                        audioRef.current = new Audio(audioUrl);
                    } else {
                        audioRef.current.src = audioUrl;
                    }
                    audioRef.current.play();
                }
            }
        } catch (error) {
            console.error("Voice chat failed", error);
            setMessages(prev => [...prev, { id: Date.now().toString(), text: "Voice chat failed. Try again.", sender: 'chef', timestamp: new Date() }]);
        } finally {
            setIsTyping(false);
        }
    };

    // --- Generative UI Parsing Logic ---
    const renderMessageContent = (text: string) => {
        try {
            if (!text.trim().startsWith('{')) return text;
            
            const data = JSON.parse(text);
            if (data.ui) {
                return (
                    <div className="flex flex-col gap-4 w-[280px]">
                        <p>{data.text}</p>
                        <div className="h-56 w-full bg-white dark:bg-zinc-800 rounded-xl p-3 shadow-sm border border-border mt-2">
                            <p className="text-sm font-bold text-center mb-2">{data.ui.title}</p>
                            {data.ui.type === 'pie_chart' ? (
                                <ResponsiveContainer width="100%" height="80%">
                                    <PieChart>
                                        <Pie data={data.ui.data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={30} outerRadius={50} label={({name, value}) => `${name}: ${value}`}>
                                            {data.ui.data.map((entry: any, index: number) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <ResponsiveContainer width="100%" height="80%">
                                    <BarChart data={data.ui.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <XAxis dataKey="name" fontSize={10} tick={{fill: '#888'}} />
                                        <YAxis fontSize={10} tick={{fill: '#888'}} />
                                        <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
                                        <Bar dataKey="value" radius={[4,4,0,0]}>
                                            {data.ui.data.map((entry: any, index: number) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>
                );
            }
            return data.text || text;
        } catch (e) {
            return text; // Not JSON, render normally
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-20 right-0 w-[420px] max-w-[calc(100vw-2rem)] h-[620px] bg-white dark:bg-zinc-900 rounded-[2rem] shadow-big border border-border flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 bg-primary text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
                                    <ChefHat className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-black tracking-tight">CHEF AI ASSISTANT</h3>
                                    <div className="flex items-center gap-1.5 opacity-80 text-xs font-bold">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                        ONLINE & READY
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} aria-label="Close chat" className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex gap-3 max-w-[90%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-soft ${msg.sender === 'user' ? 'bg-secondary text-primary' : 'bg-primary text-white'}`}>
                                            {msg.sender === 'user' ? <User className="w-5 h-5" /> : <ChefHat className="w-6 h-6" />}
                                        </div>
                                        <div className={`p-4 rounded-3xl text-sm font-medium leading-relaxed whitespace-pre-line ${msg.sender === 'user' ? 'bg-secondary/50 text-foreground rounded-tr-none' : 'bg-primary/5 text-foreground border border-primary/10 rounded-tl-none'}`}>
                                            {renderMessageContent(msg.text)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center">
                                            <ChefHat className="w-6 h-6" />
                                        </div>
                                        <div className="flex gap-1.5 p-4 bg-primary/5 rounded-3xl rounded-tl-none border border-primary/10">
                                            <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                                            <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-border bg-zinc-50/50 dark:bg-zinc-800/50">
                            <div className="flex items-center gap-2 relative">
                                <textarea
                                    ref={inputRef}
                                    rows={1}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    placeholder={isRecording ? "Listening..." : "Ask for a recipe or cooking tip..."}
                                    disabled={isRecording}
                                    className="w-full pl-5 pr-14 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none resize-none transition-all font-medium disabled:opacity-50"
                                />
                                <div className="absolute right-2 flex gap-1 items-center">
                                    {!input.trim() ? (
                                        <button
                                            onClick={isRecording ? stopRecording : startRecording}
                                            className={`p-3 rounded-xl transition-all shadow-md ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-zinc-100 dark:bg-zinc-800 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
                                        >
                                            {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSend}
                                            disabled={!input.trim()}
                                            className="p-3 bg-primary text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all"
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Float Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Chef AI chat"
                    className="group relative w-16 h-16 bg-gradient-to-br from-primary to-orange-600 text-white rounded-[1.5rem] shadow-big hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <MessageSquare className="w-8 h-8 group-hover:scale-0 transition-transform duration-300" />
                    <ChefHat className="w-10 h-10 absolute scale-0 group-hover:scale-100 transition-transform duration-300 rotate-12" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-background rounded-full" />
                </button>
            )}
        </div>
    );
};

export default ChefChatbot;
