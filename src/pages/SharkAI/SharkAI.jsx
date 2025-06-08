"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Send,
  TrendingUp,
  MessageSquare,
  Edit3,
  Trash2,
  Menu,
} from "lucide-react";

export default function SharkAI() {
  const [activeChat, setActiveChat] = useState("bitcoin");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [chatHistory, setChatHistory] = useState([
    { id: "bitcoin", title: "Bitcoin Analysis", active: true },
    { id: "eth", title: "Ethereum Trading", active: false },
    { id: "defi", title: "DeFi Protocols", active: false },
    { id: "nft", title: "NFT Market Trends", active: false },
  ]);

  const [allMessages, setAllMessages] = useState({
    bitcoin: [
      {
        id: 1,
        type: "user",
        content:
          "Can you analyze the current Bitcoin market trends and show me the funding rate chart?",
        timestamp: new Date(),
      },
      {
        id: 2,
        type: "assistant",
        content:
          "I'll analyze Bitcoin's current market trends for you. Based on recent data, Bitcoin has shown strong momentum with increasing institutional adoption. Here's the funding rate analysis:",
        hasChart: true,
        timestamp: new Date(),
      },
    ],
    eth: [
      {
        id: 1,
        type: "user",
        content: "What's the current Ethereum price and gas fees?",
        timestamp: new Date(),
      },
      {
        id: 2,
        type: "assistant",
        content:
          "Ethereum is currently trading around $2,400 with gas fees averaging 25-30 Gwei. The network has been more stable recently due to Layer 2 adoption.",
        timestamp: new Date(),
      },
    ],
    defi: [],
    nft: [],
  });

  const messages = allMessages[activeChat] || [];

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: message.trim(),
      timestamp: new Date(),
    };

    // Add user message
    setAllMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), userMessage],
    }));

    setMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage.content);
      const assistantMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content: aiResponse.content,
        hasChart: aiResponse.hasChart,
        timestamp: new Date(),
      };

      setAllMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), assistantMessage],
      }));

      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes("bitcoin") || input.includes("btc")) {
      return {
        content:
          "Bitcoin is currently showing strong momentum. The price has been consolidating around key resistance levels. Based on technical analysis, we're seeing increased institutional interest and positive on-chain metrics.",
        hasChart: Math.random() > 0.5,
      };
    } else if (input.includes("ethereum") || input.includes("eth")) {
      return {
        content:
          "Ethereum continues to benefit from Layer 2 scaling solutions and DeFi growth. The upcoming network upgrades should further improve efficiency and reduce gas costs.",
        hasChart: Math.random() > 0.6,
      };
    } else if (
      input.includes("chart") ||
      input.includes("analysis") ||
      input.includes("trend")
    ) {
      return {
        content:
          "Here's a detailed technical analysis with the requested chart. The market shows several key patterns that suggest potential price movements in the coming weeks.",
        hasChart: true,
      };
    } else if (input.includes("price") || input.includes("value")) {
      return {
        content:
          "Current market prices are reflecting strong fundamentals. Key support and resistance levels are holding, indicating healthy market structure.",
        hasChart: Math.random() > 0.4,
      };
    } else {
      const responses = [
        "I can help you analyze cryptocurrency markets, trends, and provide technical insights. What specific crypto topic would you like to explore?",
        "Based on current market conditions, there are several interesting developments worth discussing. Would you like me to elaborate on any particular aspect?",
        "The crypto market is showing interesting patterns. I can provide analysis on specific coins, market trends, or trading strategies. What interests you most?",
        "Let me analyze that for you. The current market sentiment and on-chain data suggest some key trends that could be valuable for your trading decisions.",
      ];
      return {
        content: responses[Math.floor(Math.random() * responses.length)],
        hasChart: Math.random() > 0.7,
      };
    }
  };

  const createNewChat = () => {
    const newChatId = `chat_${Date.now()}`;
    const newChat = {
      id: newChatId,
      title: "New Chat",
      active: false,
    };

    setChatHistory((prev) => {
      const updated = prev.map((chat) => ({ ...chat, active: false }));
      return [newChat, ...updated];
    });

    setAllMessages((prev) => ({
      ...prev,
      [newChatId]: [],
    }));

    setActiveChat(newChatId);
  };

  const switchChat = (chatId) => {
    setChatHistory((prev) =>
      prev.map((chat) => ({ ...chat, active: chat.id === chatId }))
    );
    setActiveChat(chatId);
  };

  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
    setAllMessages((prev) => {
      const { [chatId]: deleted, ...rest } = prev;
      return rest;
    });

    if (activeChat === chatId) {
      const remainingChats = chatHistory.filter((chat) => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setActiveChat(remainingChats[0].id);
      }
    }
  };

  const updateChatTitle = (chatId, newTitle) => {
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, title: newTitle } : chat
      )
    );
  };

  return (
    <div className="overflow-y-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-emerald-500" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Crypto Market Analytics
            </h1>
            <p className="text-sm text-gray-500">
              AI-powered cryptocurrency insights and analysis
            </p>
          </div>
        </div>
      </div>
      <div className="max-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div
          className={`${
            sidebarCollapsed ? "w-16" : "w-64"
          } transition-all duration-300 bg-white border-r border-gray-200 flex flex-col`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            {!sidebarCollapsed && (
              <div className="flex items-center justify-end mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(true)}
                  className="text-gray-600 hover:text-gray-900 p-1"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </div>
            )}

            {sidebarCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(false)}
                className="text-gray-600 hover:text-gray-900 p-2 w-full"
              >
                <Menu className="w-4 h-4" />
              </Button>
            )}

            {!sidebarCollapsed && (
              <Button
                onClick={createNewChat}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white border border-gray-300 rounded-lg py-3 text-sm font-medium"
              >
                <Plus className="w-4 h-6 mr-2" />
                New Chat
              </Button>
            )}
          </div>

          {/* Chat History */}
          <div className="flex-1 px-2 py-2">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                className={`group relative rounded-lg mb-1 ${
                  chat.active ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
              >
                <Button
                  variant="ghost"
                  className={`w-full justify-start p-3 h-auto text-left ${
                    chat.active
                      ? "text-gray-900"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  onClick={() => switchChat(chat.id)}
                >
                  {sidebarCollapsed ? (
                    <MessageSquare className="w-4 h-4" />
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span className="truncate text-sm">{chat.title}</span>
                    </>
                  )}
                </Button>

                {!sidebarCollapsed && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 text-gray-500 hover:text-gray-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newTitle = prompt("Enter new title:", chat.title);
                        if (newTitle) updateChatTitle(chat.id, newTitle);
                      }}
                    >
                      <Edit3 className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 text-gray-500 hover:text-red-600"
                      onClick={(e) => deleteChat(chat.id, e)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className=" max-h-[800px] flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <TrendingUp className="w-16 h-16 mb-4 text-gray-300" />
                <h3 className="text-xl font-medium mb-2">
                  Start a new conversation
                </h3>
                <p className="text-center max-w-md">
                  Ask me about cryptocurrency markets, trading strategies, or
                  technical analysis.
                </p>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-4 ${
                      msg.type === "user" ? "justify-end" : ""
                    }`}
                  >
                    {msg.type === "assistant" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-3xl ${
                        msg.type === "user" ? "order-1" : ""
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          msg.type === "user"
                            ? "bg-blue-500 text-white ml-auto"
                            : "bg-white text-gray-900 shadow-sm border border-gray-200"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>

                        {msg.hasChart && (
                          <div className="mt-4 space-y-3">
                            {/* Chart Controls */}
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-3 py-1 rounded-full"
                              >
                                Funding Rate
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-gray-600 text-xs px-3 py-1 rounded-full border-gray-300"
                              >
                                Open Interest
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-gray-600 text-xs px-3 py-1 rounded-full border-gray-300"
                              >
                                Volume
                              </Button>
                            </div>

                            {/* Chart */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                              <div className="relative h-64 w-full">
                                {/* Y-axis labels */}
                                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500 pr-4">
                                  <span>0.15%</span>
                                  <span>0.10%</span>
                                  <span>0.05%</span>
                                  <span>0.00%</span>
                                  <span>-0.05%</span>
                                  <span>-0.10%</span>
                                </div>

                                {/* Chart area */}
                                <div className="ml-12 mr-4 h-full relative">
                                  {/* Grid lines */}
                                  <div className="absolute inset-0">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                      <div
                                        key={i}
                                        className="absolute w-full border-t border-gray-200"
                                        style={{ top: `${(i * 100) / 5}%` }}
                                      />
                                    ))}
                                  </div>

                                  {/* Data visualization */}
                                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between">
                                    {Array.from({ length: 24 }).map((_, i) => (
                                      <div
                                        key={i}
                                        className="flex flex-col items-center flex-1"
                                      >
                                        <div
                                          className={`w-1.5 mb-1 rounded-t ${
                                            Math.random() > 0.5
                                              ? "bg-emerald-400"
                                              : "bg-red-400"
                                          }`}
                                          style={{
                                            height: `${
                                              Math.random() * 120 + 20
                                            }px`,
                                            opacity: 0.7,
                                          }}
                                        />
                                      </div>
                                    ))}
                                  </div>

                                  {/* Trend line */}
                                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    <path
                                      d={`M 0 ${
                                        200 - Math.random() * 100
                                      } ${Array.from(
                                        { length: 23 },
                                        (_, i) =>
                                          `L ${((i + 1) * 100) / 23} ${
                                            200 - Math.random() * 160
                                          }`
                                      ).join(" ")}`}
                                      stroke="#10b981"
                                      strokeWidth="2"
                                      fill="none"
                                      className="drop-shadow-sm"
                                    />
                                  </svg>
                                </div>

                                {/* X-axis labels */}
                                <div className="absolute bottom-0 left-12 right-4 flex justify-between text-xs text-gray-500">
                                  <span>00:00</span>
                                  <span>06:00</span>
                                  <span>12:00</span>
                                  <span>18:00</span>
                                  <span>24:00</span>
                                </div>
                              </div>
                            </div>

                            {/* Chart Summary */}
                            <div className="grid grid-cols-3 gap-4 text-xs">
                              <div className="text-center p-2 bg-gray-100 rounded-lg">
                                <p className="text-gray-500">Current Rate</p>
                                <p className="font-semibold text-emerald-600">
                                  0.045%
                                </p>
                              </div>
                              <div className="text-center p-2 bg-gray-100 rounded-lg">
                                <p className="text-gray-500">24h Change</p>
                                <p className="font-semibold text-red-600">
                                  -0.012%
                                </p>
                              </div>
                              <div className="text-center p-2 bg-gray-100 rounded-lg">
                                <p className="text-gray-500">Avg Rate</p>
                                <p className="font-semibold text-gray-700">
                                  0.038%
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {msg.type === "user" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-medium">
                          You
                        </span>
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white text-gray-900 shadow-sm border border-gray-200 rounded-2xl px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 py-2">
            <div className="max-w-full mx-auto">
              <div className="relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about crypto markets, trends, or analysis..."
                  className="w-full h-12 pr-12 py-4 text-base bg-gray-100 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-500 resize-none"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 rounded-xl p-2 disabled:opacity-50"
                  disabled={!message.trim() || isTyping}
                >
                  <Send className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
