import React, { useState, useRef, useEffect, useMemo } from 'react';
// 1. استخدام المكتبة الرسمية
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage } from '../types';

declare global {
  interface Window {
    MathJax: any;
  }
}

export const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'مرحباً بك! أنا معلمك الذكي للرياضيات. كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن الجبر، الهندسة، أو أي مسألة رياضية تشغل بالك.', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 2. تصحيح طريقة استدعاء المفتاح ليتوافق مع Vite و Vercel
  const genAI = useMemo(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    return new GoogleGenerativeAI(apiKey);
  }, []);

  const chatSession = useMemo(() => {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // استخدام موديل مستقر وسريع
      systemInstruction: "أنت معلم رياضيات خبير ولطيف اسمك 'MathMaster AI'. مهمتك هي مساعدة الطلاب في حل المسائل الرياضية وشرح المفاهيم بوضوح تام باللغة العربية. استخدم تنسيق LaTeX للمعدلات.",
    });

    return model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });
  }, [genAI]);

  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch((err: any) => console.error('MathJax error:', err));
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // 3. طريقة الإرسال الصحيحة للموديل الجديد
      const result = await chatSession.sendMessage(input);
      const response = await result.response;
      const responseText = response.text();
      
      const aiMsg: ChatMessage = { role: 'assistant', content: responseText || '', timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg: ChatMessage = { 
        role: 'assistant', 
        content: "عذراً، حدث خطأ في الاتصال. تأكد من إعداد مفتاح API بشكل صحيح.", 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto glass-effect rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
      {/* الباقي من كود واجهة UI كما هو في ملفك الأصلي */}
      <div className="math-gradient p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full float-anim">
            <i className="fas fa-robot text-2xl"></i>
          </div>
          <div>
            <h3 className="font-bold text-xl">المعلم الذكي AI</h3>
            <p className="text-blue-100 text-sm">متصل الآن لمساعدتك</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base math-content">
                {msg.content}
              </div>
              <span className="text-[10px] opacity-60 mt-2 block">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2 bg-slate-100 p-2 rounded-2xl focus-within:ring-2 ring-blue-500 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب سؤالك أو إجابتك هنا..."
            className="flex-1 bg-transparent border-none focus:outline-none px-4 py-2 text-slate-700"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            <i className="fas fa-paper-plane-rtl transform -scale-x-100"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
