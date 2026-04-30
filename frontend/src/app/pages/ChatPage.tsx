// src/pages/ChatPage.jsx
import { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: "Hello. I'm here to listen. How are you feeling right now?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // Mock API Call to LLM
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        text: "I hear you. Taking time to process these feelings is an important step. Would you like to explore where that frustration might be stemming from?"
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden animate-slide-up">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Amaithi Guide</h3>
            <p className="text-xs text-slate-500">Always here for you</p>
          </div>
        </div>
      </div>

      {/* Chat Canvas */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-sm text-[15px] leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-sm' 
                : 'bg-white border border-slate-100 text-slate-700 rounded-bl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 text-slate-400 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm flex gap-1.5 items-center">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your thoughts..."
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-full py-3.5 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all"
          />
          <button 
            type="submit" 
            disabled={!input.trim()}
            className="absolute right-2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
          </button>
        </form>
      </div>
    </div>
  );
}