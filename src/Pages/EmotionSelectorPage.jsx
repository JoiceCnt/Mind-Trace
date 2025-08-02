import { useState, useEffect } from "react";
import "../Styles/EmotionSelectorPage.css";
import { useNavigate } from "react-router-dom";

const EmotionSelectorPage = () => {
  const [emotions, setEmotions] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5005/emojis")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEmotions(data);
        } else {
          console.error(
            "Expected 'emojis' to be an array, but received:",
            data
          );
        }
      })
      .catch((err) => console.error("Error to load emotions", err));
  }, []);

  const handleSelect = (emotion) => {
    setSelectedEmotion(emotion);
    console.log("Selected:", emotion.name);
    navigate("/emotion-log", { state: { emotion } });
  };

  return (
    <div className="emotion-selector-page">
      <p className="intro-text">
      Welcome to the app where your feelings matter, every single day.
      </p>

      <div className="question-box">
        <h2>How are you feeling today?</h2>
      </div>

      <div className="emoji-grid">
        {emotions.map((emotion) => (
          <div
            key={emotion.id}
            className={`emoji-card ${
              selectedEmotion?.id === emotion.id ? "selected" : ""
            }`}
            onClick={() => handleSelect(emotion)}
          >
            <span className="emoji">{emotion.emoji}</span>
            <p className="emoji-label">{emotion.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionSelectorPage;
