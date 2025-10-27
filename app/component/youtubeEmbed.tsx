import React from "react";
// ไม่จำเป็นต้อง import PropTypes อีกต่อไปเมื่อใช้ TypeScript
// import PropTypes from "prop-types"; 

// 1. สร้าง Interface เพื่อกำหนดชนิดของ Props
interface YoutubeEmbedProps {
  embedId: string; // ระบุชัดเจนว่า embedId ต้องเป็นชนิด string
}

// 2. ใช้ Interface นั้นกับ Functional Component
// และเปลี่ยนไปใช้ JSX tag ที่ถูกหลัก (allowFullScreen, frameBorder)
const YoutubeEmbed: React.FC<YoutubeEmbedProps> = () => (
    <div className="video-responsive">
        <iframe width="650px" height="400px" src="https://www.youtube.com/embed/ZO_SFaBjBn0?si=YHCTsLZIz7dNEXxm" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe>
    </div>
);

// 3. ไม่จำเป็นต้องใช้ .propTypes แล้วเมื่อใช้ TypeScript
// แต่ถ้าต้องการระบุว่า prop นี้เป็น Required ให้ใช้เครื่องหมาย ? สำหรับ Optional Prop ใน Interface

export default YoutubeEmbed;