
import React, { useState, useEffect } from 'react';



function App() {

	const [minutes, setMinutes] = useState(7);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [breakLength, setBreakLength] = useState(5);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setMinutes(7);
    setSeconds(0);
    setIsActive(false);
    setIsBreak(false);
    setBreakLength(5);
    setPomodoroCount(0);
  };

  const startBreak = () => {
    setIsBreak(true);
    setMinutes(breakLength);
    setSeconds(0);
  };

  const startPomodoro = () => {
    setIsBreak(false);
    setMinutes(7);
    setSeconds(0);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
				clearInterval(interval)
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0 && isActive === true) {
            if (isBreak) {
              startPomodoro();
              setPomodoroCount(pomodoroCount + 1);
            } else {
              if (pomodoroCount === 4) {
                setBreakLength(20)


              }

              startBreak();
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }

      }, 1000);

    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);

  }, [isActive, seconds, minutes, isBreak, breakLength, pomodoroCount]);


  return (
    <div className='bg-slate-400 flex flex-col items-center justify-center h-screen'>
			<h1>Pomodoro Timer</h1>
			<h3>Session Count: {pomodoroCount}</h3>
      <div className="text-4xl">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className="row">
        <button className={isActive ? `btn-secondary` : `btn`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="btn" onClick={reset}>
          Reset
        </button>
      </div>
      
    </div>
  );
};
export default App;



