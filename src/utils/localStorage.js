// Local storage keys
const GOALS_KEY = 'fitness_goals';
const PROGRESS_KEY = 'fitness_progress';

// Goal operations
export const saveGoals = (goals) => {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
};

export const getGoals = () => {
  const goals = localStorage.getItem(GOALS_KEY);
  return goals ? JSON.parse(goals) : [];
};

// Progress operations
export const saveProgress = (progress) => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
};

export const getProgress = () => {
  const progress = localStorage.getItem(PROGRESS_KEY);
  return progress ? JSON.parse(progress) : {};
};

// Helper function to calculate progress statistics
export const calculateStats = (goals, progress) => {
  const today = new Date().toISOString().split('T')[0];
  const thisWeek = getWeekDates();
  
  const stats = {
    totalGoals: goals.length,
    completedToday: 0,
    completedThisWeek: 0,
    averageProgress: 0
  };

  goals.forEach(goal => {
    const todayProgress = progress[today]?.[goal.id] || 0;
    const weeklyProgress = thisWeek.reduce((sum, date) => {
      return sum + (progress[date]?.[goal.id] || 0);
    }, 0);

    if (todayProgress >= goal.target) {
      stats.completedToday++;
    }
    if (weeklyProgress >= goal.target * 7) {
      stats.completedThisWeek++;
    }
    stats.averageProgress += (todayProgress / goal.target) * 100;
  });

  stats.averageProgress = stats.totalGoals > 0 
    ? Math.round(stats.averageProgress / stats.totalGoals) 
    : 0;

  return stats;
};

// Helper function to get dates for the current week
const getWeekDates = () => {
  const today = new Date();
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};