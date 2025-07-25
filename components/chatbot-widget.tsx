"use client"

import { useEffect, useState } from "react"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { Send } from "lucide-react"

export function ChatbotWidget() {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([])
  const [input, setInput] = useState("")

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition.")
    }
  }, [browserSupportsSpeechRecognition])

  const handleSend = (message: string) => {
    const newMessages = [...messages, { text: message, sender: "user" }]
    setMessages(newMessages)
    setInput("")

    setTimeout(() => {
      const response = getBotResponse(message)
      setMessages([...newMessages, { text: response, sender: "bot" }])
    }, 800)
  }

  const getBotResponse = (input: string) => {
    const responses: Record<string, string> = {
      "hello": "Hi there! How can I assist you today?",
      "book appointment": "Sure, please provide the doctor's name and your preferred time.",
      "give me his appointment details": `Dr. Priya Narayan\nSpecialty: Orthopedic & Trauma Specialist\nExperience: 8 years\nClinic: HealthPlus Ortho Center, Bangalore\nExpertise: Musculoskeletal Pain, Bone Fracture, Posture Therapy\nAvailable: Mon–Fri, 11 AM–6 PM`,
      "confirm booking": "Your booking has been confirmed. Thank you!"
    }
    return responses[input.toLowerCase()] || "I'm sorry, I didn't understand that. Can you rephrase?"
  }

  const handleVoiceInput = () => {
    SpeechRecognition.startListening({ continuous: true })
  }

  const handleStopVoice = () => {
    SpeechRecognition.stopListening()
    handleSend(transcript)
    resetTranscript()
  }

  return (
    <div className="fixed bottom-6 right-6 w-[360px] rounded-xl shadow-lg bg-white border border-gray-300 overflow-hidden z-50">
      <div className="bg-gradient-to-r from-blue-500 to-green-500 px-4 py-2 text-white font-semibold">HealthBot Assistant</div>
      <div className="h-[300px] overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg text-sm ${msg.sender === "user" ? "bg-blue-100 text-right ml-auto" : "bg-gray-100"}`}
          >
            {msg.text.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t p-2">
        <button
          className="px-2 py-1 bg-green-100 text-green-700 rounded"
          onClick={handleVoiceInput}
          disabled={listening}
        >
          🎙️ Speak
        </button>
        <button
          className="px-2 py-1 bg-red-100 text-red-700 rounded"
          onClick={handleStopVoice}
          disabled={!listening}
        >
          ⏹️ Stop
        </button>
        <input
          className="flex-1 px-3 py-1 border rounded"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          placeholder="Type your message..."
        />
        <button onClick={() => handleSend(input)} className="text-blue-500">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
