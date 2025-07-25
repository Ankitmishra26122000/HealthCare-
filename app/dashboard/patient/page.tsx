"use client"

import { useState, useRef, useEffect } from "react"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { Mic, Send, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChatbotWidget() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([])
  const [input, setInput] = useState("")
  const chatEndRef = useRef<HTMLDivElement>(null)

  const { transcript, listening, resetTranscript } = useSpeechRecognition()

  const handleSend = () => {
    if (!input.trim()) return

    const newMessages = [...messages, { sender: "user", text: input }]
    setMessages(newMessages)
    setInput("")

    // Dummy reply logic (can be replaced with API call)
    const reply = getBotReply(input)
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: reply }])
    }, 500)
  }

  const handleVoiceInput = () => {
    if (!listening) {
      resetTranscript()
      SpeechRecognition.startListening({ continuous: false })
    } else {
      SpeechRecognition.stopListening()
      setInput(transcript)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: `Uploaded file: ${file.name}` },
        { sender: "bot", text: `File "${file.name}" received. We'll review it shortly.` }
      ])
    }
  }

  const getBotReply = (msg: string) => {
    const lower = msg.toLowerCase()
    if (lower.includes("appointment")) return "You can book appointments from the Appointments section."
    if (lower.includes("prescription")) return "Your prescriptions are available in the Prescriptions tab."
    if (lower.includes("pain") || lower.includes("doctor")) return "Please consult with a specialist. Would you like help booking?"
    return "I'm here to assist with medical queries, appointments, and records."
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border border-gray-300 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 font-bold text-lg">
        🩺 MedBot Assistant
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 h-80">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm px-3 py-2 rounded-xl max-w-[80%] ${
              msg.sender === "user"
                ? "bg-blue-100 text-right ml-auto"
                : "bg-gray-100 text-left mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="flex items-center px-2 py-2 gap-2 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-3 py-1 text-sm border rounded-full focus:outline-none"
          placeholder="Ask something..."
        />
        <Button size="icon" variant="ghost" onClick={handleVoiceInput}>
          <Mic className={`w-5 h-5 ${listening ? "text-red-500 animate-pulse" : ""}`} />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleSend}>
          <Send className="w-5 h-5" />
        </Button>
        <label>
          <Upload className="w-5 h-5 cursor-pointer" />
          <input type="file" hidden onChange={handleFileUpload} />
        </label>
      </div>
    </div>
  )
}
