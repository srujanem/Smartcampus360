import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { CHAT_RESPONSES } from '../constants';
import { ChatMessage } from '../types';
import { cn } from '../lib/utils';

export default function ChatPage() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your CampusVerse AI assistant. How can I help you navigate the campus today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let responseText = CHAT_RESPONSES['default'];

      for (const key in CHAT_RESPONSES) {
        if (lowerInput.includes(key)) {
          responseText = CHAT_RESPONSES[key];
          break;
        }
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestions = [
    "Where is CSE Block?",
    "What are today's events?",
    "Where is placement cell?"
  ];

  return (
    <div className="pt-20 pb-10 px-4 max-w-4xl mx-auto h-screen flex flex-col">
      <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Bot className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Campus Assistant</h2>
              <div className="flex items-center text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
                Online
              </div>
            </div>
          </div>
          <Sparkles className="text-blue-400 w-5 h-5" />
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex items-end space-x-2",
                msg.sender === 'user' ? "flex-row-reverse space-x-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                msg.sender === 'ai' ? "bg-blue-100 text-blue-600" : "bg-slate-200 text-slate-600"
              )}>
                {msg.sender === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div className={cn(
                "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                msg.sender === 'ai'
                  ? "bg-white text-slate-800 rounded-bl-none border border-slate-100"
                  : "bg-blue-600 text-white rounded-br-none"
              )}>
                {msg.text}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm flex space-x-1">
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-slate-100">
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-600 text-xs font-medium rounded-full border border-slate-200 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
