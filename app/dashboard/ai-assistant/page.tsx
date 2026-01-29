"use client";

import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, Plus } from "lucide-react";
import { useState } from "react";
import { askAI } from "@/app/actions/ai";

const suggestedPrompts = [
    "Create an invoice for my latest project",
    "Show me my top clients by revenue",
    "What's my total revenue this month?",
    "Help me write a payment reminder email",
];

export default function AIAssistantPage() {
    const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;

        setMessages([...messages, { role: "user", content: input }]);
        setInput("");

        // Simulate AI response
        try {
            const response = await askAI(input);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: response,
                },
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong while contacting AI.",
                },
            ]);
        }

    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="AI Assistant"
                description="Get help with invoicing, analytics, and business insights."
                action={
                    <Button variant="outline" className="gap-2">
                        <Plus className="h-4 w-4" />
                        New Chat
                    </Button>
                }
            />

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Chat Area */}
                <div className="lg:col-span-2">
                    <SectionCard className="flex h-[calc(100vh-16rem)] flex-col">
                        {messages.length === 0 ? (
                            <div className="flex flex-1 flex-col items-center justify-center space-y-6 p-8">
                                <div className="rounded-full bg-blue-100 p-6 dark:bg-blue-950">
                                    <Sparkles className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                                        How can I help you today?
                                    </h3>
                                    <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                        Ask me anything about your invoices, clients, or business analytics.
                                    </p>
                                </div>
                                <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
                                    {suggestedPrompts.map((prompt, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setInput(prompt)}
                                            className="rounded-lg border border-neutral-200 bg-white p-4 text-left text-sm transition-smooth hover:border-blue-300 hover:bg-blue-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-blue-700 dark:hover:bg-blue-950"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 space-y-4 overflow-y-auto p-6 scrollbar-thin">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-lg px-4 py-3 ${message.role === "user"
                                                ? "bg-blue-600 text-white"
                                                : "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
                                                }`}
                                        >
                                            <p className="text-sm">{message.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Type your message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    className="flex-1"
                                />
                                <Button onClick={handleSend} className="gap-2">
                                    <Send className="h-4 w-4" />
                                    Send
                                </Button>
                            </div>
                        </div>
                    </SectionCard>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    <SectionCard title="Suggested Actions">
                        <div className="space-y-2">
                            {[
                                "Generate invoice summary",
                                "Export data to CSV",
                                "Create payment reminder",
                                "Analyze revenue trends",
                            ].map((action, index) => (
                                <button
                                    key={index}
                                    className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left text-sm transition-smooth hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                                >
                                    {action}
                                </button>
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard title="Quick Stats">
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    Total Conversations
                                </p>
                                <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
                                    0
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    Tasks Completed
                                </p>
                                <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
                                    0
                                </p>
                            </div>
                        </div>
                    </SectionCard>
                </div>
            </div>
        </div>
    );
}
