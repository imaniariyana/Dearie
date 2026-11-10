import { useState } from "react";

function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [message, setMessage] = useState("");

  // This function runs when the user clicks "Save Mood"
  // It can access selectedMood because it's inside MoodTracker
  async function handleSaveMood() {
    if (selectedMood === null) {
      setMessage("Please select a mood first ♡");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/moods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mood: selectedMood,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save mood");
      }

      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      console.error("Error saving mood:", error);
      setMessage("Oops! Something went wrong ♡");
    }
  }

  return (
    <div className="wellness">
      <h2>How are you feeling today?</h2>

      <div className="mood-options">
        <button
          className={selectedMood === "low" ? "selected" : ""}
          onClick={() => setSelectedMood("low")}
        >
          😔 Low
        </button>

        <button
          className={selectedMood === "sad" ? "selected" : ""}
          onClick={() => setSelectedMood("sad")}
        >
          😢 Sad
        </button>

        <button
          className={selectedMood === "angry" ? "selected" : ""}
          onClick={() => setSelectedMood("angry")}
        >
          😡 Angry
        </button>

        {/* 
          className uses a ternary operator:
          If selectedMood is "happy", add the "selected" CSS class.
          Otherwise, use an empty className.

          onClick runs an arrow function when the button is clicked.
          setSelectedMood("happy") updates React state to "happy".
          React then re-renders the component with the new state.
        */}
        <button
          className={selectedMood === "happy" ? "selected" : ""}
          onClick={() => setSelectedMood("happy")}
        >
          😊 Happy
        </button>

        <button
          className={selectedMood === "loved" ? "selected" : ""}
          onClick={() => setSelectedMood("loved")}
        >
          🥰 Loved
        </button>
      </div>

      {/* Calls handleSaveMood when the user clicks this button */}
      <button onClick={handleSaveMood}>Save Mood ♡</button>
      {message && <p className="mood-message">{message}</p>}
    </div>
  );
}

export default MoodTracker;
