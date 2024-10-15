// นำเข้า React, useState, และ useEffect สำหรับการจัดการ state และการอัปเดตเมื่อมีการเปลี่ยนแปลง
import React, { useState, useEffect } from 'react';

// นำเข้า Modal และ Button จาก react-bootstrap สำหรับสร้าง modal และปุ่ม
import { Modal, Button } from 'react-bootstrap';

// ฟังก์ชันคอมโพเนนต์ LatestProducts รับ props: selectedDate, selectedType, และ onProductsUpdate
function LatestProducts({ selectedDate, selectedType, onProductsUpdate }) {
    // อาร์เรย์ของ products เก็บรายการที่มีวันที่ เวลา สถานะ ประเภท และจำนวนเงิน
    const products = [
        { date: "2024-10-15", time: "6:00", status: "แม่ให้", type: "รายรับ", amount: 50 },
        { date: "2024-10-15", time: "6:30", status: "พ่อให้", type: "รายรับ", amount: 50 },
        { date: "2024-10-15", time: "8:00", status: "ซื้อข้าวเช้า", type: "รายจ่าย", amount: -30 },
        { date: "2024-10-15", time: "9:00", status: "ซื้อขนม", type: "รายจ่าย", amount: -20 },
        { date: "2024-10-15", time: "10:00", status: "ออมเงินซื้อของเล่น", type: "เงินเก็บ", amount: 20 },
        // ข้อมูลเพิ่มเติมของวันที่อื่นๆ
        { date: "2024-10-17", time: "6:00", status: "แม่ให้", type: "รายรับ", amount: 50 },
        { date: "2024-10-17", time: "6:30", status: "พ่อให้", type: "รายรับ", amount: 50 },
        { date: "2024-10-17", time: "8:00", status: "ซื้อข้าวเช้า", type: "รายจ่าย", amount: -1000 },
        { date: "2024-10-17", time: "9:00", status: "ซื้อขนม", type: "รายจ่าย", amount: -1000 },
        { date: "2024-10-17", time: "10:00", status: "ออมเงินซื้อของเล่น", type: "เงินเก็บ", amount: 500 },
        { date: "2024-10-18", time: "6:00", status: "แม่ให้", type: "รายรับ", amount: 50 },
        { date: "2024-10-18", time: "6:30", status: "พ่อให้", type: "รายรับ", amount: 50 },
        { date: "2024-10-18", time: "8:00", status: "ซื้อข้าวเช้า", type: "รายจ่าย", amount: -1000 },
        { date: "2024-10-18", time: "9:00", status: "ซื้อขนม", type: "รายจ่าย", amount: -1000 },
        { date: "2024-10-18", time: "10:00", status: "ออมเงินซื้อของเล่น", type: "เงินเก็บ", amount: 500 },
    ];

    // กรอง products เพื่อแสดงเฉพาะรายการที่ตรงกับ selectedDate และ selectedType
    const filteredProducts = products.filter(
        (product) => 
            product.date === selectedDate && 
            (selectedType === "รวม" || product.type === selectedType)
    );

    // สร้าง state showAll เพื่อควบคุมการแสดง Modal
    const [showAll, setShowAll] = useState(false);

    // useEffect เพื่อเรียกฟังก์ชัน onProductsUpdate ทุกครั้งที่ filteredProducts เปลี่ยนแปลง
    useEffect(() => {
        onProductsUpdate(filteredProducts); // ส่ง filteredProducts ไปยังฟังก์ชัน onProductsUpdate
    }, [filteredProducts, onProductsUpdate]);

    // ฟังก์ชัน toggleShowAll สำหรับสลับการแสดง/ซ่อน Modal
    const toggleShowAll = () => setShowAll(!showAll);

    // ส่วนการแสดงผล UI
    return (
        <div style={{ background: '#f4f6f8', borderRadius: '10px', padding: '20px' }}>
            {/* หัวข้อของรายการทั้งหมดสำหรับวันที่ที่เลือก */}
            <h4 style={{ marginBottom: '20px', textAlign: 'center' }}>รายการทั้งหมดสำหรับวันที่ {selectedDate || "..."}</h4>
            
            {filteredProducts.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {/* แสดงรายการที่กรองได้ (สูงสุด 3 รายการแรก) */}
                    {filteredProducts.slice(0, 3).map((product, index) => (
                        <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #ddd' }}>
                            <span style={{ flex: 1, textAlign: 'left' }}>{product.status}</span> {/* แสดงสถานะ */}
                            <span style={{ flex: 1, textAlign: 'center' }}>{product.date} – {product.time}</span> {/* แสดงวันที่และเวลา */}
                            <span 
                                style={{ 
                                    flex: 1, 
                                    textAlign: 'right', 
                                    color: product.type === "รายรับ" ? 'green' : product.type === "รายจ่าย" ? 'red' : 'orange' 
                                }}
                            >
                                ฿{Math.abs(product.amount).toLocaleString()} {/* แสดงจำนวนเงินโดยไม่มีเครื่องหมายลบ */}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                // ถ้าไม่มีรายการสำหรับวันที่เลือก
                <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>ไม่มีรายการสำหรับวันที่เลือก</p>
            )}
            
            {/* ลิงก์ View all ถ้ามีรายการมากกว่า 3 รายการ */}
            {filteredProducts.length > 3 && (
                <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); toggleShowAll(); }} // ป้องกันการรีเฟรชและสลับการแสดง modal
                    style={{ color: '#646cff', textAlign: 'center', display: 'block', marginTop: '10px' }}
                >
                    View all
                </a>
            )}

            {/* Modal สำหรับแสดงรายการทั้งหมดของวันที่ที่เลือก */}
            <Modal show={showAll} onHide={toggleShowAll} centered>
                <Modal.Header closeButton>
                    <Modal.Title>รายการทั้งหมดสำหรับวันที่ {selectedDate}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {/* แสดงรายการทั้งหมดที่กรองได้ */}
                        {filteredProducts.map((product, index) => (
                            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #ddd' }}>
                                <span style={{ flex: 1, textAlign: 'left' }}>{product.status}</span> {/* แสดงสถานะ */}
                                <span style={{ flex: 1, textAlign: 'center' }}>{product.date} – {product.time}</span> {/* แสดงวันที่และเวลา */}
                                <span 
                                    style={{ 
                                        flex: 1, 
                                        textAlign: 'right', 
                                        color: product.type === "รายรับ" ? 'green' : product.type === "รายจ่าย" ? 'red' : 'orange' 
                                    }}
                                >
                                    ฿{Math.abs(product.amount).toLocaleString()} {/* แสดงจำนวนเงินแบบไม่มีเครื่องหมายลบ */}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleShowAll}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default LatestProducts; // ส่งออกคอมโพเนนต์ LatestProducts เพื่อใช้งานในไฟล์อื่น
