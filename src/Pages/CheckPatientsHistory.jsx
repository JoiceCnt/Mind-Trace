import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/CheckPatientsHistory.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CheckPatientsHistory = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  useEffect(() => {
    axios.get("http://localhost:5005/logs")
      .then((response) => {
      console.log("Fetched logs:", response.data);
        // Se for response.data.logs, atualize aqui
        setLogs(Array.isArray(response.data) ? response.data : response.data.logs);
      })
      .catch((error) => {
      console.error("Error fetching logs:", error);
      });
  }, []);
  
  const handleFilter = () => {
    const filtered = logs.filter((log) => {
    const nameMatch =
      patientName === "" ||
      log.patientName.toLowerCase().includes(patientName.toLowerCase());    const logDate = new Date(log.date);
    const fromDate = dateRange.from ? new Date(dateRange.from) : null;
    const toDate = dateRange.to ? new Date(dateRange.to) : null;
    const fromMatch = !fromDate || logDate >= fromDate;
    const toMatch = !toDate || logDate <= toDate;    return nameMatch && fromMatch && toMatch; // :marca_de_verificación_blanca:
  });
  setFilteredLogs(filtered);
};


  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Patient Emotional History", 14, 20);

    const tableData = filteredLogs.map((log) => [
      log.patientName,
      log.date,
      log.nameId,
      log.nameId,
      log.description,
    ]);

    doc.autoTable({
      startY: 30,
      head: [["Name", "Date", "Emotion", "Comment"]],
      body: tableData,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [92, 128, 188] },
    });

    doc.save("patient-history.pdf");
  }

  return (
    <div className="history-container">
      <h2>Check Patient's History</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Enter patient name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
         <label>
          From:
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
          />
        </label>
        
        <button onClick={handleFilter}>Filter</button>
        <button onClick={handleDownloadPDF}>Download PDF</button>
      </div>

      <div className="log-list">
        {filteredLogs.length === 0 ? (
          <p>No records found.</p>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.id} className="log-entry">
              <p><strong>Name:</strong> {log.patientName}</p>
              <p><strong>Date:</strong> {log.date}</p>
              <p><strong>Emotion:</strong> {log.nameId}</p>
              <p><strong>Comment:</strong> {log.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CheckPatientsHistory;
