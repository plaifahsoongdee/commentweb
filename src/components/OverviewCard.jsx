// นำเข้า React
import React from 'react';

// คอมโพเนนต์ OverviewCard สำหรับแสดงการ์ดข้อมูลสรุป
// รับ props: title (ชื่อหัวข้อ), value (ค่าแสดงในการ์ด), percentage (เปอร์เซ็นต์การเปลี่ยนแปลง), 
// entries (รายการที่เกี่ยวข้อง), และ onClick (ฟังก์ชันเรียกใช้เมื่อคลิกการ์ด)
function OverviewCard({ title, value, percentage, entries = [], onClick }) {
  return (
    // ส่วนของการ์ดที่จะแสดงข้อมูล โดยสามารถคลิกได้และเรียกใช้ฟังก์ชัน onClick
    <div onClick={onClick} style={{
      backgroundColor: "#FFE4E1", // พื้นหลังสีชมพูอ่อน
      borderRadius: "10px", // มุมของการ์ดโค้งมน
      padding: "1rem", // เพิ่ม padding ภายในการ์ด
      textAlign: "center", // จัดข้อความให้อยู่กึ่งกลาง
      cursor: "pointer", // แสดงเป็นมือเมื่อนำเมาส์ไปชี้
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" // เงารอบการ์ด
    }}>
      {/* ชื่อหัวข้อของการ์ด */}
      <div style={{ color: "#FF69B4", fontSize: "18px", fontWeight: "bold" }}>{title}</div>
      {/* ค่าที่จะแสดงในการ์ด */}
      <p style={{ color: "#FF1493", fontSize: "24px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

// ส่งออกคอมโพเนนต์ OverviewCard เพื่อใช้งานในไฟล์อื่น
export default OverviewCard;
