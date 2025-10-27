"use client"

import { useEffect, useState } from "react"

export default function ReadingPage() {
  const [Passages, setPassages] = useState<string[]>([])
  const [QuestionList, setQuestionList] = useState<any[]>([])
  const [CurrentID, setCurrentID] = useState(1)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch("/api/dailytask")
      const data = await res.json()
      const readingTask = data.find((t: any) => t.Task === "Reading test")
      if (readingTask) {
        await generateQuestions(readingTask.quest)
      }
      setLoading(false)
    }
    fetchTask()
  }, [])

  const generateQuestions = async (questCount: number) => {
    let allQuestions: any[] = []
    let allPassages: string[] = []
    let totalGenerated = 0

    while (totalGenerated < questCount) {
      const batchCount = Math.min(5, questCount - totalGenerated)
      const prompt = `
Generate ${batchCount} IELTS Reading multiple choice questions with ONE passage.
1. Provide a Passage (150-200 words)
2. Generate ${batchCount} questions based on that passage
3. Each question must have:
   - Question text
   - Four options (C1,C2,C3,C4)
   - Correct answer key (1-4)
Respond as JSON:
{
  "Passage":"...",
  "Questions":[
    {"Question":"...", "C1":"...", "C2":"...", "C3":"...", "C4":"...", "Answer":1}
  ]
}
Respond with valid JSON only.
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
        const parsed = JSON.parse(cleaned)

        const questionsWithID = parsed.Questions.map((q: any, idx: number) => ({
          ...q,
          id: totalGenerated + idx + 1,
          passageIndex: allPassages.length,
        }))

        allQuestions = [...allQuestions, ...questionsWithID]
        allPassages.push(parsed.Passage)
        totalGenerated += batchCount
      } catch (err) {
        console.error(err)
        break
      }
    }

    setQuestionList(allQuestions)
    setPassages(allPassages)
  }

  const todayTask = QuestionList[CurrentID - 1]
  const todayPassage = todayTask ? Passages[todayTask.passageIndex] : ""

  const GoBackQuestiong = () => {
    if (CurrentID > 1) setCurrentID(CurrentID - 1)
  }

  const GoNextQuestiong = () => {
    if (CurrentID < QuestionList.length) setCurrentID(CurrentID + 1)
  }

  const handleSelect = (choiceNumber: number) => {
    if (todayTask?.Answer === choiceNumber) setScore(score + 1)
    if (CurrentID < QuestionList.length) setCurrentID(CurrentID + 1)
    else setCurrentID(CurrentID + 1) // trigger สรุปคะแนน
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-80">
        <p className="font-bold text-3xl text-gray-500">Genarating Questions..</p>
      </div>
    )
  }

  return (
    <div className="font-sans m-7 font-semibold sm:mx-15">
      <nav className="flex justify-between items-center">
        <div className="font-bold text-3xl text-blue-500 hidden sm:block"><h1>Prup IELTS</h1></div>
        <ul className="flex gap-6">
          <li className="duration-200 hover:scale-105 cursor-pointer"><a href="/">Home</a></li>
                              <li className="duration-200 hover:scale-105 cursor-pointer"><a href="Video">Course</a></li>
          <li className="duration-200 hover:scale-105 cursor-pointer"><a href="Reading">Reading</a></li>
          <li className="duration-200 hover:scale-105 cursor-pointer"><a href="Writing">Writing</a></li>
        </ul>
      </nav>

      {todayTask && CurrentID <= QuestionList.length ? (
        <div className="flex justify-center gap-10 sm:gap-36 mt-24 items-center">
          <button className="p-3 items-center flex rounded-full bg-amber-500 rotate-180 text-white font-bold duration-200 hover:scale-103 cursor-pointer" onClick={GoBackQuestiong}><img src="/image%2082.png"></img></button>
          <div className="flex-col max-w-[900px]">
            <h1 className="bg-gray-100 p-4 rounded-md">{todayPassage}</h1>
            <h1 className="font-bold text-2xl my-8">{todayTask.Question}</h1>
            <h1 onClick={() => handleSelect(1)} className="cursor-pointer duration-200 hover:translate-x-2">1 : {todayTask.C1}</h1>
            <h1 onClick={() => handleSelect(2)} className="cursor-pointer my-2 duration-200 hover:translate-x-2">2 : {todayTask.C2}</h1>
            <h1 onClick={() => handleSelect(3)} className="cursor-pointer duration-200 hover:translate-x-2">3 : {todayTask.C3}</h1>
            <h1 onClick={() => handleSelect(4)} className="cursor-pointer my-2 duration-200 hover:translate-x-2">4 : {todayTask.C4}</h1>
          </div>
          <button className="p-3 rounded-full bg-blue-500 text-white font-bold items-center flex duration-200 hover:scale-103 cursor-pointer" onClick={GoNextQuestiong}><img src="/image%2082.png"></img></button>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-72">
          <p className="font-bold text-4xl">Congraduation! You done for today ({score} points)</p>
        </div>
      )}
    </div>
  )
}
