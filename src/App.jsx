import { useState, useEffect } from 'react';
import GoalForm from './components/GoalForm';
import GoalItem from './components/GoalItem';
import ProgressSummary from './components/ProgressSummary';
import { getGoals, saveGoals, getProgress, saveProgress, calculateStats } from './utils/localStorage';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [progress, setProgress] = useState({});
  const [stats, setStats] = useState({
    totalGoals: 0,
    completedToday: 0,
    completedThisWeek: 0,
    averageProgress: 0
  });

  useEffect(() => {
    const loadedGoals = getGoals();
    const loadedProgress = getProgress();
    setGoals(loadedGoals);
    setProgress(loadedProgress);
  }, []);

  useEffect(() => {
    const newStats = calculateStats(goals, progress);
    setStats(newStats);
  }, [goals, progress]);

  const handleSaveGoal = (goal) => {
    const updatedGoals = goals.find(g => g.id === goal.id)
      ? goals.map(g => g.id === goal.id ? goal : g)
      : [...goals, goal];
    
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
  };

  const handleDeleteGoal = (goalId) => {
    const updatedGoals = goals.filter(g => g.id !== goalId);
    setGoals(updatedGoals);
    saveGoals(updatedGoals);

    // Remove progress for the deleted goal
    const updatedProgress = { ...progress };
    Object.keys(updatedProgress).forEach(date => {
      delete updatedProgress[date][goalId];
    });
    setProgress(updatedProgress);
    saveProgress(updatedProgress);
  };

  const handleUpdateProgress = (goalId, value) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedProgress = {
      ...progress,
      [today]: {
        ...(progress[today] || {}),
        [goalId]: value
      }
    };
    
    setProgress(updatedProgress);
    saveProgress(updatedProgress);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Fitness Goal Tracker</h1>
      </header>
      
      <main className="app-main">
        <ProgressSummary stats={stats} />
        
        <section className="goals-section">
          <h2>Add New Goal</h2>
          <GoalForm onSave={handleSaveGoal} />
          
          <h2>Your Goals</h2>
          <div className="goals-list">
            {goals.length > 0 ? (
              goals.map(goal => {
                const today = new Date().toISOString().split('T')[0];
                const currentProgress = progress[today]?.[goal.id] || 0;
                
                return (
                  <GoalItem
                    key={goal.id}
                    goal={goal}
                    progress={currentProgress}
                    onUpdate={handleUpdateProgress}
                    onDelete={handleDeleteGoal}
                  />
                );
              })
            ) : (
              <p className="no-goals">No goals yet. Add your first fitness goal above!</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

