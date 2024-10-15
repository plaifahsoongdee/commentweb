  // นำเข้า React และ hooks: useEffect สำหรับการทำงานเมื่อค่า state หรือ props เปลี่ยนแปลง และ useState สำหรับสร้าง state ภายในคอมโพเนนต์
  import React, { useEffect, useState } from 'react';
  // นำเข้า Calendar คอมโพเนนต์จากไลบรารี react-calendar เพื่อแสดงปฏิทิน
  import Calendar from 'react-calendar';
  import 'react-calendar/dist/Calendar.css';

  // ฟังก์ชันคอมโพเนนต์ CalendarComponent ที่รับ prop "entries" ซึ่งเป็นข้อมูลรายการวันที่ที่ต้องการไฮไลต์ 
  function CalendarComponent({ entries }) {
    // สร้าง state ชื่อ highlightedDates โดยกำหนดค่าเริ่มต้นเป็นอาร์เรย์ว่าง
    const [highlightedDates, setHighlightedDates] = useState([]);

    // useEffect ที่จะทำงานเมื่อค่า entries เปลี่ยนแปลง
    useEffect(() => {
      // ดึงวันที่ที่มีรายการจาก entries แล้วเก็บในรูปแบบ "DD-MM-YYYY"
      const datesWithEntries = entries
        // ใช้ map เพื่อดึงเฉพาะค่าวันที่จากแต่ละ entry
        .map(entry => entry.date)
        // ใช้ filter เพื่อกรองเอาเฉพาะวันที่ที่มีข้อมูล (ไม่ใช่ค่าว่าง)
        .filter(date => date)
        .map(date => {

          // สร้าง Date object จากวันที่ใน entries
          const d = new Date(date);
          return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
        }); // เก็บในรูปแบบ DD-MM-YYYY

      // อัปเดตค่า highlightedDates ด้วยรายการวันที่ที่ผ่านการแปลงรูปแบบแล้ว
      setHighlightedDates(datesWithEntries);
    }, [entries]);  // ขึ้นกับ entries ซึ่งจะทำให้ useEffect นี้ทำงานใหม่ทุกครั้งที่ entries เปลี่ยนแปลง

    // ฟังก์ชัน tileClassName ใช้กำหนดคลาส CSS ให้กับแต่ละวันที่ในปฏิทิ
    const tileClassName = ({ date, view }) => {
      if (view === 'month') {
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
        if (highlightedDates.includes(formattedDate)) {
          return 'highlight';
        }
      }
      // คืนค่า null ถ้าไม่มีการไฮไลต์วันที่นั้น
      return null;
    };

    return (
      <div>
        {/* ใช้ Calendar คอมโพเนนต์และกำหนด prop tileClassName ให้ใช้ฟังก์ชัน tileClassName ที่สร้างไว้ */}
        <Calendar tileClassName={tileClassName} />
      </div>
    );
  }

  export default CalendarComponent;
