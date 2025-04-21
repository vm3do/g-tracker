import { useState } from 'react';
import './GoalForm.css';

const GoalForm = ({ onSave, initialGoal = null }) => {
  const [goal, setGoal] = useState(initialGoal || {
    title: '',
    target: '',
    unit: '',
    category: 'steps'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goal.title || !goal.target) return;

    onSave({
      ...goal,
      id: initialGoal?.id || Date.now().toString(),
      target: Number(goal.target)
    });

    if (!initialGoal) {
      setGoal({
        title: '',
        target: '',
        unit: '',
        category: 'steps'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="title"
          value={goal.title}
          onChange={handleChange}
          placeholder="Goal title"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="target"
          value={goal.target}
          onChange={handleChange}
          placeholder="Target value"
          required
          min="0"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="unit"
          value={goal.unit}
          onChange={handleChange}
          placeholder="Unit (e.g., steps, glasses)"
          required
        />
      </div>
      <div className="form-group">
        <select
          name="category"
          value={goal.category}
          onChange={handleChange}
        >
          <option value="steps">Steps</option>
          <option value="water">Water Intake</option>
          <option value="workout">Workout</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit" className="submit-button">
        {initialGoal ? 'Update Goal' : 'Add Goal'}
      </button>
    </form>
  );
};

export default GoalForm;