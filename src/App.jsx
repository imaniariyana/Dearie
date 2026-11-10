import React from "react";
import Welcome from "./components/Welcome.jsx";
import Onboarding from "./components/Onboarding.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  const [currentScreen, setCurrentScreen] = React.useState("welcome");
  const [userName, setUserName] = React.useState("");

  function handleContinue(name) {
    setUserName(name);
    setCurrentScreen("dashboard");
  }

  return (
    <>
      {currentScreen === "welcome" && (
        <Welcome onGetStarted={() => setCurrentScreen("onboarding")} />
      )}

      {currentScreen === "onboarding" && (
        <Onboarding onContinue={handleContinue} />
      )}

      {currentScreen === "dashboard" && <Dashboard userName={userName} />}
    </>
  );
}

export default App;
