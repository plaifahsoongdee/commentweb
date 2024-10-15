// นำเข้า React และคอมโพเนนต์ Card, Button จาก react-bootstrap สำหรับการสร้างการ์ดและปุ่ม
import React from 'react';
import { Card, Button } from 'react-bootstrap';

// ฟังก์ชันคอมโพเนนต์ LatestEntries แสดงรายการล่าสุด
// รับ props: entries (รายการทั้งหมด), title (ชื่อหัวข้อ), onEditEntry (ฟังก์ชันเรียกใช้เมื่อแก้ไขรายการ), onDeleteEntry (ฟังก์ชันเรียกใช้เมื่อรายการถูกลบ)
function LatestEntries({ entries, title, onEditEntry, onDeleteEntry }) {
  // สร้างอาร์เรย์ latestEntries โดยเลือก 5 รายการล่าสุดจาก entries และเรียงลำดับจากใหม่ไปเก่า
  const latestEntries = entries.slice(-5).reverse();

  return (
    // สร้างการ์ดแสดงรายการล่าสุดด้วยการ์ด Bootstrap
    <Card 
      style={{ 
        marginBottom: '1rem', // ระยะห่างด้านล่างการ์ด
        border: '2px solid #FFA9B4', // ขอบการ์ดสีชมพูอ่อน
        borderRadius: '10px', // มุมการ์ดโค้งมน
      }}
    >
      {/* ส่วนหัวของการ์ดที่แสดงชื่อหัวข้อ */}
      <Card.Header style={{ backgroundColor: '#FFA9B4', fontWeight: 'bold' }}>{title}</Card.Header>
      
      {/* ส่วนเนื้อหาของการ์ด */}
      <Card.Body>
        {latestEntries.length > 0 ? ( // ถ้ามีรายการใน latestEntries
          latestEntries.map((entry, index) => (
            <div 
              key={index} 
              style={{ 
                marginBottom: '0.5rem', // ระยะห่างด้านล่างของรายการแต่ละรายการ
                paddingBottom: '0.5rem', // ระยะห่างด้านล่างในแต่ละรายการ
                borderBottom: index !== latestEntries.length - 1 ? '1px solid #ADD8E6' : 'none' // เส้นแบ่งแต่ละรายการ (ยกเว้นรายการสุดท้าย)
              }}
            >
              {/* แสดงรายละเอียดของรายการ โดยใช้ flexbox เพื่อจัดระยะระหว่างต้นทางและจำนวนเงิน */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{entry.source || "ไม่ระบุ"}</span> {/* แสดงต้นทาง หรือ "ไม่ระบุ" ถ้าไม่มี */}
                <span 
                  style={{ 
                    color: entry.type === "รายจ่าย" ? 'red' : entry.type === "รายรับ" ? 'green' : 'orange' // กำหนดสีตามประเภทของรายการ
                  }}
                >
                  {entry.type === "ยอดเงินเก็บ" 
                    ? `฿${Math.abs(entry.amount).toLocaleString()}` // แสดงยอดเงินเก็บโดยไม่มีเครื่องหมาย
                    : `${entry.type === "รายจ่าย" ? '-' : '+'}฿${Math.abs(entry.amount).toLocaleString()}`}  // แสดงเครื่องหมาย + หรือ - ตามประเภทของรายการ
                </span>
              </div>
              
              {/* แสดงวันที่และเวลาของรายการพร้อมปุ่มแก้ไขและลบ */}
              <div style={{ fontSize: '0.8rem', color: 'gray', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span>{entry.date ? entry.date.replace(/-/g, "/") : "ไม่ระบุ"}</span> {/* แสดงวันที่ แทนที่ "-" ด้วย "/" */}
                  <span> - {entry.time || "ไม่ระบุ"}</span> {/* แสดงเวลา หรือ "ไม่ระบุ" ถ้าไม่มี */}
                </div>
                
                <div>
                  {/* ปุ่มแก้ไข เมื่อคลิกจะเรียกใช้ฟังก์ชัน onEditEntry พร้อมกับ entry */}
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => onEditEntry(entry)} 
                    style={{ fontSize: '0.8rem', color: '#007bff', textDecoration: 'underline' }}
                  >
                    แก้ไข
                  </Button>
                  
                  {/* ปุ่มลบ เมื่อคลิกจะเรียกใช้ฟังก์ชัน onDeleteEntry พร้อมกับ entry */}
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => onDeleteEntry(entry)} 
                    style={{ fontSize: '0.8rem', color: 'red', textDecoration: 'underline' }}
                  >
                    ลบ
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>ไม่มีข้อมูล</p> // ถ้าไม่มีรายการให้แสดงข้อความว่า "ไม่มีข้อมูล"
        )}
      </Card.Body>
    </Card>
  );
}

export default LatestEntries; // ส่งออกคอมโพเนนต์ LatestEntries เพื่อใช้งานในไฟล์อื่น
