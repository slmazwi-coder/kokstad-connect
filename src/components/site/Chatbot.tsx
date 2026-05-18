import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, GraduationCap } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

const GREETING =
  "Hello! I'm the Kokstad College assistant. I can help with admissions, fees, academics, contact info and more. What would you like to know?";

interface QA {
  keywords: string[];
  answer: string;
}

const knowledgeBase: QA[] = [
  {
    keywords: ["admission", "apply", "application", "enrol", "enroll", "register", "registration"],
    answer:
      "Applications for 2027 are open from 15 April to 31 August 2026. You can apply online on our Admissions page. You'll need the learner's birth certificate, parent ID, latest school report, transfer letter (if applicable), proof of residence, and a passport photo.",
  },
  {
    keywords: ["fee", "cost", "price", "tuition", "pay", "payment", "school fees"],
    answer:
      "2026 indicative fees: Grade 8-9 R18 000/year (R1 800/month), Grade 10-11 R20 000/year (R2 000/month), Grade 12 R22 000/year (R2 200/month). Payments can be made via EFT or cash at the school office. Visit our Fees page to upload proof of payment.",
  },
  {
    keywords: ["contact", "phone", "email", "call", "reach", "address", "location", "where"],
    answer:
      "Kokstad College is at The Avenue Street, Kokstad, KwaZulu-Natal, 4700. Phone: 039 727 2187. Email: principal@kokstadcollege.co.za. Office hours: Monday-Friday, 07:30-16:00.",
  },
  {
    keywords: ["academic", "curriculum", "subject", "stream", "matric", "grade", "caps"],
    answer:
      "We follow the CAPS curriculum from Grade 8 to 12. We offer three streams: Academic, Technical, and Commercial. Our matric pass rate consistently exceeds 92%, with the class of 2024 achieving a 95% pass rate.",
  },
  {
    keywords: ["sport", "rugby", "hockey", "netball", "cricket", "athletics", "soccer", "extra"],
    answer:
      "We offer rugby, hockey, netball, cricket, athletics, soccer, and a vibrant cultural programme. Our First XV rugby team recently won the Harry Gwala district final.",
  },
  {
    keywords: ["history", "founded", "old", "about", "principal", "heritage"],
    answer:
      "Kokstad College was founded in 1900 and has over 120 years of history serving the East Griqualand community. Our principal is Mr. Brophy. The school motto is 'Consiste Fide' (Stand Firm in Faith).",
  },
  {
    keywords: ["hour", "open", "time", "office", "when"],
    answer:
      "The school office is open Monday to Friday, 07:30 to 16:00. You can call 039 727 2187 during these hours.",
  },
  {
    keywords: ["document", "upload", "birth certificate", "report", "transfer", "proof"],
    answer:
      "Required documents for admission: learner's birth certificate (certified), parent/guardian ID (certified), latest school report, previous year's report, transfer letter (if applicable), proof of residence, and a passport photo of the learner. You can upload these on the Admissions page.",
  },
  {
    keywords: ["status", "track", "reference", "check application"],
    answer:
      "You can check your application status on our Admissions page using the tracker at the top. Enter your reference number (e.g. KC-2026-1234) and parent email to see your current status.",
  },
  {
    keywords: ["banking", "bank", "account", "eft", "transfer"],
    answer:
      "Banking details are available on our Fees & Payments page. Please use your child's surname and grade as the payment reference. You can pay via EFT bank transfer or cash at the school office.",
  },
  {
    keywords: ["uniform", "dress"],
    answer:
      "For uniform enquiries, please contact the school office at 039 727 2187 or email principal@kokstadcollege.co.za.",
  },
  {
    keywords: ["transport", "bus", "lift"],
    answer:
      "For transport arrangements, please contact the school office at 039 727 2187. They can advise on available transport options in your area.",
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "howzit"],
    answer:
      "Hello! Welcome to Kokstad College. How can I help you today? I can answer questions about admissions, fees, academics, sports, and more.",
  },
  {
    keywords: ["thank", "thanks", "cheers"],
    answer:
      "You're welcome! If you have any more questions, feel free to ask. You can also contact the school office at 039 727 2187.",
  },
];

const FALLBACK =
  "I'm not sure about that, but the school office can help! Call 039 727 2187 or email principal@kokstadcollege.co.za during office hours (Mon-Fri, 07:30-16:00). You can also use our Contact page to send a message.";

function findAnswer(input: string): string {
  const lower = input.toLowerCase();
  let bestMatch: QA | null = null;
  let bestScore = 0;

  for (const qa of knowledgeBase) {
    const score = qa.keywords.filter((kw) => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = qa;
    }
  }

  return bestMatch ? bestMatch.answer : FALLBACK;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: GREETING }]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { role: "user", text: trimmed };
    const botMsg: Message = { role: "bot", text: findAnswer(trimmed) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 flex flex-col bg-white rounded-2xl shadow-2xl border border-border overflow-hidden max-h-[70vh]">
          <div className="gradient-navy px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gold grid place-items-center">
              <GraduationCap className="text-navy" size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-display text-sm font-bold leading-tight">
                Kokstad College
              </p>
              <p className="text-white/60 text-xs">School Assistant</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-navy text-white rounded-br-md"
                      : "bg-secondary text-foreground rounded-bl-md"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-3 shrink-0">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-lg bg-navy text-white grid place-items-center hover:bg-navy-light transition disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full gradient-navy text-gold shadow-xl grid place-items-center hover:scale-105 transition-transform"
        aria-label="Open chat"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}
