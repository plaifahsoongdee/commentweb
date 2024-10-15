// นำเข้า React, useState, และ useEffect จาก React และนำเข้า Link และ useLocation จาก react-router-dom เพื่อใช้ในการจัดการเส้นทาง
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// คอมโพเนนต์ Sidebar รับ props: onSelectTab สำหรับส่งค่าการเลือกแท็บ
function Sidebar({ onSelectTab }) {
  const location = useLocation(); // ใช้ useLocation เพื่อตรวจสอบเส้นทางปัจจุบัน
  const [activeTab, setActiveTab] = useState(location.pathname); // สร้าง state activeTab สำหรับเก็บเส้นทางปัจจุบัน

  // useEffect เพื่ออัปเดต activeTab ทุกครั้งที่ location เปลี่ยน
  useEffect(() => {
    setActiveTab(location.pathname); // กำหนดค่า activeTab เป็นเส้นทางปัจจุบัน
  }, [location]);

  // ฟังก์ชัน handleTabClick เพื่อเปลี่ยน activeTab และเรียกฟังก์ชัน onSelectTab ถ้ามี
  const handleTabClick = (tab) => {
    setActiveTab(tab); // อัปเดต activeTab ตามแท็บที่ถูกเลือก
    if (onSelectTab) onSelectTab(tab); // ถ้ามี onSelectTab เรียกใช้ฟังก์ชันนั้นพร้อมส่งค่า tab
  };

  // ส่วนการแสดงผล UI ของ Sidebar
  return (
    <div className="list-group list-group-flush">
      {/* ชื่อหัวข้อของ Sidebar */}
      <div style={{
        fontFamily: 'sans-serif',
        fontSize: '24px',
        color: '#FF69B4', // สีชมพู
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '1rem',
      }}>
        Money Lecture
      </div>
      
      {/* ลิงก์ไปที่หน้า /dashboard */}
      <Link
        to="/dashboard"
        onClick={() => handleTabClick("/dashboard")} // เรียกใช้ handleTabClick เมื่อคลิก
        className={`list-group-item list-group-item-action ${activeTab === "/dashboard" ? "active" : ""}`}
        style={{
          border: '2px solid #FF69B4', // เส้นขอบสีชมพู
          padding: '10px',
          borderRadius: '10px',
          color: activeTab === "/dashboard" ? '#FFF' : '#FF69B4', // สีพื้นหลังเมื่อ active
          backgroundColor: activeTab === "/dashboard" ? '#FF69B4' : 'transparent', // สีตัวอักษรเมื่อ active
          textAlign: 'center',
          marginBottom: '0.2rem',
          textDecoration: 'none'
        }}
      >
        Home
      </Link>
      
      {/* ลิงก์ไปที่หน้า /overview */}
      <Link
        to="/overview"
        onClick={() => handleTabClick("/overview")} // เรียกใช้ handleTabClick เมื่อคลิก
        className={`list-group-item list-group-item-action ${activeTab === "/overview" ? "active" : ""}`}
        style={{
          border: '2px solid #FF69B4',
          padding: '10px',
          borderRadius: '10px',
          color: activeTab === "/overview" ? '#FFF' : '#FF69B4', // สีพื้นหลังเมื่อ active
          backgroundColor: activeTab === "/overview" ? '#FF69B4' : 'transparent', // สีตัวอักษรเมื่อ active
          textAlign: 'center',
          marginBottom: '0.2rem',   
          textDecoration: 'none'
        }}
      >
        Overview
      </Link>
      
      {/* ลิงก์ไปที่หน้า /account */}
      <Link
        to="/account"
        onClick={() => handleTabClick("/account")} // เรียกใช้ handleTabClick เมื่อคลิก
        className={`list-group-item list-group-item-action ${activeTab === "/account" ? "active" : ""}`}
        style={{
          border: '2px solid #FF69B4',
          padding: '10px',
          borderRadius: '10px',
          color: activeTab === "/account" ? '#FFF' : '#FF69B4', // สีพื้นหลังเมื่อ active
          backgroundColor: activeTab === "/account" ? '#FF69B4' : 'transparent', // สีตัวอักษรเมื่อ active
          textAlign: 'center',
          marginBottom: '0.5rem',
          textDecoration: 'none'
        }}
      >
        Account
      </Link>
    </div>
  );
}

// ส่งออกคอมโพเนนต์ Sidebar เพื่อใช้งานในไฟล์อื่น
export default Sidebar;
