"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const LOCAL_STORAGE_KEY = 'prupIELTS_nextTaskID';

export default function Home() {

  const router = useRouter()
  const [CurrentID, setCurrentID] = useState(1)
  const [DailyTaskList, setDailyTaskList] = useState<any[]>([])

  const todayTask = DailyTaskList.find(task => task.id === CurrentID)

  useEffect(() => {
    const storedId = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedId) {
      setCurrentID(parseInt(storedId, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, CurrentID.toString());
  }, [CurrentID]);

  useEffect(() => {
    fetch("/api/dailytask")
      .then(res => res.json())
      .then(data => setDailyTaskList(data))
  }, [])

  const GoNext = () => {
    let Path = ""

    if (todayTask?.page) {
      Path = "/" + todayTask.page
    } else {
      Path = "/"
    }

    router.push(Path)
    setCurrentID(CurrentID + 1)
  }

  console.log("KEY =", process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  return (
    <div className="font-sans m-7 sm:mx-15">

      <nav className="flex justify-between items-center">
        <div className="font-bold text-3xl hidden sm:block text-blue-500">
          <h1>Prup IELTS</h1>
        </div>
        <ul className="flex gap-6">
          <li className="duration-200 hover:scale-105 cursor-pointer"><a href="/">Home</a></li>
          <li className="duration-200 hover:scale-105 cursor-pointer"><a href="Reading">Reading</a></li>
          <li className="duration-200 hover:scale-105 cursor-pointer"><a href="Writing">Writing</a></li>
          <li className="duration-200 hover:scale-105 cursor-pointer">Listening</li>
          <li className="duration-200 hover:scale-105 cursor-pointer">Speaking</li>
        </ul>
      </nav>

      <div className="sm:flex col-auto mt-28 justify-center items-center gap-16">
        {todayTask ? (
          <div className="">
            <h1 className="font-bold text-4xl text-blue-500">Today Task</h1>
            <h1 className="p-2 bg-blue-500 text-white mt-8 mb-20 w-[350px] rounded-md">
              {todayTask.Task} : {todayTask.quest}
            </h1>
            <button onClick={GoNext} className="bg-amber-400 text-gray-800 font-bold duration-200 hover:scale-105 cursor-pointer rounded-full p-4 px-8">
              Start Task
            </button>
          </div>
        ) : (
          <div className="">
            <p>Task ทั้งหมดเสร็จสิ้นแล้วครับ! 🎉</p>
          </div>
        )}
        <div className="">
          <div className="w-[350px] sm:w-[650px] mt-8 sm:mt-0 h-[400px] rounded-md bg-gray-100">
          </div>
        </div>
      </div>
    </div>
  );
}
