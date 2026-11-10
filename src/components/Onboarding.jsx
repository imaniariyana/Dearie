import React from "react";

function Onboarding({ onContinue }) {
  const [name, setName] = React.useState("");
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  async function handleContinue() {
    const trimmedName = name.trim();

    // Make sure the user entered a name
    if (trimmedName === "") {
      setShowError(true);
      setErrorMessage("Please enter your name before continuing.");
      return;
    }

    setShowError(false);
    setErrorMessage("");
    setIsSaving(true);

    try {
      // Send the user's name to our Express backend
      const response = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
        }),
      });

      // Check whether the backend accepted the request
      if (!response.ok) {
        throw new Error("Failed to save name");
      }

      // Read the response from Express
      const data = await response.json();

      console.log("User saved:", data);

      // Only continue after the backend successfully saves the name
      onContinue(data.user.name);
    } catch (error) {
      console.error("Error saving name:", error);
      setErrorMessage("Oops! We couldn't save your name. Try again ♡");
      setShowError(true);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="onboarding">
      <h2>What should we call you?</h2>
      <p>Let's make this space all about you!</p>

      <input
        type="text"
        id="name"
        placeholder="Your name..."
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          setShowError(false);
        }}
        required
      />

      <button id="continueBtn" onClick={handleContinue} disabled={isSaving}>
        {isSaving ? "Saving..." : "Continue ♡"}
      </button>

      {showError && <p className="name-error">{errorMessage}</p>}
    </div>
  );
}

export default Onboarding;
