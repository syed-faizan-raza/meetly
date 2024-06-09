import React, { useState, useEffect } from 'react';

const TimeBar = () => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [totalDuration, setTotalDuration] = useState(0);
  const [remainingTime, setRemainingTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const handleStartMeeting = () => {
    const totalDuration = (parseInt(hours) || 0) * 60 + (parseInt(minutes) || 0);
    if (totalDuration <= 0) {
      alert('Please enter a valid meeting duration.');
      return;
    }
    setTotalDuration(totalDuration * 60); 
    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + totalDuration * 60 * 1000);
    setEndTime(endTime);
    setRemainingTime(totalDuration * 60);

    const id = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setIntervalId(id);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getFormattedEndTime = () => {
    if (!endTime) return '';
    return endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const getFormattedStartEndTime = () => {
    if (!endTime) return '';
    const startTime = new Date(endTime.getTime() - totalDuration * 1000);
    const options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formatter = new Intl.DateTimeFormat([], options);
    const formattedStartTime = formatter.format(startTime).replace(/,/g, '').split(' ');
    formattedStartTime.splice(3, 1); // Remove the "at"
    return (
      <>
        <span style={{ marginRight: '10px' }}>{formattedStartTime[0]}</span>
        <span style={{ marginRight: '2px' }}>{formattedStartTime[1]}</span>
        <span style={{ marginRight: '10px' }}>{formattedStartTime[2]}</span>
        <span>{formattedStartTime.slice(3).join(' ')}</span>
        -
        <span style={{ marginLeft: '0px' }}>{getFormattedEndTime()}</span>
      </>
    );
  };
  return (
    <div className="time-bar-container">
      {remainingTime === null && (
        <div className="input-container">
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Hours"
            className="time-input"
            min="0"
          />
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="Minutes"
            className="time-input"
            min="0"
            max="59"
          />
          <button onClick={handleStartMeeting} className="start-button">Start Meeting</button>
        </div>
      )}
      {remainingTime !== null && (
        <div className="time-bar">
          <div className="time-info">
            <span>{getFormattedStartEndTime()}</span>
            <div className="progress-bar">
              <div
                className="progress-bar-inner"
                style={{ width: `${(remainingTime / totalDuration) * 100}%`, backgroundColor: '#F7C107' }}
              />
            </div>
            <span style={{ color: '#F7C107' }}>{formatTime(remainingTime)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeBar;