import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Styles/EmotionLog.css";

function EmotionLog() {
  const location = useLocation();
  const navigate = useNavigate();
  const emotion = location.state?.emotion;
  const [text, setText] = useState("");

  if (!emotion) return <p>No emotion selected.</p>;

  const handleSubmit = () => {
    const newLog = {
      patientId: "patient_1",
      date: new Date().toISOString().split("T")[0],
      emojiId: emotion.id,
      nameId: emotion.name,
      prompt: emotion.prompt,
      description: text,
    };

    fetch("http://localhost:5005/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLog),
    })
      .then((res) => res.json())
      .then(() => navigate("/submission-confirmation"))
      .catch((err) => console.error("Erro ao salvar:", err));
  };

  return (
    <div className="emotion-log-page">
      <div className="prompt-box">
        <p>{emotion.prompt}</p>
      </div>

      <textarea
        className="emotion-textarea"
        value={text}
        maxLength={100}
        onChange={(e) => setText(e.target.value)}
        placeholder="Use this space to write about your feelings"
        maxLength={50}
      />
      <p className="char-count">{text.length}/50</p>

      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default EmotionLog;
