// นำเข้า React, Link และ useNavigate จาก react-router-dom เพื่อใช้ในคอมโพเนนต์ Register
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ฟังก์ชันคอมโพเนนต์ Register สำหรับแสดงฟอร์มสมัครสมาชิก
function Register() {
    // useNavigate ใช้สำหรับนำทางไปยังหน้าอื่นหลังจากสมัครสมาชิกสำเร็จ
    const navigate = useNavigate();

    // ฟังก์ชัน handleSubmit จัดการการส่งฟอร์มเมื่อผู้ใช้คลิกปุ่ม 'สมัครสมาชิก'
    const handleSubmit = (e) => {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้า
        navigate('/dashboard'); // นำทางไปที่หน้า '/dashboard' เมื่อสมัครสมาชิกสำเร็จ
    };

    // ส่วนการแสดงผล UI
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center', // จัดตำแหน่งให้อยู่กึ่งกลางในแนวนอน
            alignItems: 'center', // จัดตำแหน่งให้อยู่กึ่งกลางในแนวตั้ง
            height: '100vh', // ตั้งความสูงเป็น 100% ของ viewport
            width: '100vw', // ตั้งความกว้างเป็น 100% ของ viewport
        }}>
            <div style={{
                width: '400px', // กำหนดความกว้างของกล่องฟอร์ม
                padding: '30px', // เพิ่ม padding รอบกล่อง
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // เงารอบกล่อง
                borderRadius: '20px', // มุมกล่องโค้งมน
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#fff' // พื้นหลังสีขาว
            }}>
                {/* หัวข้อฟอร์ม */}
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>สมัครสมาชิก</h2>
                
                {/* ฟอร์มสมัครสมาชิก */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* ช่องกรอกชื่อผู้ใช้ */}
                    <div style={{ marginBottom: '15px' }}>
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
                    
                    {/* ช่องกรอกอีเมล */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>อีเมล:</label>
                        <input 
                            type="email" 
                            placeholder="กรอกอีเมลของคุณ" 
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                boxSizing: 'border-box', 
                                border: '1px solid #ccc', 
                                borderRadius: '5px' 
                            }} 
                        />
                    </div>
                    
                    {/* ช่องกรอกรหัสผ่าน */}
                    <div style={{ marginBottom: '15px' }}>
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
                    
                    {/* ปุ่มสมัครสมาชิก */}
                    <button type="submit" style={{
                        width: '100%', // กว้างเต็มพื้นที่ของกล่องฟอร์ม
                        padding: '10px', 
                        backgroundColor: '#FF69B4', // สีชมพูสำหรับปุ่ม
                        color: 'white', // ข้อความสีขาว
                        border: 'none', 
                        borderRadius: '5px', // มุมปุ่มโค้งมน
                        cursor: 'pointer', 
                        marginTop: '20px'
                    }}>
                        สมัครสมาชิก
                    </button>
                </form>
                
                {/* ลิงก์ไปยังหน้าเข้าสู่ระบบ สำหรับผู้ที่มีบัญชีแล้ว */}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <span>มีบัญชีอยู่แล้วใช่ไหม? </span>
                    {/* ลิงก์ไปที่หน้า 'เข้าสู่ระบบ' */}
                    <Link to="/login" style={{ color: '#FF69B4', textDecoration: 'none', marginLeft: '5px' }}>เข้าสู่ระบบ</Link>
                </div>
            </div>
        </div>
    );
}

// ส่งออกคอมโพเนนต์ Register เพื่อให้ใช้งานในไฟล์อื่น
export default Register;
