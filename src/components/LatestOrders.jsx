// นำเข้า React library
import React from 'react';

// ฟังก์ชันคอมโพเนนต์ LatestOrders รับ props: selectedDate, selectedType, onOrdersUpdate
function LatestOrders({ selectedDate, selectedType, onOrdersUpdate }) {
    // สร้างข้อมูลจำลองในรูปแบบอาร์เรย์ของผลิตภัณฑ์แต่ละรายการ
    const products = [
        { date: "2024-10-15", time: "6:00", status: "แม่ให้", type: "รายรับ", amount: 50 },
        { date: "2024-10-15", time: "6:30", status: "พ่อให้", type: "รายรับ", amount: 50 },
        { date: "2024-10-17", time: "8:00", status: "ซื้อข้าวเช้า", type: "รายจ่าย", amount: -30 },
        { date: "2024-10-15", time: "9:00", status: "ซื้อขนม", type: "รายจ่าย", amount: -20 },
        { date: "2024-10-15", time: "10:00", status: "ออมเงินซื้อของเล่น", type: "เงินเก็บ", amount: 20 },
        // ข้อมูลเพิ่มเติม
    ];

    // กรองเฉพาะรายการของวันที่ที่ผู้ใช้เลือก (selectedDate)
    const filteredProducts = products.filter(
        (product) => product.date === selectedDate
    );

    // ฟังก์ชัน totalByType สำหรับคำนวณผลรวมแยกตามประเภท ("รายรับ", "รายจ่าย", "เงินเก็บ") ของวันที่เลือก
    const totalByType = (type) => 
        filteredProducts
            .filter(product => product.type === type) // กรองเฉพาะประเภทที่ตรงกับ type
            .reduce((sum, product) => sum + product.amount, 0); // คำนวณผลรวม

    // คำนวณผลรวมรายรับ รายจ่าย และเงินเก็บ โดยใช้ totalByType
    const totalIncome = totalByType("รายรับ");
    const totalExpense = totalByType("รายจ่าย");
    const totalSaving = totalByType("เงินเก็บ");

    // ส่งค่าผลรวมรายรับ รายจ่าย และเงินเก็บไปยังฟังก์ชัน onOrdersUpdate ที่รับเข้ามา
    React.useEffect(() => {
        onOrdersUpdate([
            { type: "รายรับ", amount: totalIncome },
            { type: "รายจ่าย", amount: totalExpense },
            { type: "เงินเก็บ", amount: totalSaving },
        ]);
    }, [selectedDate, selectedType]); // ฟังก์ชันนี้จะทำงานเมื่อ selectedDate หรือ selectedType เปลี่ยนแปลง

    // แสดงผล UI
    return (
        <div style={{ background: '#f4f6f8', borderRadius: '10px', padding: '20px' }}>
            {/* หัวข้อสรุปยอดเงินสำหรับวันที่เลือก */}
            <h4 style={{ marginBottom: '20px', textAlign: 'center' }}>สรุปยอดเงินสำหรับวันที่ {selectedDate || "..."}</h4>
            {filteredProducts.length > 0 ? ( // ถ้ามีรายการสำหรับวันที่เลือก
                <div>
                    {/* แสดงผลรวมทุกประเภทเมื่อ selectedType เป็น "รวม" */}
                    {selectedType === "รวม" ? (
                        <>
                            <p>รับทั้งหมด: <span style={{ color: 'green' }}>฿{totalIncome.toLocaleString()}</span></p>
                            <p>จ่ายทั้งหมด: <span style={{ color: 'red' }}>฿{Math.abs(totalExpense).toLocaleString()}</span></p>
                            <p>เก็บทั้งหมด: <span style={{ color: 'orange' }}>฿{totalSaving.toLocaleString()}</span></p>
                        </>
                    ) : (
                        // แสดงผลรวมเฉพาะประเภทที่เลือก
                        <p>
                            {selectedType === "รายรับ" && (
                                <span style={{ color: 'green' }}>รับทั้งหมด: ฿{totalIncome.toLocaleString()}</span>
                            )}
                            {selectedType === "รายจ่าย" && (
                                <span style={{ color: 'red' }}>จ่ายทั้งหมด: ฿{Math.abs(totalExpense).toLocaleString()}</span>
                            )}
                            {selectedType === "เงินเก็บ" && (
                                <span style={{ color: 'orange' }}>เก็บทั้งหมด: ฿{totalSaving.toLocaleString()}</span>
                            )}
                        </p>
                    )}
                </div>
            ) : (
                // ถ้าไม่มีรายการสำหรับวันที่เลือก
                <p style={{ textAlign: 'center', color: '#888' }}>ไม่มีรายการสำหรับวันที่เลือก</p>
            )}
        </div>
    );
}

export default LatestOrders; // ส่งออกคอมโพเนนต์ LatestOrders เพื่อให้ใช้งานในไฟล์อื่น
