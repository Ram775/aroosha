// src/components/ui/JobChatbot.jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, CheckCircle, AlertCircle, Upload, FileText, ArrowLeft } from "lucide-react";

export default function JobChatbot({ job, isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
    currentCompany: "",
    whyYou: "",
    resume: null,
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isEligible, setIsEligible] = useState(null);
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const questions = [
    {
      id: "name",
      question: "👋 Hi! I'm the Aroosha Hiring Bot. Let's start with your name?",
      type: "text",
      placeholder: "Enter your full name",
      validate: (val) => val.trim().length > 0,
      error: "Please enter your name",
      next: "email"
    },
    {
      id: "email",
      question: "📧 Great! What's your email address?",
      type: "text",
      placeholder: "you@example.com",
      validate: (val) => /\S+@\S+\.\S+/.test(val),
      error: "Please enter a valid email",
      next: "phone"
    },
    {
      id: "phone",
      question: "📱 And your phone number?",
      type: "text",
      placeholder: "+91 98765 43210",
      validate: (val) => val.trim().length > 9,
      error: "Please enter a valid phone number",
      next: "experience"
    },
    {
      id: "experience",
      question: "💼 How many years of experience do you have?",
      type: "select",
      options: ["Fresher", "1-2 Years", "3-5 Years", "5-8 Years", "8+ Years"],
      placeholder: "Select your experience",
      next: "skills"
    },
    {
      id: "skills",
      question: `🛠️ What are your key skills? (comma separated)\nRequired for this job: ${job.skills?.join(", ") || "Not specified"}`,
      type: "text",
      placeholder: "e.g. React, Node.js, AWS",
      validate: (val) => val.trim().length > 0,
      error: "Please enter your skills",
      next: "currentCompany"
    },
    {
      id: "currentCompany",
      question: "🏢 Are you currently working? If yes, tell us your company name.",
      type: "text",
      placeholder: "Company name (or type 'Not working')",
      next: "whyYou"
    },
    {
      id: "whyYou",
      question: "💡 Why do you want to join Aroosha Technologies?",
      type: "textarea",
      placeholder: "Tell us why you're interested...",
      validate: (val) => val.trim().length > 10,
      error: "Please tell us why you want to join",
      next: "resume"
    },
    {
      id: "resume",
      question: "📄 Great! Upload your resume (PDF or DOCX)",
      type: "file",
      accept: ".pdf,.doc,.docx",
      next: "complete"
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setMessages([
        { type: "bot", text: "👋 Welcome to Aroosha Technologies! I'm your hiring assistant." },
        { type: "bot", text: `📌 You're applying for: ${job.title} (${job.type})` }
      ]);
      setTimeout(() => {
        setMessages(prev => [...prev, { type: "bot", text: questions[0].question }]);
        setStep(0);
      }, 1500);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() && !fileInputRef.current?.files[0]) return;

    const currentQ = questions[step];
    let value = input.trim();

    if (currentQ.type === "file") {
      const file = fileInputRef.current?.files[0];
      if (!file) {
        setMessages(prev => [...prev, { type: "bot", text: "⚠️ Please upload your resume to continue." }]);
        return;
      }
      value = file.name;
      setUserData(prev => ({ ...prev, resume: file }));
    }

    // Add user message
    setMessages(prev => [...prev, { type: "user", text: value || "File uploaded" }]);
    setInput("");

    // Validate if needed
    if (currentQ.validate && !currentQ.validate(value) && currentQ.type !== "file") {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: "bot", text: `❌ ${currentQ.error}` }]);
        setTimeout(() => {
          setMessages(prev => [...prev, { type: "bot", text: currentQ.question }]);
        }, 800);
      }, 500);
      return;
    }

    // Save data
    if (currentQ.type !== "file") {
      setUserData(prev => ({ ...prev, [currentQ.id]: value }));
    }

    // Check eligibility after skills
    if (currentQ.id === "skills" && job.skills) {
      const userSkills = value.toLowerCase().split(",").map(s => s.trim());
      const jobSkills = job.skills.map(s => s.toLowerCase());
      const matched = jobSkills.filter(s => 
        userSkills.some(us => us.includes(s) || s.includes(us))
      );
      const eligible = matched.length >= 2;
      setIsEligible(eligible);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: "bot", 
          text: eligible 
            ? "✅ Great! Your skills match our requirements!" 
            : "⚠️ Your skills partially match. We still encourage you to apply!"
        }]);
      }, 500);
    }

    // Move to next step
    const nextStep = step + 1;
    setTimeout(() => {
      if (nextStep < questions.length) {
        const nextQ = questions[nextStep];
        setStep(nextStep);
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, { type: "bot", text: nextQ.question }]);
          if (nextQ.type === "select") {
            setMessages(prev => [...prev, { 
              type: "bot", 
              text: `Options: ${nextQ.options.join(" • ")}`,
              isOption: true
            }]);
          }
        }, 600);
      } else {
        setIsComplete(true);
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            type: "bot", 
            text: "🎉 Thank you! Your application has been submitted successfully!",
            isFinal: true
          }]);
          setMessages(prev => [...prev, { 
            type: "bot", 
            text: "📨 We'll review your application and get back to you within 2-3 business days.",
            isFinal: true
          }]);
        }, 500);
      }
    }, 800);
  };

  const handleOptionClick = (option) => {
    setInput(option);
    setTimeout(() => handleSend(), 100);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validTypes.includes(file.type)) {
        setUserData(prev => ({ ...prev, resume: file }));
        setMessages(prev => [...prev, { type: "user", text: `📎 ${file.name}` }]);
        
        const currentQ = questions[step];
        const nextStep = step + 1;
        setTimeout(() => {
          if (nextStep < questions.length) {
            const nextQ = questions[nextStep];
            setStep(nextStep);
            setTimeout(() => {
              setMessages(prev => [...prev, { type: "bot", text: nextQ.question }]);
            }, 500);
          } else {
            setIsComplete(true);
            setTimeout(() => {
              setMessages(prev => [...prev, { 
                type: "bot", 
                text: "🎉 Thank you! Your application has been submitted successfully!",
                isFinal: true
              }]);
            }, 500);
          }
        }, 500);
      } else {
        setMessages(prev => [...prev, { 
          type: "bot", 
          text: "⚠️ Please upload PDF or DOCX file only." 
        }]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          className="bg-card rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-heading text-sm">Hiring Assistant</h3>
                <p className="text-xs text-muted">Aroosha Technologies</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[55vh]">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.type === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                    <Bot size={12} className="text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3 rounded-xl text-sm ${
                    msg.type === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : msg.isFinal
                      ? "bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-300"
                      : "bg-muted text-text-body rounded-bl-none"
                  } ${msg.isOption ? "bg-primary/5 border border-primary/20" : ""}`}
                >
                  {msg.text}
                  {msg.isFinal && (
                    <div className="mt-3 flex gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-xs">Application Submitted</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-muted rounded-xl p-3 flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-75" />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-150" />
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          {!isComplete ? (
            <div className="border-t border-border p-4">
              {questions[step]?.type === "select" ? (
                <div className="flex flex-wrap gap-2">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptionClick(opt)}
                      className="px-4 py-2 bg-muted hover:bg-primary/10 text-text-body hover:text-primary rounded-xl text-sm transition-all duration-200"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : questions[step]?.type === "file" ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 px-4 py-3 border-2 border-dashed border-border rounded-xl hover:border-primary transition-colors flex items-center justify-center gap-2 text-muted hover:text-primary"
                  >
                    <Upload size={18} />
                    <span className="text-sm">Upload Resume</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {userData.resume && (
                    <span className="text-xs text-primary">{userData.resume.name}</span>
                  )}
                </div>
              ) : (
                <div className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder={questions[step]?.placeholder || "Type your answer..."}
                    className="flex-1 px-4 py-3 rounded-xl border border-border bg-body text-heading placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm"
                    autoFocus
                  />
                  <button
                    onClick={handleSend}
                    className="px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200"
                  >
                    <Send size={18} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="border-t border-border p-4">
              <button onClick={onClose} className="w-full btn-primary justify-center">
                Close
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}