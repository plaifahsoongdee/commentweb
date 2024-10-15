// นำเข้า React และคอมโพเนนต์จาก recharts สำหรับการสร้างกราฟวงกลม (Pie Chart)
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// กำหนดสีสำหรับแต่ละประเภทข้อมูลในกราฟ
const COLORS = {
  "รายรับ": 'green',       // สีเขียวสำหรับรายรับ
  "รายจ่าย": 'red',        // สีแดงสำหรับรายจ่าย
  "เงินเก็บ": 'orange',    // สีส้มสำหรับเงินเก็บ
  "No Data": '#CCCCCC'      // สีเทาสำหรับกรณีไม่มีข้อมูล
};

// ฟังก์ชันคอมโพเนนต์ TrafficSourceChart สำหรับแสดงกราฟวงกลม
// รับ props data ซึ่งเป็นข้อมูลที่ใช้ในกราฟ
function TrafficSourceChart({ data }) {
  // ตรวจสอบว่ามีข้อมูลหรือไม่
  const hasData = data && data.some(item => item.amount !== 0);

  // ถ้ามีข้อมูลให้สร้าง chartData ที่เป็นข้อมูลกราฟ โดยใช้ Math.abs เพื่อแสดงค่า absolute ของ amount
  const chartData = hasData 
    ? data.map(item => ({
        name: item.type,              // ประเภทของข้อมูล (รายรับ, รายจ่าย, เงินเก็บ)
        value: Math.abs(item.amount), // จำนวนเงิน
      })) 
    : [{ name: "No Data", value: 1 }]; // ถ้าไม่มีข้อมูล ใช้ข้อมูลเริ่มต้นที่มีค่า No Data

  // กำหนด Legend ให้แสดงเฉพาะประเภทที่มีข้อมูล หรือแสดง No Data ถ้าไม่มีข้อมูล
  const uniqueLegend = hasData ? [
    { value: "รายรับ", type: "square", color: COLORS["รายรับ"] },
    { value: "รายจ่าย", type: "square", color: COLORS["รายจ่าย"] },
    { value: "เงินเก็บ", type: "square", color: COLORS["เงินเก็บ"] },
  ] : [{ value: "No Data", type: "square", color: COLORS["No Data"] }];

  // ส่วนการแสดงผล UI ของกราฟวงกลม
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}       // ข้อมูลที่ใช้ในกราฟวงกลม
          dataKey="value"        // ใช้ "value" ในการกำหนดขนาดของส่วนในกราฟ
          nameKey="name"         // ใช้ "name" เพื่อแสดงชื่อประเภทข้อมูลในกราฟ
          cx="50%"               // ตำแหน่งกึ่งกลางแกน X ของกราฟ
          cy="50%"               // ตำแหน่งกึ่งกลางแกน Y ของกราฟ
          outerRadius={150}      // รัศมีของกราฟวงกลม
          fill="#8884d8"         // สีเริ่มต้นของกราฟ
          label={!hasData ? { position: 'center', value: "No Data" } : undefined} // แสดง "No Data" ตรงกลางถ้าไม่มีข้อมูล
        >
          {/* กำหนดสีของแต่ละส่วนในกราฟตามประเภทข้อมูลหรือเป็นสีเทาถ้าไม่มีข้อมูล */}
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
          ))}
        </Pie>
        <Tooltip />                 {/* แสดงข้อมูล tooltip เมื่อ hover */}
        <Legend payload={uniqueLegend} /> {/* แสดง legend ตามประเภทข้อมูลที่กำหนดใน uniqueLegend */}
      </PieChart>
    </div>
  );
}

// ส่งออกคอมโพเนนต์ TrafficSourceChart เพื่อให้ใช้งานในไฟล์อื่น
export default TrafficSourceChart;
