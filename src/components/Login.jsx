// นำเข้า React, Link และ useNavigate จาก react-router-dom เพื่อใช้ในคอมโพเนนต์นี้
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ฟังก์ชันคอมโพเนนต์ Login แสดงฟอร์มเข้าสู่ระบบ
function Login() {
    // useNavigate ใช้เพื่อเปลี่ยนเส้นทางหลังจากเข้าสู่ระบบสำเร็จ
    const navigate = useNavigate();

    // ฟังก์ชัน handleSubmit จัดการการส่งฟอร์ม เมื่อผู้ใช้กดปุ่ม 'เข้าสู่ระบบ'
    const handleSubmit = (e) => {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้า
        navigate('/dashboard'); // นำทางไปที่หน้า '/dashboard' เมื่อเข้าสู่ระบบสำเร็จ
    }

    // ส่วนการแสดงผล UI
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center', // จัดให้อยู่กึ่งกลางในแนวนอน
            alignItems: 'center', // จัดให้อยู่กึ่งกลางในแนวตั้ง
            height: '100vh', // ตั้งความสูงเป็น 100% ของ viewport
            width: '100vw', // ตั้งความกว้างเป็น 100% ของ viewport
        }}>
            <div style={{
                width: '400px', // กำหนดความกว้างของกล่องฟอร์ม
                padding: '30px', // เพิ่ม padding รอบกล่อง
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // เงาเบาๆ รอบกล่อง
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRadius: '20px', // มุมโค้งมน
                backgroundColor: '#fff' // พื้นหลังสีขาว
            }}>
                {/* หัวข้อของฟอร์ม */}
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>เข้าสู่ระบบ</h2>
                
                {/* ฟอร์มเข้าสู่ระบบ */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '15px' }}>
                        {/* ช่องกรอกชื่อผู้ใช้ */}
                        <label style={{ display: 'block', marginBottom: '5px' }}>ชื่อผู้ใช้:</label>
                        <input 
                            type="text" 
                            placeholder="กรอกชื่อผู้ใช้ของคุณ" 
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                boxSizing: 'border-box', 
                                border: '1px solid #ccc', 
                                borderRadius: '5px' 
                            }} 
                        />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        {/* ช่องกรอกรหัสผ่าน */}
                        <label style={{ display: 'block', marginBottom: '5px' }}>รหัสผ่าน:</label>
                        <input 
                            type="password" 
                            placeholder="กรอกรหัสผ่านของคุณ" 
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                boxSizing: 'border-box', 
                                border: '1px solid #ccc', 
                                borderRadius: '5px' 
                            }} 
                        />
                    </div>
                    
                    {/* ปุ่มเข้าสู่ระบบ */}
                    <button type="submit" style={{
                        width: '100%', // กว้างเต็มพื้นที่กล่องฟอร์ม
                        padding: '10px', 
                        backgroundColor: '#FF69B4', // สีชมพูสำหรับปุ่ม
                        color: 'white', // ข้อความสีขาว
                        border: 'none', 
                        borderRadius: '5px', // มุมโค้งมน
                        cursor: 'pointer', 
                        marginTop: '20px'
                    }}>
                        เข้าสู่ระบบ
                    </button>
                </form>
                
                {/* ส่วนเชื่อมโยงไปยังหน้า 'สมัครสมาชิก' */}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <span>ยังไม่มีบัญชีใช่ไหม?</span>
                    {/* ลิงก์ไปยังหน้า 'สมัครสมาชิก' */}
                    <Link to="/register" style={{ color: '#FF69B4', textDecoration: 'none', marginLeft: '5px' }}>สมัครสมาชิก</Link>
                </div>
            </div>
        </div>
    );
}

// ส่งออกคอมโพเนนต์ Login เพื่อใช้งานในไฟล์อื่น
export default Login;
