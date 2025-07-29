import { useState, useEffect } from "react";


const EmotionSelectorPage = () => {
  const [emotions, setEmotions] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState([]);


useEffect(() => {
  fetch('http://localhost:5005/emojis')
    .then((response) => response.json())
    .then((data) => {
      console.log('Emotions fetched:', data);
      setEmotions(data)
    })
    .catch((err) => console.error('Failed to load emotions', err));
 }, []);

const handleSelect = (emotion) => {
  setSelectedEmotion(emotion)
}

return (
 <div className="emotion-selector-container">
    <h1>How are you feeling today?</h1>
    <div className="emoji-grid">
      {emotions.map((emotion) => (
        <button
          key={emotion.id}
          className={`emoji-button ${selectedEmotion?.id === emotion.id ? 'selected' : ''}`}
          onClick={ () => handleSelect(emotion)}>
            {emotion.emoji}
        </button>
        ))
      }
    </div>
  </div>


  );
};

export default EmotionSelectorPage;
