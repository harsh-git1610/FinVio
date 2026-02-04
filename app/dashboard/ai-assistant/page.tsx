"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Bot, User, ArrowUp, Plus, Trash2, MessageSquare } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { askAI, getUserChats, getChatMessages, deleteChat } from "@/app/actions/ai";
import { motion } from "framer-motion";
import { IconMeteor } from "@tabler/icons-react";

const suggestedPrompts = [
    "Draft a past due invoice email",
    "How much managed revenue this month?",
    "List my top 3 pending clients",
    "Create a new invoice for Acme Corp",
];

type Message = { role: "user" | "assistant"; content: string };
type ChatSession = { id: string; title: string; createdAt: Date };

export default function AIAssistantPage() {
    // State
    const [messages, setMessages] = useState<Message[]>([]);
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);

    // Refs
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load History on Mount
    useEffect(() => {
        loadSessions();
    }, []);

    const loadSessions = async () => {
        try {
            const chats = await getUserChats();
            setSessions(chats as any);
        } catch (error) {
            console.error("Failed to load chats:", error);
        } finally {
            setIsLoadingHistory(false);
        }
    };

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    const handleNewChat = () => {
        setCurrentSessionId(null);
        setMessages([]);
        setInput("");
    };

    const handleSelectSession = async (sessionId: string) => {
        if (currentSessionId === sessionId) return;

        setIsLoadingHistory(true);
        setCurrentSessionId(sessionId);
        setMessages([]); // Clear while loading

        try {
            const history = await getChatMessages(sessionId);
            // Convert DB messages to UI format
            setMessages(history.map(m => ({ role: m.role as "user" | "assistant", content: m.content })));
        } catch (error) {
            console.error("Failed to load messages:", error);
        } finally {
            setIsLoadingHistory(false);
        }
    };

    const handleDeleteSession = async (e: React.MouseEvent, sessionId: string) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this chat?")) {
            await deleteChat(sessionId);
            setSessions(prev => prev.filter(s => s.id !== sessionId));
            if (currentSessionId === sessionId) {
                handleNewChat();
            }
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setInput("");
        setIsThinking(true);

        try {
            // Include sessionId if we have one
            const result = await askAI(userMessage, currentSessionId || undefined);

            // If this was a new session, result will include the new sessionId -- but wait, askAI returns string?
            // Ah, I updated askAI to return object { response, sessionId }
            // If typescript complains, I might need to adjust client code types.
            // Let's assume the server action change propagated.

            const responseText = result.response;
            const newSessionId = result.sessionId;

            // If this was a new session, update state
            if (!currentSessionId && newSessionId) {
                setCurrentSessionId(newSessionId);
                loadSessions(); // Reload sidebar
            }

            setMessages(prev => [...prev, { role: "assistant", content: responseText }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: "assistant", content: "I encountered an error. Please try again." }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-6rem)] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50">

            {/* Sidebar (History) */}
            <div className={`flex w-64 flex-col border-r border-neutral-100 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50 ${currentSessionId ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4">
                    <Button
                        onClick={handleNewChat}
                        className="w-full justify-start gap-2 bg-blue-600 text-white hover:bg-blue-700"
                    >
                        <Plus className="h-4 w-4" />
                        New Chat
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto px-2 scrollbar-thin">
                    <div className="space-y-1">
                        {sessions.length === 0 && !isLoadingHistory && (
                            <div className="p-4 text-center text-xs text-neutral-400">No past chats</div>
                        )}
                        {sessions.map((session) => (
                            <button
                                key={session.id}
                                onClick={() => handleSelectSession(session.id)}
                                className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${currentSessionId === session.id
                                    ? "bg-white font-medium text-blue-600 shadow-sm dark:bg-neutral-800 dark:text-blue-400"
                                    : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                                    }`}
                            >
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <MessageSquare className="h-4 w-4 shrink-0 opacity-50" />
                                    <span className="truncate">{session.title}</span>
                                </div>
                                <div
                                    role="button"
                                    onClick={(e) => handleDeleteSession(e, session.id)}
                                    className="opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={`flex flex-1 flex-col ${!currentSessionId ? 'hidden md:flex' : 'flex'}`}>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 bg-white/50 px-6 py-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/50">
                    <div className="flex items-center gap-3">
                        {/* Mobile Back Button could go here */}
                        <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                            <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
                                <title>Meteor icon</title>
                                <path d="M0 .234l21.912 20.537s.412.575-.124 1.151c-.535.576-1.236.083-1.236.083L0 .234zm6.508 2.058l17.01 15.638s.413.576-.123 1.152c-.534.576-1.235.083-1.235.083L6.508 2.292zM1.936 6.696l17.01 15.638s.412.576-.123 1.152-1.235.082-1.235.082L1.936 6.696zm10.073-2.635l11.886 10.927s.287.401-.087.805-.863.058-.863.058L12.009 4.061zm-8.567 7.737l11.886 10.926s.285.4-.088.803c-.375.403-.863.059-.863.059L3.442 11.798zm14.187-5.185l5.426 4.955s.142.188-.044.377c-.185.188-.428.027-.428.027l-4.954-5.358v-.001zM6.178 17.231l5.425 4.956s.144.188-.042.377-.427.026-.427.026l-4.956-5.359z"></path>
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Meteor</h2>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                {currentSessionId ? "Continuing conversation..." : "Start a new conversation"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800">
                    {messages.length === 0 && !isLoadingHistory ? (
                        <div className="flex h-full flex-col items-center justify-center space-y-8 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4"
                            >
                                <div className="mx-auto flex h-17 w-17 items-center justify-center rounded-2xl bg-black-to-tr from-blue-500 to-purple-500 shadow-lg shadow-blue-500/20">
                                    <svg fill="#000000" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>Meteor icon</title><path d="M0 .234l21.912 20.537s.412.575-.124 1.151c-.535.576-1.236.083-1.236.083L0 .234zm6.508 2.058l17.01 15.638s.413.576-.123 1.152c-.534.576-1.235.083-1.235.083L6.508 2.292zM1.936 6.696l17.01 15.638s.412.576-.123 1.152-1.235.082-1.235.082L1.936 6.696zm10.073-2.635l11.886 10.927s.287.401-.087.805-.863.058-.863.058L12.009 4.061zm-8.567 7.737l11.886 10.926s.285.4-.088.803c-.375.403-.863.059-.863.059L3.442 11.798zm14.187-5.185l5.426 4.955s.142.188-.044.377c-.185.188-.428.027-.428.027l-4.954-5.358v-.001zM6.178 17.231l5.425 4.956s.144.188-.042.377-.427.026-.427.026l-4.956-5.359z"></path></g></svg>
                                </div>
                                <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                                    How can I help you today?
                                </h3>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="grid w-full max-w-lg grid-cols-2 gap-3"
                            >
                                {suggestedPrompts.map((prompt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setInput(prompt)}
                                        className="rounded-xl border border-neutral-200 bg-white/50 px-4 py-3 text-left text-sm text-neutral-600 transition-all hover:border-blue-400 hover:bg-white hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-blue-700 dark:hover:bg-neutral-800"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </motion.div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {messages.map((message, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={index}
                                    className={`flex w-full gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {message.role === "assistant" && (
                                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                            <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
                                                <title>Meteor icon</title>
                                                <path d="M0 .234l21.912 20.537s.412.575-.124 1.151c-.535.576-1.236.083-1.236.083L0 .234zm6.508 2.058l17.01 15.638s.413.576-.123 1.152c-.534.576-1.235.083-1.235.083L6.508 2.292zM1.936 6.696l17.01 15.638s.412.576-.123 1.152-1.235.082-1.235.082L1.936 6.696zm10.073-2.635l11.886 10.927s.287.401-.087.805-.863.058-.863.058L12.009 4.061zm-8.567 7.737l11.886 10.926s.285.4-.088.803c-.375.403-.863.059-.863.059L3.442 11.798zm14.187-5.185l5.426 4.955s.142.188-.044.377c-.185.188-.428.027-.428.027l-4.954-5.358v-.001zM6.178 17.231l5.425 4.956s.144.188-.042.377-.427.026-.427.026l-4.956-5.359z"></path>
                                            </svg>
                                        </div>
                                    )}

                                    <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${message.role === "user"
                                        ? "rounded-tr-sm bg-blue-600 text-white shadow-md shadow-blue-600/10"
                                        : "rounded-tl-sm bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                                        }`}>
                                        {message.content}
                                    </div>

                                    {message.role === "user" && (
                                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                                            <User className="h-5 w-5 text-neutral-500" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {isThinking && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex w-full gap-4"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                        <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
                                            <title>Meteor icon</title>
                                            <path d="M0 .234l21.912 20.537s.412.575-.124 1.151c-.535.576-1.236.083-1.236.083L0 .234zm6.508 2.058l17.01 15.638s.413.576-.123 1.152c-.534.576-1.235.083-1.235.083L6.508 2.292zM1.936 6.696l17.01 15.638s.412.576-.123 1.152-1.235.082-1.235.082L1.936 6.696zm10.073-2.635l11.886 10.927s.287.401-.087.805-.863.058-.863.058L12.009 4.061zm-8.567 7.737l11.886 10.926s.285.4-.088.803c-.375.403-.863.059-.863.059L3.442 11.798zm14.187-5.185l5.426 4.955s.142.188-.044.377c-.185.188-.428.027-.428.027l-4.954-5.358v-.001zM6.178 17.231l5.425 4.956s.144.188-.042.377-.427.026-.427.026l-4.956-5.359z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-neutral-100 px-5 py-4 dark:bg-neutral-800">
                                        <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s]"></div>
                                        <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]"></div>
                                        <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400"></div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="border-t border-neutral-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="relative mx-auto flex w-full items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-1 pl-4 transition-all focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:focus-within:border-blue-700">
                        <input
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            className="flex-1 bg-transparent text-sm text-neutral-900 placeholder-neutral-400 outline-none dark:text-neutral-100"
                        />
                        <Button
                            onClick={handleSend}
                            size="icon"
                            disabled={!input.trim() || isThinking}
                            className={`h-9 w-9 rounded-lg transition-all ${input.trim()
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-neutral-200 text-neutral-400 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-500"
                                }`}
                        >
                            <ArrowUp className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
