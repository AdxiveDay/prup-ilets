"use client"

import { useState } from "react"
import YoutubeClip from "@/app/component/videoYoutube"

export default function WritingPage() {

  const videos = [
    { id: 1, type: "Reading", title: "How to Improve Reading Skill", embed: "ZO_SFaBjBn0?si=YHCTsLZIz7dNEXxm" },
    { id: 2, type: "Reading", title: "IELTS Reading Tips for Band 8+", embed: "fbzewKhiMA4?si=bD3yDIF5xVpVImUI" },
    { id: 3, type: "Reading", title: "Skimming & Scanning Techniques", embed: "-B0TW7L3a8s?si=mXeKtCrdhMaHsPO5" },
    { id: 4, type: "Writing", title: "สอนเขียน Line Graph Band 7 (ฟรี) IELTS Writing Task 1 ดูจบเขียนได้เลย!", embed: "alavo9HcEuE?si=IaDvZYuUiPoJPgbi" },
    { id: 5, type: "Writing", title: "Format IELTS Writing7.0 จำไปตอบได้เลย", embed: "ji1GQvWnV6Q?si=qHgdZCoUZceIUYLh" },
    { id: 6, type: "Writing", title: "แนะนำการสอบ IELTS Writing & Speaking โดยเด็กที่แกรมม่าห่วยแตก", embed: "DCHzYeGFAes?si=hD_wDOnB3hYdaRLj" },
  ]

  const [filter, setFilter] = useState<string>("Reading")

  const filteredVideos = videos.filter((v) => v.type === filter)

  return (
    <div className="font-sans m-7 sm:mx-15">
      {/* Navbar */}
      <nav className="flex justify-between items-center">
        <div className="font-bold text-3xl text-blue-500 hidden sm:block"><h1>Prup IELTS</h1></div>
        <ul className="flex gap-6">
          <li className="duration-200 hover:scale-105 cursor-pointer"><a href="/">Home</a></li>
          <li className="duration-200 hover:scale-105 cursor-pointer"><a href="Video">Course</a></li>
          <li className="duration-200 hover:scale-105 cursor-pointer"><a href="Reading">Reading</a></li>
          <li className="duration-200 hover:scale-105 cursor-pointer"><a href="Writing">Writing</a></li>
        </ul>
      </nav>

      {/* Video Filter */}
      <div className="mt-10 text-center">
        <div className="flex justify-center gap-4">
          {["Reading", "Writing"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`rounded-full p-2 px-5 text-lg cursor-pointer font-semibold duration-200 hover:scale-105
                ${filter === type ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
          {filteredVideos.map((clip) => (
            <div key={clip.id} className="w-full max-w-lg">
              <YoutubeClip embedId={clip.embed} />
              <h3 className="text-lg font-medium mt-2 text-center text-gray-800">{clip.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
