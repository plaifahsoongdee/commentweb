// นำเข้า React และคอมโพเนนต์จาก react-bootstrap ที่ใช้ในส่วนของ header
import React from 'react';
import { Navbar, Form, FormControl, Nav } from 'react-bootstrap';

// นำเข้าไอคอนจาก react-icons เพื่อใช้เป็นไอคอนใน header
import { FaSearch, FaUserCircle } from 'react-icons/fa';

// ฟังก์ชันคอมโพเนนต์ Header แสดงส่วนหัวของหน้า
function Header() {
    // สไตล์สำหรับ header โดยตั้งค่า flexbox ให้แสดงข้อมูลอยู่คนละฝั่ง
    const headerStyle = {
        display: "flex",
        justifyContent: "space-between", // จัดตำแหน่งให้อยู่คนละปลายสุดของแต่ละด้าน
        alignItems: "center", // จัดให้ทุกองค์ประกอบใน header อยู่ตรงกลางแนวตั้ง
        padding: "0.5rem 1rem", // เพิ่ม padding รอบๆ header
    };

    // สไตล์สำหรับส่วนซ้ายของ header
    const leftSectionStyle = {
        display: "flex", // ใช้ flexbox เพื่อจัดเรียงไอเท็มในแนวนอน
        alignItems: "center",
    };

    // สไตล์สำหรับส่วนขวาของ header
    const rightSectionStyle = {
        display: "flex",
        alignItems: "center",
        gap: "1rem", // เพิ่มช่องว่างระหว่างองค์ประกอบในส่วนนี้
    };

    // สไตล์สำหรับช่องค้นหา
    const searchStyle = {
        padding: "0.5rem", // เพิ่ม padding ในช่องค้นหา
        borderRadius: "20px", // มุมโค้งสำหรับช่องค้นหา
        border: "1px solid #ddd", // เส้นขอบสีอ่อนรอบๆ ช่องค้นหา
        marginLeft: "1rem", // ระยะห่างทางด้านซ้ายของช่องค้นหา
    };

    return (
        <div style={headerStyle}> {/* ใช้สไตล์ headerStyle กับส่วนนี้ */}
            {/* ส่วนซ้ายของ header แสดงชื่อแอปพลิเคชัน */}
            <div style={leftSectionStyle}>
                <span style={{ fontFamily: 'sans-serif', fontSize: "1.67rem", color: "#FF69B4", fontWeight: 'bold' }}>
                    Money Lecture
                </span> {/* ชื่อแอปพลิเคชัน ใช้ฟอนต์ sans-serif, ขนาดใหญ่, สีชมพู และตัวหนา */}
            </div>

            {/* ส่วนขวาของ header แสดงไอคอนและโปรไฟล์ผู้ใช้ */}
            <div style={rightSectionStyle}>
                <i className="fas fa-users" /> {/* ไอคอนผู้ใช้กลุ่ม */}
                <i className="fas fa-bell" /> {/* ไอคอนแจ้งเตือน */}
                <h5 style={{ margin: '0' }}>Mongyungbin</h5> {/* ชื่อผู้ใช้แสดงอยู่ถัดจากไอคอน */}
                
                {/* รูปโปรไฟล์ผู้ใช้ */}
                <img
                    src="https://cdn.readawrite.com/articles/4970/4969273/thumbnail/large.gif?2" // URL ของรูปโปรไฟล์
                    alt="Profile"
                    style={{ width: "40px", height: "40px", borderRadius: "50%" }} // กำหนดขนาดและทำให้เป็นวงกลม
                />
            </div>
        </div>
    );
}

export default Header; // ส่งออกคอมโพเนนต์ Header เพื่อใช้งานในไฟล์อื่น
