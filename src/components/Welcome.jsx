function Welcome({ onGetStarted }) {
  return (
    <div className="welcome">
      <img src="/images/pixel-bunny.png" alt="white bunny with pink bow" />
      <h1>Welcome to Dearie♡</h1>
      <p>Your little corner of calm.</p>
      <button onClick={onGetStarted}>Get Started</button>
    </div>
  );
}

export default Welcome;
