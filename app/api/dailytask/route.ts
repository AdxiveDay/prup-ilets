// app/api/dailytasks/route.js

import { NextResponse } from 'next/server';

// ข้อมูล Task List ที่ถูกเก็บไว้ใน Server
const DailyTaskList = [
    { id: 1, Task: "Reading test", quest: 20, page: "Reading" }, // Note: page is 'Writing', quest is 20
    { id: 2, Task: "Reading test", quest: 20, page: "Reading" },
    { id: 3, Task: "Writing Essay", quest: 4.0, page: "Writing" },
    { id: 4, Task: "Reading test", quest: 20, page: "Reading" }, // Note: page is 'Writing', quest is 20
    { id: 5, Task: "Reading test", quest: 20, page: "Reading" },
    { id: 6, Task: "Reading test", quest: 20, page: "Reading" },
    { id: 7, Task: "Writing Essay", quest: 4.5, page: "Writing" },
    { id: 8, Task: "Reading test", quest: 20, page: "Reading" }, // Note: page is 'Writing', quest is 20
    { id: 9, Task: "Reading test", quest: 20, page: "Reading" },
    { id: 10, Task: "Reading test", quest: 20, page: "Reading" },
    { id: 11, Task: "Writing Essay", quest: 5.0, page: "Writing" },
    { id: 12, Task: "Reading test", quest: 20, page: "Reading" }, // Note: page is 'Writing', quest is 20
    { id: 13, Task: "Reading test", quest: 20, page: "Reading" },
    { id: 14, Task: "Reading test", quest: 20, page: "Reading" },
    { id: 15, Task: "Writing Essay", quest: 5.5, page: "Writing" },
    { id: 16, Task: "Reading test", quest: 20, page: "Reading" }, // Note: page is 'Writing', quest is 20
    { id: 17, Task: "Reading test", quest: 20, page: "Reading" },
    { id: 18, Task: "Reading test", quest: 20, page: "Reading" },
    { id: 19, Task: "Writing Essay", quest: 6.0, page: "Writing" },
    { id: 20, Task: "Reading test", quest: 20, page: "Reading" }, // Note: page is 'Writing', quest is 20
    { id: 21, Task: "Reading test", quest: 20, page: "Reading" },
    { id: 22, Task: "Reading test", quest: 20, page: "Reading" },
    { id: 23, Task: "Writing Essay", quest: 6.5, page: "Writing" },
    { id: 24, Task: "Reading test", quest: 20, page: "Reading" }, // Note: page is 'Writing', quest is 20
    { id: 25, Task: "Reading test", quest: 20, page: "Reading" },
    { id: 26, Task: "Reading test", quest: 20, page: "Reading" },
    { id: 27, Task: "Writing Essay", quest: 7.0, page: "Writing" },
    { id: 28, Task: "Reading test", quest: 20, page: "Reading" }, // Note: page is 'Writing', quest is 20
    { id: 29, Task: "Reading test", quest: 20, page: "Reading" },
    { id: 30, Task: "Reading test", quest: 20, page: "Reading" },
];

// ฟังก์ชัน GET สำหรับดึงข้อมูล DailyTaskList ทั้งหมด
export async function GET() {
    // ในโลกจริง คุณจะดึงข้อมูลนี้จาก Database
    return NextResponse.json(DailyTaskList, { status: 200 });
}