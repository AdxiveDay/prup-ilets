"use client"

import { useState, useEffect } from "react"

export default function WritingPage() {
  const [Topic, setTopic] = useState("")
  const [Essay, setEssay] = useState("")
  const [Band, setBand] = useState<number | string>("")
  const [Recommendations, setRecommendations] = useState<string[]>([])
  const [loadingTopic, setLoadingTopic] = useState(true)
  const [loadingResult, setLoadingResult] = useState(false)

  // ✅ สุ่ม Topic จาก Gemini API
  useEffect(() => {
    const fetchTopic = async () => {
      setLoadingTopic(true)
      try {
        const res = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt:
              "Generate one IELTS Writing Task 2 topic in a short, natural sentence. Do not include quotes or extra text.",
          }),
        })
        const data = await res.json()
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No topic"
        setTopic(text.replace(/```/g, "").trim())
      } catch (err) {
        console.error(err)
        setTopic("Failed to fetch topic")
      }
      setLoadingTopic(false)
    }

    fetchTopic()
  }, [])

  // ✅ ตรวจ Essay และให้คะแนน
  const handleSubmit = async () => {
    if (!Essay) {
      alert("Please write your essay before submitting.")
      return
    }

    setLoadingResult(true)

    const prompt = `
You are an IELTS Writing examiner.
Evaluate the following essay. First, check if it matches the given topic.
If the essay is off-topic, reduce the band score accordingly.
Then, evaluate based on IELTS criteria (Task Response, Coherence, Lexical Resource, Grammar).
Respond in valid JSON like this:
{
  "Band": 0-9 (can be float),
  "Recommendation": [
    "Point 1",
    "Point 2",
    "Point 3"
  ]
}

Topic: "${Topic}"
Essay: "${Essay}"
    `

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}"
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim()

      let parsed
      try {
        parsed = JSON.parse(cleaned)
      } catch {
        parsed = { Band: "—", Recommendation: ["Invalid JSON format from Gemini"] }
      }

      setBand(parsed.Band || "—")
      setRecommendations(parsed.Recommendation || ["No feedback available"])
    } catch (err) {
      console.error(err)
      setBand("—")
      setRecommendations(["Error evaluating essay"])
    }

    setLoadingResult(false)
  }

  return (
    <div className="font-sans m-7 sm:mx-15">
      {/* Navbar */}
      <nav className="flex justify-between items-center">
        <div className="font-bold text-3xl hidden sm:block text-blue-500">
          <h1>Prup IELTS</h1>
        </div>
        <ul className="flex gap-6">
          <li className="hover:scale-105 duration-200 cursor-pointer">
            <a href="/">Home</a>
          </li>
          <li className="hover:scale-105 duration-200 cursor-pointer">
            <a href="/Reading">Reading</a>
          </li>
          <li className="hover:scale-105 duration-200 cursor-pointer">
            <a href="/Writing">Writing</a>
          </li>
          <li className="hover:scale-105 duration-200 cursor-pointer">Listening</li>
          <li className="hover:scale-105 duration-200 cursor-pointer">Speaking</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="col-auto sm:flex justify-center items-start gap-4 mt-24">
        {/* Left panel */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="bg-blue-500 text-white rounded-md w-[350px] p-4 text-md">
            Topic: {loadingTopic ? "Loading..." : Topic}
          </h1>

          <textarea
            rows={10}
            cols={41}
            className="bg-gray-100 p-4 rounded-md outline-none resize-none"
            placeholder="Write your essay here..."
            value={Essay}
            onChange={(e) => setEssay(e.target.value)}
          />

          <button
            className="bg-amber-400 text-gray-800 duration-200 mt-4 mb-6 hover:scale-105 cursor-pointer rounded-full py-4 px-8 font-bold"
            onClick={handleSubmit}
          >
            {loadingResult ? "Evaluating..." : "Submit"}
          </button>
        </div>

        {/* Right panel (Result) */}
        <div className="bg-gray-100 rounded-md p-6 w-[650px] h-[500px] overflow-auto shadow-md">
          <h1 className="text-4xl font-bold text-blue-600">Band: {Band}</h1>

          <h2 className="text-lg mt-8 font-bold text-gray-700">Recommendations:</h2>
          <ul className="list-disc ml-6 mt-2 text-gray-800">
            {Recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
