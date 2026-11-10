import React from "react";

function Onboarding({ onContinue }) {
  const [name, setName] = React.useState("");
  const [showError, setShowError] = React.useState(false);

  function handleContinue() {
    const trimmedName = name.trim();

    if (trimmedName === "") {
      setShowError(true);
      return;
    }

    setShowError(false);
    onContinue(trimmedName);
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

      <button id="continueBtn" onClick={handleContinue}>
        Continue ♡
      </button>

      {showError && (
        <p className="name-error">
          Please enter your name before continuing.
        </p>
      )}
    </div>
  );
}

export default Onboarding;
