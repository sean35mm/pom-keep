import { useEffect, useState } from 'react';

function Test() {
	const [timer, setTimer] = useState(.5 * 60);
	const [timerActive, setTimerActive] = useState(false);
	const [breakTime, setBreakTime] = useState(1 * 60);
	const [breakActive, setBreakActive] = useState(false);

	useEffect(() => {
		if (timerActive) {
			let interval = setInterval(() => {
				clearInterval(interval);
				setTimer(timer - 1);
				if (timer === 0) {
			
					setBreakActive(true);
					setTimerActive(false);
					setTimer(breakTime);
				}
			}, 10);
		}
	}, [breakTime, timer, timerActive]);

	const formatTime = (time) => {
		let minutes = Math.floor(time / 60);
		let seconds = time % 60;
		return (
			(minutes < 10 ? `0${minutes}` : minutes) +
			':' +
			(seconds < 10 ? `0${seconds}` : seconds)
		);
	};

	const resetTime = () => {
		setTimerActive(false);
		setTimer(25 * 60);
	};

	const handleTime = () => {
		if (breakActive === true) {
		} else {
			setTimerActive(!timerActive);
		}
	};

	return (
		<div className='bg-slate-400 flex flex-col items-center justify-center h-screen'>
			<h1 className='font-bold text-2xl mb-8'>Pomodoro Timer</h1>
			<div className='flex flex-col items-center'>
				<h1 className='mb-4 font-bold text-9xl'>{formatTime(timer)}</h1>
				<div className='flex mt-4'>
					<button className='btn' onClick={() => setTimerActive(!timerActive)}>
						{!timerActive ? 'Start' : 'Pause'}
					</button>
					<button className='btn' onClick={resetTime}>Reset Timer</button>
				</div>
			</div>
		</div>
	);
}

export default Test;
