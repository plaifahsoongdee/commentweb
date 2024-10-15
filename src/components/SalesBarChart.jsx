// นำเข้า React และคอมโพเนนต์จาก recharts สำหรับการสร้างกราฟแท่ง (Bar Chart)
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';

// กำหนดสีสำหรับแต่ละประเภทข้อมูลในกราฟ
const COLORS = {
  "รายรับ": 'green',      // สีเขียวสำหรับรายรับ
  "รายจ่าย": 'red',       // สีแดงสำหรับรายจ่าย
  "เงินเก็บ": 'orange',   // สีส้มสำหรับเงินเก็บ
  "No Data": '#CCCCCC'     // สีเทาสำหรับกรณีไม่มีข้อมูล
};

// ฟังก์ชันคอมโพเนนต์ SalesBarChart สำหรับแสดงกราฟแท่งข้อมูลการเงิน
// รับ props data ซึ่งเป็นข้อมูลที่ใช้ในกราฟ
function SalesBarChart({ data }) {
  // ตรวจสอบว่ามีข้อมูล (data) หรือไม่ โดยดูจากว่ามี item ที่ sales ไม่เป็น 0 หรือไม่
  const hasData = data && data.length > 0 && data.some(item => item.sales !== 0);

  // สร้างรายการ legend ที่ไม่ซ้ำตามประเภท โดยแสดง "No Data" หากไม่มีข้อมูล
  const uniqueLegend = hasData ? [
    { value: "รายรับ", type: "square", color: COLORS["รายรับ"] },
    { value: "รายจ่าย", type: "square", color: COLORS["รายจ่าย"] },
    { value: "เงินเก็บ", type: "square", color: COLORS["เงินเก็บ"] },
  ] : [{ value: "No Data", type: "square", color: COLORS["No Data"] }];

  // ส่วนการแสดงผล UI ของกราฟแท่ง
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ marginBottom: '40px' }}>
        {/* BarChart กำหนดขนาดและข้อมูล (ถ้าไม่มีข้อมูล ใช้ [{ name: "No Data", sales: 0 }]) */}
        <BarChart width={500} height={300} data={hasData ? data : [{ name: "No Data", sales: 0 }]}>
          {/* XAxis ใช้ key "name" และ YAxis แสดงค่าด้วย "฿" */}
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `฿${value}`} />
          <Tooltip formatter={(value) => `฿${value}`} /> {/* Tooltip แสดงยอดเงินใน "฿" */}
          <Legend payload={uniqueLegend} /> {/* Legend จะแสดงค่า uniqueLegend ที่ตั้งไว้ */}

          {/* Bar ใช้ dataKey="sales" */}
          <Bar dataKey="sales">
            {/* ใช้สีที่กำหนดไว้ใน COLORS ตาม entry.name หรือสีเทาเมื่อไม่มีข้อมูล */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS["No Data"]} />
            ))}
          </Bar>

          {/* กรณีไม่มีข้อมูล แสดงข้อความ "No Data" ตรงกลางกราฟ */}
          {!hasData && (
            <text
              x={250} // กำหนดตำแหน่ง x ให้อยู่กึ่งกลาง
              y={150} // กำหนดตำแหน่ง y ให้อยู่กึ่งกลาง
              textAnchor="middle"
              fill="#CCCCCC"
              style={{ fontSize: '18px' }}
            >
              No Data
            </text>
          )}
        </BarChart>
      </div>
    </div>
  );
}

// ส่งออกคอมโพเนนต์ SalesBarChart เพื่อให้ใช้งานในไฟล์อื่น
export default SalesBarChart;
