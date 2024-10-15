// นำเข้า React และ useState hook สำหรับจัดการ state ของวันที่
import React, { useState } from 'react';

// นำเข้า Form จาก react-bootstrap เพื่อใช้เป็นแบบฟอร์มเลือกวันที่
import { Form } from 'react-bootstrap';

// ฟังก์ชันคอมโพเนนต์ DateFilter รับ prop setFilter เพื่อส่งค่าวันที่กลับไปยังคอมโพเนนต์แม่
function DateFilter({ setFilter }) {
  // สร้าง state ชื่อ date เพื่อเก็บค่าวันที่ที่เลือกโดยตั้งค่าเริ่มต้นเป็นค่าว่าง
  const [date, setDate] = useState("");

  // ฟังก์ชัน handleDateChange สำหรับจัดการการเปลี่ยนแปลงของวันที่
  const handleDateChange = (e) => {
    setDate(e.target.value); // อัปเดตค่า date ด้วยค่าวันที่ใหม่ที่ผู้ใช้เลือก
    setFilter({ type: "day", date: e.target.value }); // เรียกใช้ setFilter เพื่อส่งข้อมูลวันที่กลับในรูปแบบ { type: "day", date: "yyyy-mm-dd" }
  };

  // ส่วนแสดงผล UI
  return (
    <div className="d-flex gap-2"> {/* ใช้ flexbox จัดเรียงองค์ประกอบในแนวนอนด้วยระยะห่าง */}
      {/* ฟอร์มเลือกวันที่ โดยเรียกใช้ handleDateChange เมื่อมีการเปลี่ยนแปลง */}
      <Form.Control type="date" value={date} onChange={handleDateChange} />
    </div>
  );
}

export default DateFilter; // ส่งออกคอมโพเนนต์ DateFilter เพื่อให้สามารถนำไปใช้งานในไฟล์อื่นได้
