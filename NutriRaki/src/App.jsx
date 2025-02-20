import React, { useState } from 'react';
import './App.css';

function App() {
  // State for meals/exercises
  const [items, setItems] = useState([]);
  // Meal state
  const [mealData, setMealData] = useState({
    name: '',
    mealType: 'breakfast',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });
  // Exercise state
  const [exerciseData, setExerciseData] = useState({
    exerciseType: 'cardio',
    exerciseName: 'pushups',
    duration: ''
  });

  // Utility functions
  const updateTotals = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    items.forEach(item => {
      if (item.type === 'meal') {
        totalCalories += item.calories;
        totalProtein += item.protein;
        totalCarbs += item.carbs;
        totalFat += item.fat;
      } else if (item.type === 'exercise') {
        const burned = item.exerciseType === 'cardio' ? 10 * item.duration : 5 * item.duration;
        totalCalories -= burned;
        if (totalCalories < 0) totalCalories = 0;
      }
    });
    return { totalCalories, totalProtein, totalCarbs, totalFat };
  };

  const totals = updateTotals();

  // Handlers for meal inputs
  const handleMealChange = (e) => {
    const { name, value } = e.target;
    setMealData(prev => ({ ...prev, [name]: value }));
  };

  const addMeal = () => {
    if (mealData.name.trim() === '') {
      alert('Please enter a valid meal name.');
      return;
    }
    const newMeal = {
      type: 'meal',
      name: mealData.name,
      mealType: mealData.mealType,
      calories: parseInt(mealData.calories) || 0,
      protein: parseInt(mealData.protein) || 0,
      carbs: parseInt(mealData.carbs) || 0,
      fat: parseInt(mealData.fat) || 0
    };
    setItems(prev => [...prev, newMeal]);
    setMealData({
      name: '',
      mealType: 'breakfast',
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    });
  };

  // Handlers for exercise inputs
  const handleExerciseChange = (e) => {
    const { name, value } = e.target;
    setExerciseData(prev => ({ ...prev, [name]: value }));
  };

  const addExercise = () => {
    if (parseInt(exerciseData.duration) <= 0) {
      alert('Please enter a valid duration or rep count.');
      return;
    }
    const newExercise = {
      type: 'exercise',
      exerciseType: exerciseData.exerciseType,
      exerciseName: exerciseData.exerciseName,
      duration: parseInt(exerciseData.duration)
    };
    setItems(prev => [...prev, newExercise]);
    setExerciseData({
      exerciseType: 'cardio',
      exerciseName: 'pushups',
      duration: ''
    });
  };

  // Remove item by index
  const removeItem = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setItems([]);
  };

  const resetAll = () => {
    clearAll();
    setMealData({
      name: '',
      mealType: 'breakfast',
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    });
    setExerciseData({
      exerciseType: 'cardio',
      exerciseName: 'pushups',
      duration: ''
    });
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <h1>NutriRaki</h1>
          </div>
        </div>
        <div className="header-right">
          <p className="proverb">"Health is wealth."</p>
        </div>
      </header>

      <div className="content">
        {/* Brand Section */}
        <div className="brand-section bordered">
          <img 
            src="https://play-lh.googleusercontent.com/SLfKTYVm-AT-OiOAOfQFJ8zk42d9tAqRa9Uhil_f603pCqtdVSyrw4CdfgYkitboHM0O" 
            alt="NutriRaki Logo" 
            className="brand-logo"
          />
          <div className="brand-info">
            <h2>Welcome to NutriRaki!</h2>
            <p>
              Track your daily meals, nutrients, and exercises effortlessly every day. Stay on top of your nutrition and fitness goals with simple logging and progress tracking.
            </p>
          </div>
        </div>

        {/* Meal Input Form */}
        <div className="input-section bordered compact-section">
          <h3 className="section-heading">Meal Entry</h3>
          <div className="fields-grid">
            <div className="input-box">
              <label htmlFor="itemName">Item Name</label>
              <input 
                type="text" 
                id="itemName" 
                name="name"
                placeholder="Enter item name" 
                value={mealData.name}
                onChange={handleMealChange}
              />
            </div>
            <div className="input-box">
              <label htmlFor="mealType">Meal Type</label>
              <select 
                id="mealType" 
                name="mealType" 
                value={mealData.mealType}
                onChange={handleMealChange}
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
            <div className="input-box">
              <label htmlFor="calories">Calories</label>
              <input 
                type="number" 
                id="calories" 
                name="calories"
                placeholder="Enter calories" 
                value={mealData.calories}
                onChange={handleMealChange}
              />
            </div>
            <div className="input-box">
              <label htmlFor="protein">Protein (g)</label>
              <input 
                type="number" 
                id="protein" 
                name="protein"
                placeholder="Enter protein" 
                value={mealData.protein}
                onChange={handleMealChange}
              />
            </div>
            <div className="input-box">
              <label htmlFor="carbs">Carbs (g)</label>
              <input 
                type="number" 
                id="carbs" 
                name="carbs"
                placeholder="Enter carbs" 
                value={mealData.carbs}
                onChange={handleMealChange}
              />
            </div>
            <div className="input-box">
              <label htmlFor="fat">Fat (g)</label>
              <input 
                type="number" 
                id="fat" 
                name="fat"
                placeholder="Enter fat" 
                value={mealData.fat}
                onChange={handleMealChange}
              />
            </div>
          </div>
          <div className="btn-section">
            <button onClick={addMeal} className="neon-btn neon-green">Add Meal</button>
          </div>
        </div>

        {/* Exercise Input Form */}
        <div className="input-section bordered compact-section">
          <h3 className="exerciseentry">Exercise Entry</h3>
          <div className="fields-grid">
            <div className="input-box">
              <label htmlFor="exerciseType">Exercise Type</label>
              <select 
                id="exerciseType" 
                name="exerciseType" 
                value={exerciseData.exerciseType}
                onChange={handleExerciseChange}
              >
                <option value="cardio">Cardio</option>
                <option value="weight">Weight Lifting</option>
              </select>
            </div>
            <div className="input-box">
              <label htmlFor="exerciseName">Exercise Name</label>
              <select 
                id="exerciseName" 
                name="exerciseName" 
                value={exerciseData.exerciseName}
                onChange={handleExerciseChange}
              >
                <option value="pushups">Pushups</option>
                <option value="jumpingJacks">Jumping Jacks</option>
                <option value="planks">Planks</option>
                <option value="squats">Squats</option>
                <option value="burpees">Burpees</option>
              </select>
            </div>
            <div className="input-box">
              <label htmlFor="exerciseDuration">Duration / Reps</label>
              <input 
                type="number" 
                id="exerciseDuration" 
                name="duration"
                placeholder="Minutes or Reps" 
                value={exerciseData.duration}
                onChange={handleExerciseChange}
              />
            </div>
          </div>
          <div className="btn-section">
            <button onClick={addExercise} className="neon-btn neon-red">Add Exercise</button>
          </div>
        </div>

        {/* Items Display */}
        <div className="input-section bordered compact-section">
          <h3 className="addeditems">Added Items</h3>
          <div id="itemsContainer" className="items-container">
            {items.map((item, index) => (
              <div 
                key={index} 
                className="item-card" 
                data-meal-type={item.type === 'meal' ? item.mealType : undefined}
                data-exercise={item.type === 'exercise' ? true : undefined}
              >
                {item.type === 'meal' ? (
                  <>
                    <div className="item-type">Food</div>
                    <h3>{item.name}</h3>
                    <div className="item-details">
                      Meal: {item.mealType.charAt(0).toUpperCase() + item.mealType.slice(1)}<br />
                      Calories: {item.calories}<br />
                      Protein: {item.protein}g<br />
                      Carbs: {item.carbs}g<br />
                      Fat: {item.fat}g
                    </div>
                  </>
                ) : (
                  <>
                    <div className="item-type">Exercise</div>
                    <h3>{item.exerciseName}</h3>
                    <div className="item-details">
                      Exercise: {item.exerciseType.charAt(0).toUpperCase() + item.exerciseType.slice(1)}<br />
                      Duration/Reps: {item.duration}<br />
                      Burned Calories: {item.exerciseType === 'cardio' ? (10 * item.duration) : (5 * item.duration)}
                    </div>
                  </>
                )}
                <button className="remove-btn" onClick={() => removeItem(index)}>×</button>
              </div>
            ))}
          </div>
          <div className="btn-section">
            <button onClick={clearAll} className="neon-btn neon-red">Clear All</button>
            <button onClick={resetAll} className="neon-btn neon-green">Reset</button>
          </div>
        </div>

        {/* Totals */}
        <div className="totals-wrapper">
          <div className="totals-container neon-totals">
            <h2>Totals</h2>
            <p>Total Calories: <span id="totalCalories">{totals.totalCalories}</span></p>
            <p>Total Protein: <span id="totalProtein">{totals.totalProtein}</span> g</p>
            <p>Total Carbs: <span id="totalCarbs">{totals.totalCarbs}</span> g</p>
            <p>Total Fat: <span id="totalFat">{totals.totalFat}</span> g</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
