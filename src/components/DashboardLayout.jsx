// นำเข้า React และ hooks useState จาก 'react' สำหรับจัดการ state ภายในคอมโพเนนต์
import React, { useState } from 'react';

// นำเข้าคอมโพเนนต์ย่อย เช่น Sidebar, Header, OverviewCard, LatestEntries และ CustomCalendar ที่ใช้ในหน้า Dashboard
import Sidebar from './Sidebar';
import Header from './Header';
import OverviewCard from './OverviewCard';
import LatestEntries from './LatestEntries';
import CustomCalendar from './CustomCalendar';

// นำเข้าคอมโพเนนต์จาก react-bootstrap สำหรับจัดการ layout, ปุ่ม, ฟอร์ม, และ modal
import { Row, Col, Modal, Button, Form, Alert } from 'react-bootstrap';

// นำเข้า Outlet จาก react-router-dom เพื่อแสดงเนื้อหาของเส้นทางย่อยใน router
import { Outlet } from 'react-router-dom';

// ฟังก์ชันหลัก DashboardLayout สำหรับจัด layout ของหน้า Dashboard
function DashboardLayout() {
  // กำหนด state สำหรับแท็บที่เลือก ("รายรับ" เป็นค่าเริ่มต้น)
  const [selectedTab, setSelectedTab] = useState("รายรับ");

  // กำหนด state entries เพื่อเก็บรายการรายรับ, รายจ่าย และยอดเงินเก็บในรูปแบบออบเจกต์
  const [entries, setEntries] = useState({
    รายรับ: [],
    รายจ่าย: [],
    ยอดเงินเก็บ: [],
  });

  // กำหนด state สำหรับการแสดง Modal และโหมดการแก้ไข
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // กำหนด state สำหรับข้อมูลรายการที่กำลังแก้ไข
  const [currentEntry, setCurrentEntry] = useState(null);

  // กำหนด state สำหรับการจัดเก็บข้อมูลการบันทึกรายการ
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [balance, setBalance] = useState(0); // ยอดคงเหลือ
  const [error, setError] = useState(""); // ข้อความแสดงข้อผิดพลาด

  // ฟังก์ชัน handleAddEntry สำหรับเพิ่มรายการใหม่
  const handleAddEntry = () => {
    if (!amount) {
      setError("กรุณากรอกจำนวนเงิน"); // หากจำนวนเงินว่าง ให้แสดงข้อผิดพลาด
      return;
    }

    const entryAmount = parseFloat(amount); // แปลงจำนวนเงินเป็นเลขทศนิยม
    const newEntry = { 
      source, 
      amount: selectedTab === "รายจ่าย" || selectedTab === "ยอดเงินเก็บ" ? -entryAmount : entryAmount, // ถ้าเป็นรายจ่ายหรือเงินเก็บ ให้เป็นจำนวนลบ
      date, 
      time,
      type: selectedTab
    };

    // เพิ่มรายการใหม่ลงใน entries ตามประเภทที่เลือก
    setEntries((prevEntries) => ({
      ...prevEntries,
      [selectedTab]: [...prevEntries[selectedTab], newEntry],
    }));

    // ปรับยอดคงเหลือโดยเพิ่มหรือลบ entryAmount ตามประเภท
    if (selectedTab === "รายรับ") {
      setBalance((prevBalance) => prevBalance + entryAmount);
    } else if (selectedTab === "รายจ่าย" || selectedTab === "ยอดเงินเก็บ") {
      setBalance((prevBalance) => prevBalance - entryAmount);
    }

    handleCancel(); // เคลียร์ฟอร์มเมื่อเสร็จ
    setShowModal(false); // ปิด Modal
  };

  // ฟังก์ชัน handleEditEntry สำหรับแก้ไขรายการ
  const handleEditEntry = (entry) => {
    setIsEditMode(true); // เปิดโหมดแก้ไข
    setCurrentEntry(entry); // กำหนด currentEntry เป็นรายการที่เลือก
    setSource(entry.source);
    setAmount(Math.abs(entry.amount)); // ตั้งค่า amount เป็นค่า absolute เพื่อลบสัญลักษณ์ลบในการแก้ไข
    setDate(entry.date);
    setTime(entry.time);
    setShowModal(true); // แสดง Modal
  };

  // ฟังก์ชัน handleUpdateEntry สำหรับบันทึกการแก้ไขรายการ
  const handleUpdateEntry = () => {
    if (!amount) {
      setError("กรุณากรอกจำนวนเงิน");
      return;
    }

    const entryAmount = parseFloat(amount); // แปลงจำนวนเงินเป็นทศนิยม
    const updatedEntry = {
      ...currentEntry,
      source,
      amount: selectedTab === "รายจ่าย" || selectedTab === "ยอดเงินเก็บ" ? -entryAmount : entryAmount, // ถ้าเป็นรายจ่ายหรือเงินเก็บ ให้เป็นจำนวนลบ
      date,
      time,
      type: selectedTab,
    };

    // อัปเดต entries โดยแทนที่ currentEntry ด้วย updatedEntry
    setEntries((prevEntries) => {
      const updatedList = { ...prevEntries };
      const entryType = currentEntry.type;

      updatedList[entryType] = updatedList[entryType].map((entry) =>
        entry === currentEntry ? updatedEntry : entry
      );
      return updatedList;
    });

    handleCancel(); // เคลียร์ฟอร์มเมื่อเสร็จ
    setShowModal(false); // ปิด Modal
  };

  // ฟังก์ชัน handleCancel สำหรับเคลียร์ฟอร์มและปิด Modal
  const handleCancel = () => {
    setSource("");
    setAmount("");
    setDate("");
    setTime("");
    setError("");
    setIsEditMode(false);
    setCurrentEntry(null);
    setShowModal(false);
  };

  // ฟังก์ชัน calculateTotal คำนวณยอดรวมของแต่ละประเภท (รายรับ, รายจ่าย, ยอดเงินเก็บ)
  const calculateTotal = (type) => {
    return entries[type].reduce((acc, entry) => acc + entry.amount, 0);
  };

  // รวมรายการทั้งหมดและเรียงลำดับตามวันที่และเวลา
  const combinedEntries = entries["รายรับ"]
    .concat(entries["รายจ่าย"], entries["ยอดเงินเก็บ"])
    .sort((a, b) => new Date(b.date) - new Date(a.date) || b.time.localeCompare(a.time));

  // ส่วน UI หลัก
  return (
    <div style={{ display: "flex", width: "100vw", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Sidebar ด้านซ้าย */}
      <div style={{
        backgroundColor: "#F8E7EF", color: "#333", width: "240px", minHeight: "100vh", boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
        padding: "1rem", position: "fixed", top: 0, left: 0,
      }}>
        <Sidebar onSelectTab={setSelectedTab} />
      </div>
      
      {/* ส่วนเนื้อหาหลัก */}
      <div style={{ flex: 1, padding: "2rem", marginLeft: "260px" }}>
        <Header />
        
        {/* แสดงการ์ดข้อมูลสรุป */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1.5rem", marginTop: "1rem" }}>
          <OverviewCard title="รายรับ" value={`฿${calculateTotal("รายรับ")}`} entries={entries["รายรับ"]} onClick={() => setSelectedTab("รายรับ")} />
          <OverviewCard title="รายจ่าย" value={`฿${Math.abs(calculateTotal("รายจ่าย"))}`} entries={entries["รายจ่าย"]} onClick={() => setSelectedTab("รายจ่าย")} />
          <OverviewCard title="ยอดเงินเก็บ" value={`฿${Math.abs(calculateTotal("ยอดเงินเก็บ"))}`} entries={entries["ยอดเงินเก็บ"]} onClick={() => setSelectedTab("ยอดเงินเก็บ")} />
          <OverviewCard title="ยอดคงเหลือ" value={`฿${Math.abs(balance)}`} entries={[]} />
          <OverviewCard title="ยอดเงินรวม" value={`฿${Math.abs(calculateTotal("ยอดเงินเก็บ") + balance)}`} entries={[]} />
        </div>

        {/* แสดงรายการและปฏิทิน */}
        <Row className="mt-4">
          <Col md={6}>
            <LatestEntries entries={combinedEntries} title="รายการรายรับ-รายจ่าย-ยอดเงินเก็บล่าสุด" onEditEntry={handleEditEntry} />
          </Col>
          <Col md={6}>
            <div style={{ padding: "20px", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
              <CustomCalendar entries={combinedEntries} />
            </div>
          </Col>
        </Row>

        {/* ปุ่มเพิ่มรายการ */}
        <button style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "15px 30px",
          backgroundColor: "#FF69B4",
          color: "#fff",
          fontSize: "16px",
          borderRadius: "50px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          border: "none",
        }} onClick={() => { setIsEditMode(false); setShowModal(true); }}>
          เพิ่มรายการ
        </button>

        {/* Modal สำหรับเพิ่ม/แก้ไขรายการ */}
        <Modal show={showModal} onHide={handleCancel} centered>
          <Modal.Header closeButton>
            <Modal.Title>{isEditMode ? "แก้ไขรายการ" : "เพิ่มรายการใหม่"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formType">
                <Form.Label>ประเภท:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedTab}
                  onChange={(e) => setSelectedTab(e.target.value)}
                  disabled={isEditMode}
                >
                  <option value="รายรับ">รายรับ</option>
                  <option value="รายจ่าย">รายจ่าย</option>
                  <option value="ยอดเงินเก็บ">ยอดเงินเก็บ</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formSource" className="mt-3">
                <Form.Label>ที่มา:</Form.Label>
                <Form.Control
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="กรอกที่มาของรายรับ/รายจ่าย"
                />
              </Form.Group>
              <Form.Group controlId="formAmount" className="mt-3">
                <Form.Label>จำนวนเงิน:</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="กรอกจำนวนเงิน"
                />
              </Form.Group>
              <Form.Group controlId="formDate" className="mt-3">
                <Form.Label>วันที่:</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formTime" className="mt-3">
                <Form.Label>เวลา:</Form.Label>
                <Form.Control
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </Form.Group>
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              ยกเลิก
            </Button>
            <Button 
              style={{ backgroundColor: '#FF69B4', borderColor: '#FF69B4', color: '#FFFFFF' }}
              onClick={isEditMode ? handleUpdateEntry : handleAddEntry}
            >
              {isEditMode ? "บันทึกการเปลี่ยนแปลง" : "บันทึก"}
            </Button>
          </Modal.Footer>
        </Modal>
        
        <Outlet /> {/* สำหรับแสดงเนื้อหาของเส้นทางย่อย */}
      </div>
    </div>
  );
}

export default DashboardLayout; // ส่งออกคอมโพเนนต์ DashboardLayout เป็นค่าเริ่มต้น
