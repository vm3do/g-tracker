import { useState } from 'react';
import './GoalItem.css';

const GoalItem = ({ goal, progress, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(progress || 0);
  const today = new Date().toISOString().split('T')[0];

  const handleProgressChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setCurrentProgress(value);
  };

  const handleProgressSubmit = (e) => {
    e.preventDefault();
    onUpdate(goal.id, currentProgress);
  };

  const progressPercentage = Math.min(100, (currentProgress / goal.target) * 100);

  return (
    <div className="goal-item">
      <div className="goal-header">
        <h3>{goal.title}</h3>
        <div className="goal-actions">
          <button 
            className="edit-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button 
            className="delete-button"
            onClick={() => onDelete(goal.id)}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="goal-details">
        <p>Target: {goal.target} {goal.unit}</p>
        <p>Category: {goal.category}</p>
      </div>

      <div className="progress-section">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="progress-text">
          {currentProgress} / {goal.target} {goal.unit} ({Math.round(progressPercentage)}%)
        </span>
      </div>

      <form className="progress-form" onSubmit={handleProgressSubmit}>
        <input
          type="number"
          value={currentProgress}
          onChange={handleProgressChange}
          min="0"
          placeholder="Enter progress"
        />
        <button type="submit">Update Progress</button>
      </form>
    </div>
  );
};

export default GoalItem;