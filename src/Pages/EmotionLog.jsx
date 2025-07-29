import { useLocation } from "react-router-dom";
import { useState } from "react";
import "../Styles/EmotionLog.css";

function EmotionLog() {
  const location = useLocation();
  const emotion = location.state?.emotion;
  const [text, setText] = useState("");

  if (!emotion) {
    return <p>No emotion selected.</p>;
  }
  return (
    <div className="emotion-log-page">
      <div className="prompt-box">
        <p>{emotion.prompt}</p>
      </div>

      <textarea
        placeholder="Use this space to write about your feelings"
        value={text}
        maxLength={100}
        onChange={(e) => setText(e.target.value)}
        className="emotion-textarea"
      />
      <p className="char-count">{text.length}/50</p>

      <button className="submit-button" onClick={() => alert("submitted!")}>
        {" "}
        Submit
      </button>
    </div>
  );
}
export default EmotionLog;
