import MoodTracker from "./MoodTracker";

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
      <MoodTracker />
    </main>
  );
}

export default Dashboard;
