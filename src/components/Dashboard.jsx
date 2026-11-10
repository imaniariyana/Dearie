function Dashboard({ userName }) {
  return (
    <main className="dashboard">
      <header>
        <h1>Dearie ♡</h1>
        <p>Your little corner of calm</p>
      </header>

      <div className="greeting">
        <h2>Hi, {userName}! ♡</h2>
        <p>Be gentle to yourself</p>
      </div>

      <div className="wellness">
        <h2>How are you feeling today?</h2>
        <div className="mood-options">
          <button>😔 Low</button>
          <button>😢 Sad</button>
          <button>😡 Angry</button>
          <button>😊 Happy</button>
          <button>🥰 Loved</button>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
