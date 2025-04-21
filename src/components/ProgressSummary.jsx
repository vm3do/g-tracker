import './ProgressSummary.css';

const ProgressSummary = ({ stats }) => {
  return (
    <div className="progress-summary">
      <h2>Progress Summary</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Goals</h3>
          <p className="stat-value">{stats.totalGoals}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Today</h3>
          <p className="stat-value">{stats.completedToday}</p>
        </div>
        <div className="stat-card">
          <h3>Completed This Week</h3>
          <p className="stat-value">{stats.completedThisWeek}</p>
        </div>
        <div className="stat-card">
          <h3>Average Progress</h3>
          <p className="stat-value">{stats.averageProgress}%</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;