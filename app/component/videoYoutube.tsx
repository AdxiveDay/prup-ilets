import React from "react";
// ไม่จำเป็นต้อง import PropTypes อีกต่อไปเมื่อใช้ TypeScript
// import PropTypes from "prop-types"; 

// 1. สร้าง Interface เพื่อกำหนดชนิดของ Props
interface YoutubeEmbedProps {
  embedId: string; // ระบุชัดเจนว่า embedId ต้องเป็นชนิด string
}

// 2. ใช้ Interface นั้นกับ Functional Component
// และเปลี่ยนไปใช้ JSX tag ที่ถูกหลัก (allowFullScreen, frameBorder)
const YoutubeVideo: React.FC<YoutubeEmbedProps> = ({ embedId }) => (
    <div className="video-responsive font-semibold">
        <iframe 
            width="560" 
            height="315" 
            src={`https://www.youtube.com/embed/${embedId}`} 
            title="YouTube video player" 
            frameBorder="0" // ใช้ Camel Case
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen // ใช้ Camel Case
        />
    </div>
);

// 3. ไม่จำเป็นต้องใช้ .propTypes แล้วเมื่อใช้ TypeScript
// แต่ถ้าต้องการระบุว่า prop นี้เป็น Required ให้ใช้เครื่องหมาย ? สำหรับ Optional Prop ใน Interface

export default YoutubeVideo;