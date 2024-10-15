// นำเข้า React, useState จาก React และคอมโพเนนต์จาก react-bootstrap สำหรับสร้าง layout
import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';

// นำเข้าคอมโพเนนต์ย่อยสำหรับ Sidebar, Header, LatestProducts, LatestOrders, และ DateFilter
import Sidebar from './Sidebar';
import Header from './Header';
import LatestProducts from './LatestProducts';
import LatestOrders from './LatestOrders';
import TrafficSourceChart from './TrafficSourceChart';  
import SalesBarChart from './SalesBarChart';
import DateFilter from './DateFilter';

// ฟังก์ชันคอมโพเนนต์ Overview สำหรับแสดงภาพรวมการเงิน
function Overview() {
  // State สำหรับวันที่และประเภทที่เลือกใน Products และ Orders
  const [selectedDateProducts, setSelectedDateProducts] = useState("");
  const [selectedDateOrders, setSelectedDateOrders] = useState("");
  const [selectedTypeProducts, setSelectedTypeProducts] = useState("รวม");
  const [selectedTypeOrders, setSelectedTypeOrders] = useState("รวม");

  // State สำหรับข้อมูลที่กรองแล้วของ Products และ Orders
  const [productData, setProductData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  // State สำหรับการแสดงข้อมูลในกราฟ (แสดงแบบ summary หรือ all)
  const [viewOptionBar, setViewOptionBar] = useState("summary");
  const [viewOptionPie, setViewOptionPie] = useState("summary");

  // State สำหรับเก็บผลรวมรายรับ รายจ่าย และเงินเก็บ
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalSaving, setTotalSaving] = useState(0);

  // ฟังก์ชัน handleDateChangeProducts รับค่าวันที่จาก DateFilter สำหรับ Products
  const handleDateChangeProducts = (filter) => {
    setSelectedDateProducts(filter.date);
  };

  // ฟังก์ชัน handleDateChangeOrders รับค่าวันที่จาก DateFilter สำหรับ Orders
  const handleDateChangeOrders = (filter) => {
    setSelectedDateOrders(filter.date);
  };

  // ฟังก์ชัน handleTypeChangeProducts สำหรับเปลี่ยนประเภทที่เลือกใน Products
  const handleTypeChangeProducts = (type) => {
    setSelectedTypeProducts(type);
  };

  // ฟังก์ชัน handleTypeChangeOrders สำหรับเปลี่ยนประเภทที่เลือกใน Orders
  const handleTypeChangeOrders = (type) => {
    setSelectedTypeOrders(type);
  };

  // ฟังก์ชัน updateOrderData รับข้อมูล orderData ที่อัปเดตจาก LatestOrders และคำนวณผลรวมรายรับ รายจ่าย และเงินเก็บ
  const updateOrderData = (data) => {
    setOrderData(data);
    const income = data.find(d => d.type === "รายรับ")?.amount || 0;
    const expense = data.find(d => d.type === "รายจ่าย")?.amount || 0;
    const saving = data.find(d => d.type === "เงินเก็บ")?.amount || 0;
    setTotalIncome(income);
    setTotalExpense(expense);
    setTotalSaving(saving);
  };

  // ข้อมูลสำหรับแสดงใน SalesBarChart โดยใช้ totalIncome, totalExpense และ totalSaving
  const barChartData = [
    { name: 'รายรับ', sales: totalIncome },
    { name: 'รายจ่าย', sales: Math.abs(totalExpense) },
    { name: 'เงินเก็บ', sales: totalSaving }
  ];

  // การแสดงผล UI หลัก
  return (
    <div style={{ display: "flex", width: "100vw", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Sidebar คงที่ด้านซ้าย */}
      <div style={{
        backgroundColor: "#F8E7EF", color: "#333", width: "240px", minHeight: "100vh", boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
        padding: "1rem", position: "fixed", top: 0, left: 0,
      }}>
        <Sidebar />
      </div>

      {/* ส่วนเนื้อหาหลัก */}
      <div style={{ flex: 1, padding: "2rem", marginLeft: "260px" }}>
        <Header />
        <Container style={{ padding: '2rem', maxWidth: '1200px', margin: 'auto' }}>

          {/* แสดงรายการ Products */}
          <Row className="mb-4" style={{ gap: '20px' }}>
            <Col md={5} style={{
              padding: '20px',
              backgroundColor: '#f4f6f8',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #ddd',
              flexBasis: '48%',
              marginRight: '0px'
            }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>รายการทั้งหมด</h4>
                {/* ปุ่มเลือกประเภท รายรับ, รายจ่าย, เงินเก็บ, หรือ รวม */}
                <div className="d-flex align-items-center">
                  <ButtonGroup size="sm" className="me-2">
                    <Button
                      variant={selectedTypeProducts === "รายรับ" ? "success" : "outline-success"} 
                      onClick={() => handleTypeChangeProducts("รายรับ")}
                    >
                      รับ
                    </Button>
                    <Button
                      variant={selectedTypeProducts === "รายจ่าย" ? "danger" : "outline-danger"} 
                      onClick={() => handleTypeChangeProducts("รายจ่าย")}
                    >
                      จ่าย
                    </Button>
                    <Button
                      variant={selectedTypeProducts === "เงินเก็บ" ? "warning" : "outline-warning"} 
                      onClick={() => handleTypeChangeProducts("เงินเก็บ")}
                    >
                      เก็บ
                    </Button>
                    <Button
                      variant={selectedTypeProducts === "รวม" ? "primary" : "outline-primary"} 
                      onClick={() => handleTypeChangeProducts("รวม")}
                    >
                      รวม
                    </Button>
                  </ButtonGroup>
                  {/* ตัวเลือกกรองตามวันที่ */}
                  <DateFilter setFilter={handleDateChangeProducts} size="sm" />
                </div>
              </div>
              <hr style={{ borderTop: '1px solid #ddd', backgroundColor: '#ffffff' }} />
              {/* แสดงรายการล่าสุดของ Products */}
              <LatestProducts 
                selectedDate={selectedDateProducts} 
                selectedType={selectedTypeProducts} 
                onProductsUpdate={setProductData}
              />
            </Col>

            {/* แสดงสรุปยอดเงินใน Orders */}
            <Col md={5} style={{  
              padding: '20px', 
              backgroundColor: '#f4f6f8', 
              borderRadius: '10px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #ddd',
              flexBasis: '45%'
            }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>สรุปยอดเงิน</h4>
                <div className="d-flex align-items-center">
                  <ButtonGroup size="sm" className="me-2">
                    <Button
                      variant={selectedTypeOrders === "รายรับ" ? "success" : "outline-success"} 
                      onClick={() => handleTypeChangeOrders("รายรับ")}
                    >
                      รับ
                    </Button>
                    <Button
                      variant={selectedTypeOrders === "รายจ่าย" ? "danger" : "outline-danger"} 
                      onClick={() => handleTypeChangeOrders("รายจ่าย")}
                    >
                      จ่าย
                    </Button>
                    <Button
                      variant={selectedTypeOrders === "เงินเก็บ" ? "warning" : "outline-warning"} 
                      onClick={() => handleTypeChangeOrders("เงินเก็บ")}
                    >
                      เก็บ
                    </Button>
                    <Button
                      variant={selectedTypeOrders === "รวม" ? "primary" : "outline-primary"} 
                      onClick={() => handleTypeChangeOrders("รวม")}
                    >
                      รวม
                    </Button>
                  </ButtonGroup>
                  {/* ตัวเลือกกรองตามวันที่ */}
                  <DateFilter setFilter={handleDateChangeOrders} size="sm" />
                </div>
              </div>
              <hr style={{ borderTop: '1px solid #ddd', backgroundColor: '#ffffff' }} />
              {/* แสดงสรุปยอดล่าสุดของ Orders */}
              <LatestOrders 
                selectedDate={selectedDateOrders} 
                selectedType={selectedTypeOrders} 
                onOrdersUpdate={updateOrderData} 
              />
            </Col>
          </Row>

          {/* แสดงกราฟสรุปข้อมูลการเงิน */}
          <Row className="mt-4" style={{ gap: '20px' }}>
            {/* กราฟแผนภาพรายวัน */}
            <Col md={5} style={{
              padding: '20px', 
              backgroundColor: '#f4f6f8', 
              borderRadius: '10px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #ddd',
              flexBasis: '48%'
            }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>แผนภาพรายวัน</h4>
                <ButtonGroup size="sm" className="me-2">
                  <Button variant={viewOptionBar === "summary" ? "primary" : "outline-primary"} onClick={() => setViewOptionBar("summary")}>
                    รายการทั้งหมด
                  </Button>
                  <Button variant={viewOptionBar === "all" ? "primary" : "outline-primary"} onClick={() => setViewOptionBar("all")}>
                    สรุปยอด
                  </Button>
                </ButtonGroup>
              </div>
              <hr style={{ borderTop: '1px solid #ddd', backgroundColor: '#ffffff' }} />
              {/* กราฟแท่งแสดงผลรวมตามตัวเลือก viewOptionBar */}
              {viewOptionBar === "summary" ? (
                <SalesBarChart data={productData.map(item => ({ name: item.type, sales: Math.abs(item.amount) }))} />
              ) : (
                <SalesBarChart data={barChartData} />
              )}
            </Col>

            {/* กราฟสรุปรายรับ-รายจ่าย */}
            <Col md={5} style={{
              padding: '25px', 
              backgroundColor: '#f4f6f8', 
              borderRadius: '10px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #ddd',
              flexBasis: '45%'  
            }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>สรุปรายรับ-รายจ่าย</h4>
                <ButtonGroup size="sm" className="me-2">
                  <Button variant={viewOptionPie === "summary" ? "primary" : "outline-primary"} onClick={() => setViewOptionPie("summary")}>
                    รายการทั้งหมด
                  </Button>
                  <Button variant={viewOptionPie === "all" ? "primary" : "outline-primary"} onClick={() => setViewOptionPie("all")}>
                    สรุปยอด
                  </Button>
                </ButtonGroup>
              </div>
              <hr style={{ borderTop: '1px solid #ddd', backgroundColor: '#ffffff' }} />
              {/* แสดงกราฟวงกลมสรุปรายรับ-รายจ่ายตามตัวเลือก viewOptionPie */}
              {viewOptionPie === "summary" ? (
                <TrafficSourceChart data={productData} />
              ) : (
                <TrafficSourceChart data={orderData} />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

// ส่งออกคอมโพเนนต์ Overview เพื่อให้ใช้งานในไฟล์อื่น
export default Overview;
