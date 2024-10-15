// นำเข้า React, BrowserRouter, Routes, Route, และ Navigate จาก react-router-dom เพื่อใช้ในการจัดการเส้นทาง
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// นำเข้าคอมโพเนนต์ต่าง ๆ ที่จะใช้ในแอปพลิเคชัน
import DashboardLayout from './components/DashboardLayout'; // แสดงหน้าหลักของแดชบอร์ด
import Overview from './components/Overview';               // แสดงหน้าสรุปข้อมูล
import Login from './components/Login';                     // แสดงหน้าล็อกอิน
import Register from './components/Register';               // แสดงหน้าสมัครสมาชิก
import Account from './components/Account';                 // แสดงหน้าข้อมูลบัญชี
import 'bootstrap/dist/css/bootstrap.min.css';              // นำเข้า CSS ของ Bootstrap

// คอมโพเนนต์ App จัดการเส้นทางของแอปพลิเคชันทั้งหมด
function App() {
    return (
        <Router> {/* ครอบคอมโพเนนต์ทั้งหมดด้วย Router เพื่อให้จัดการเส้นทางได้ */}
            <Routes> {/* กำหนดเส้นทางต่าง ๆ ของแอปพลิเคชัน */}
                {/* เส้นทางสำหรับหน้า login */}
                <Route path="/login" element={<Login />} /> 
                
                {/* เส้นทางสำหรับหน้า register */}
                <Route path="/register" element={<Register />} /> 
                
                {/* เส้นทางเริ่มต้น (/) ที่จะนำไปยังหน้า login */}
                <Route path="/" element={<Navigate to="/login" replace />} /> 
                
                {/* เส้นทางสำหรับหน้าแดชบอร์ด */}
                <Route path="/dashboard" element={<DashboardLayout />} /> 
                
                {/* เส้นทางสำหรับหน้า overview */}
                <Route path="/overview" element={<Overview />} /> 
                
                {/* เส้นทางสำหรับหน้า account */}
                <Route path="/account" element={<Account />} /> 
            </Routes>
        </Router>
    );
}

// ส่งออกคอมโพเนนต์ App เพื่อให้ใช้งานในไฟล์อื่น
export default App;
