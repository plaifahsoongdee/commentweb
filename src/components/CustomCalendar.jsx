import React, { useState, useEffect } from 'react';
import '../index.css';

// ฟังก์ชันคอมโพเนนต์ CustomCalendar ซึ่งรับ prop "entries" ที่เป็นข้อมูลรายการประจำวัน
function CustomCalendar({ entries }) {
  // สร้าง state ชื่อ currentDate เพื่อเก็บวันที่ปัจจุบันหรือเดือนที่เลือกในปฏิทิน
  const [currentDate, setCurrentDate] = useState(new Date());
  // สร้าง state ชื่อ daysInMonth เพื่อเก็บรายการวันที่ในเดือนที่เลือกในปฏิทิน
  const [daysInMonth, setDaysInMonth] = useState([]);

  /// useEffect จะเรียกใช้ฟังก์ชัน generateCalendarDays ทุกครั้งที่ currentDate หรือ entries เปลี่ยนแปลง
  useEffect(() => {
    generateCalendarDays();
  }, [currentDate, entries]);

  // ฟังก์ชันสำหรับสร้างวันที่ในเดือนที่กำลังเลือกอยู่และเก็บใน daysInMonth
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear(); 
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    // สร้างอาร์เรย์ของวันที่ในปฏิทินที่มี 42 ช่อง (6 แถว x 7 คอลัมน์) เพื่อให้ปฏิทินสมบูรณ์ในทุกเดือน
    const daysArray = Array.from({ length: 42 }, (_, index) => {
      const day = index - firstDayOfMonth + 1;
      return day > 0 && day <= lastDateOfMonth ? day : null;
    });

    setDaysInMonth(daysArray); // อัปเดต state daysInMonth ด้วยอาร์เรย์ที่สร้างขึ้น
  };
  // ฟังก์ชันสำหรับเลื่อนปฏิทินไปยังเดือนก่อนหน้า
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  // ฟังก์ชันสำหรับเลื่อนปฏิทินไปยังเดือนถัดไป
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  // ฟังก์ชันที่ใช้ในการแปลงวันที่เป็นสตริงในรูปแบบ "YYYY-MM-DD"
  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };
  // ฟังก์ชันที่ใช้หายอดรวมรายรับ รายจ่าย และยอดเงินเก็บของแต่ละวันในเดือนนั้น
  const getTotalsForDay = (day) => {
    const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayEntries = entries.filter(entry => entry.date === dateStr);

    // คำนวณยอดรวมรายรับ รายจ่าย และยอดเงินเก็บแยกกัน
    const incomeTotal = dayEntries
      .filter(entry => entry.type === "รายรับ")
      .reduce((acc, entry) => acc + entry.amount, 0);

    const expenseTotal = dayEntries
      .filter(entry => entry.type === "รายจ่าย")
      .reduce((acc, entry) => acc + entry.amount, 0);

    const savingsTotal = dayEntries
      .filter(entry => entry.type === "ยอดเงินเก็บ")
      .reduce((acc, entry) => acc + entry.amount, 0);

    return { incomeTotal, expenseTotal, savingsTotal }; // ส่งคืนยอดรวมแต่ละประเภท
  };
  // ส่วน UI ของคอมโพเนนต์ที่แสดงปฏิทิน
  return (
    <div className="custom-calendar"> 
      <header>
        <button onClick={handlePrevMonth}>{"<"}</button>
        <h3>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h3>
        <button onClick={handleNextMonth}>{">"}</button>
      </header>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="calendar-day-header">{day}</div>
        ))}
        {daysInMonth.map((day, index) => {
          const { incomeTotal, expenseTotal, savingsTotal } = getTotalsForDay(day || 0);
          return (
            <div key={index} className={`calendar-day ${day ? '' : 'empty'}`}>
              {day && (
                <>
                  <span>{day}</span>
                  <div className="entries">
                    {incomeTotal !== 0 && (
                      <div style={{ color: 'green' }}>
                        +฿{Math.abs(incomeTotal).toLocaleString()}
                      </div>
                    )}
                    {expenseTotal !== 0 && (
                      <div style={{ color: 'red' }}>
                        -฿{Math.abs(expenseTotal).toLocaleString()}
                      </div>
                    )}
                    {savingsTotal !== 0 && (
                      <div style={{ color: 'orange' }}>
                        ฿{Math.abs(savingsTotal).toLocaleString()} {/* ยอดเงินเก็บ */}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CustomCalendar;
