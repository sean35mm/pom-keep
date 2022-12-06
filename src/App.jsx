import { useEffect, useState } from 'react';

function App() {
	const [sessions, setSessions] = useState(0);
	const [breakSessions, setBreakSessions] = useState(0)
	const [timer, setTimer] = useState(1 * 60);
	const [shortBreakTime, setShortBreakTime] = useState(10 * 60)
	const [longBreakTime, setLongBreakTime] = useState(25 * 60)
	const [onBreak, setOnBreak] = useState(false);
	const [timerActive, setTimerActive] = useState(false)


	useEffect(() => {
	
		if (timerActive === true) {
			let interval = setInterval(() => {
				clearInterval(interval)
				setTimer(timer - 1)
				if (timer === 0){
					setTimerActive(false)
					setTimer(shortBreakTime)
					setBreakSessions(breakSessions + 1)
				}
			}, 10)
		}

	
		return () => {
			
		}
	}, [timer, timerActive])
	

	const formatTime = (time) => {
		let minutes = Math.floor(time / 60);
		let seconds = time % 60;
		return (
			(minutes < 10 ? `0${minutes}` : minutes) +
			':' +
			(seconds < 10 ? `0${seconds}` : seconds)
		);
	};

	const handleShortBreak = () => {
		setTimerActive(false);
		setOnBreak(true);
		setTimer(shortBreakTime)
	}

	const handleLongBreak = () => {
		setTimerActive(false);
		setOnBreak(true);
		setTimer(longBreakTime)
	}




	

	return (
		<div className='bg-slate-400 flex flex-col items-center justify-center h-screen'>
			<h1 className='text-2xl font-bold'>Pomodoro Keeper</h1>
			<div>
				<h3>Sessions Completed: {sessions}</h3>
				<h3>Breaks Completed: {breakSessions}</h3>
			</div>
			<h1 className='text-9xl m-4'>{formatTime(timer)}</h1>
			<div>
				<button onClick={() => setTimerActive(!timerActive)} className='btn'>
					{!timerActive ? "Start" : "Pause"}
				</button>
				<button className='btn'>
					Reset
				</button>
			</div>
			<h3 className='mt-4'>Want to set a break?</h3>
				<div className="flex mt-4">
					<button onClick={handleShortBreak} className='btn'>
						Short Break
					</button>
					<button onClick={handleLongBreak} className='btn'>
						Long Break
					</button>
				</div>
		</div>
	);
}

export default App;
