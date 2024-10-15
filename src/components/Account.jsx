// นำเข้า React และ useState hook สำหรับจัดการ state ในคอมโพเนนต์
import React, { useState } from 'react';
// นำเข้าคอมโพเนนต์จาก react-bootstrap เพื่อใช้ในการจัดการ layout และ UI
import { Container, Row, Col, Button, Form, Alert, Image } from 'react-bootstrap';
// นำเข้า Sidebar และ Header ซึ่งเป็นคอมโพเนนต์ย่อยที่ใช้ในหน้านี้
import Sidebar from './Sidebar';
import Header from './Header';
// นำเข้า CSS สำหรับจัดการสไตล์ของคอมโพเนนต์นี้
import '../index.css';

// ฟังก์ชันคอมโพเนนต์หลัก Account ที่ใช้แสดงหน้าข้อมูลบัญชีผู้ใช้
const Account = () => {

  // สร้าง state สำหรับเก็บค่าของรหัสผ่านปัจจุบัน, รหัสผ่านใหม่, ยืนยันรหัสผ่าน และข้อความแจ้งข้อผิดพลาด
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // สร้าง state สำหรับเก็บค่าชื่อผู้ใช้, อีเมล, และเบอร์โทรศัพท์
  const [firstName, setFirstName] = useState('Mongyungbin');
  const [email, setEmail] = useState('Mongyung@gmail.com');
  const [phone, setPhone] = useState('012-345-6789');

  // ฟังก์ชันที่เรียกใช้เมื่อผู้ใช้ต้องการเปลี่ยนรหัสผ่าน
  const handleUpdatePassword = () => {
    // ตรวจสอบว่ารหัสผ่านใหม่ตรงกับรหัสผ่านยืนยันหรือไม่
    if (newPassword !== confirmPassword) { 
      setError('รหัสผ่านไม่ตรงกัน');    // หากไม่ตรงกัน ให้ตั้งค่า error เป็น "รหัสผ่านไม่ตรงกัน"
    } else if (newPassword.length <= 10) {
      setError('รหัสผ่านต้องมีความยาวมากกว่า 10 ตัวอักษร'); 
      // ตรวจสอบว่ารหัสผ่านใหม่มีความยาวมากกว่า 10 ตัวอักษรหรือไม่
    } else {
      alert('รหัสผ่านถูกอัปเดตเรียบร้อย');    // หากผ่านเงื่อนไขทั้งหมด ให้แจ้งเตือนผู้ใช้ว่ารหัสผ่านอัปเดตแล้ว
      setError(''); // รีเซ็ต error เป็นค่าว่าง
      
    }   
  };

  // ฟังก์ชันสำหรับอัปเดตข้อมูลโปรไฟล์ผู้ใช้
  const handleUpdateProfile = () => {
    alert('ข้อมูลโปรไฟล์ถูกอัปเดตเรียบร้อย');  // แจ้งเตือนผู้ใช้ว่าข้อมูลโปรไฟล์ถูกอัปเดตแล้ว
  };

  // ฟังก์ชันสำหรับออกจากระบบ
  const handleLogout = () => {
    alert('ออกจากระบบเรียบร้อยแล้ว');  // แจ้งเตือนผู้ใช้ว่าได้ออกจากระบบแล้ว
  };

  return (
    <div style={{ display: "flex", width: "500vw", minHeight: "500vh", backgroundColor: "#f5f5f5" }}>
    <div className="account-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <Header />
        <Container className="content-container">
         {/* ใช้ Row และ Col จาก react-bootstrap เพื่อจัด layout */}
          <Row className="mt-5 align-items-stretch">
            <Col md={3} className="text-center profile-column">
                {/* รูปโปรไฟล์ผู้ใช้ */}
              <Image 
                src="https://cdn.readawrite.com/articles/4970/4969273/thumbnail/large.gif?2" 
                roundedCircle 
                alt="Profile" 
                className="profile-image"
              />
              <h2>{firstName}</h2> {/* แสดงชื่อโปรไฟล์ */}
              {/* ปุ่มออกจากระบบ */}
              <Button variant="danger" onClick={handleLogout} className="mt-3">
                ออกจากระบบ
              </Button>
            </Col>
            <Col md={8}>
              <Row>
                <Col md={6} className="pe-3">
                  <div className="profile-box">
                    <h3>ข้อมูลโปรไฟล์</h3>
                    <Form>
                       {/* ช่องกรอกชื่อผู้ใช้ */}
                      <Form.Group controlId="firstName">
                        <Form.Label>User</Form.Label>
                        <Form.Control
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="กรุณากรอกชื่อ"
                        />
                      </Form.Group>

                        {/* ช่องกรอกชื่อผู้ใช้ */}
                      <Form.Group controlId="email" className="mt-3">
                        <Form.Label>อีเมล</Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="กรุณากรอกอีเมล"
                        />
                      </Form.Group>
                    </Form>

                        {/* ปุ่มอัปเดตโปรไฟล์ */}
                    <div className="d-flex justify-content-end mt-4">
                      <Button variant="secondary" className="me-2" onClick={handleUpdateProfile}>
                        อัปเดตโปรไฟล์
                      </Button>
                    </div>
                  </div>
                </Col>

                <Col md={6} className="ps-5">
                  <div className="profile-box mt-5 mt-md-0">
                    <h3>เปลี่ยนรหัสผ่าน</h3>
                    {/* แสดงข้อความแจ้งข้อผิดพลาดหากมี */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                      <Form.Group controlId="currentPassword">
                        <Form.Label>รหัสผ่านปัจจุบัน</Form.Label>
                        <Form.Control
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="กรุณากรอกรหัสผ่านปัจจุบัน"
                        />
                      </Form.Group>

                        {/* ช่องกรอกรหัสผ่านใหม่ */}
                      <Form.Group controlId="newPassword" className="mt-3">
                        <Form.Label>รหัสผ่านใหม่</Form.Label>
                        <Form.Control
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="กรุณากรอกรหัสผ่านใหม่"
                        />
                        <Form.Text className="text-muted">
                          รหัสผ่านต้องมีความยาวมากกว่า 10 ตัวอักษร
                        </Form.Text>
                      </Form.Group>

                        {/* ช่องยืนยันรหัสผ่านใหม่ */}
                      <Form.Group controlId="confirmPassword" className="mt-3">
                        <Form.Label>ยืนยันรหัสผ่านใหม่</Form.Label>
                        <Form.Control
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="กรุณายืนยันรหัสผ่านใหม่"
                        />
                      </Form.Group>

                         {/* ปุ่มอัปเดตรหัสผ่าน */}
                      <div className="d-flex justify-content-end mt-4">
                        <Button variant="secondary" className="me-2">ยกเลิก</Button>
                        <Button variant="primary" onClick={handleUpdatePassword}>
                          อัปเดตรหัสผ่าน
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div></div>
  );
};

export default Account;
