import { useEffect, useState } from "react";
import "./../Styles/PatientLogs.css";

function PatientLogs() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const patientId = localStorage.getItem("patientId");
  console.log("Logged in patientId:", patientId);

  // load the logssi
  useEffect(() => {
    fetch(`${import.meta.env.JSONSERVER_URL}/logs`)
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
        setFilteredLogs(data);
        console.log(data);
      });
  }, []);

  // Filter by date
  const handleFilter = () => {
    const from = new Date(dateFrom);
    const to = new Date(dateTo);

    const filtered = logs.filter((log) => {
      const logDate = new Date(log.date);
      return (!dateFrom || logDate >= from) && (!dateTo || logDate <= to);
    });

    setFilteredLogs(filtered);
  };

  return (
    <div
      className="logs-container"
      style={{
        width: "60%",
        margin: "0 auto",
        justifyContent: "center",
        minHeight: "25vh",
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <h2>History</h2>

      <div className="logs-header">
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>

      <div className="log-list">
        {filteredLogs.map((log) => (
          <div key={log.id} className="log-item">
            <div className="log-emoji">{getEmojiById(log.emojiId)}</div>
            <div className="log-date">{formatDate(log.date)}</div>
            <div className="log-description">{log.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Emojis por ID
function getEmojiById(id) {
  const emojiMap = {
    e01: "😊",
    e02: "😢",
    e03: "😠",
    e04: "😱",
    e05: "😴",
    e06: "😍",
    e07: "😕",
    e08: "😨",
    e09: "😎",
    e10: "😌",
    e11: "🤯",
    e12: "🤗",
    e13: "😤",
    e14: "😔",
    e15: "😅",
    e16: "🤔",
    e17: "😇",
    e18: "🤒",
    e19: "🥺",
    e20: "🤩",
  };
  return emojiMap[id] || "❓";
}

// Formata data de YYYY-MM-DD → DD/MM/YYYY
function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

export default PatientLogs;
